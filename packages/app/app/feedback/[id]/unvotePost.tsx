"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "../../../src/features/auth/auth";
import { feedbackPosts, feedbackVotes } from "../../../src/features/feedback/feedback";

const zData = z.object({
  post_id: z.string(),
});

export async function unvotePost(rawData: FormData) {
  const session = await auth();
  if (! session?.user.id) {
    throw new Error("Not logged in");
  }

  const data = zData.parse(JSON.parse(String(rawData.get("data") ?? "null")));
  const post = await feedbackPosts.getById(data.post_id);
  if (! post) {
    throw new Error("Unknown post");
  }

  await feedbackVotes.remove(session.user.id, post.id);
  await feedbackPosts.refreshVoteCount(post.id);

  revalidatePath(`/feedback/${data.post_id}`);
}
