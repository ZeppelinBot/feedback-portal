"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "../../../src/features/auth/auth";
import { feedbackStatus } from "../../../src/features/feedback/feedbackStatus";
import { feedbackPosts } from "../../../src/features/feedback/repositories/feedbackPosts";

const zData = z.object({
  post_id: z.string().uuid(),
});

export async function unwithdrawPost(fd: FormData) {
  const session = await auth();
  if (! session) {
    throw new Error("Not logged in");
  }

  const data = zData.parse({
    post_id: fd.get("post_id"),
  });

  const post = await feedbackPosts.getById(data.post_id);
  if (! post) {
    throw new Error("Post not found");
  }

  if (session.user.id !== post.author_id) {
    throw new Error("Unauthorized");
  }

  if (post.status !== feedbackStatus.Enum.withdrawn) {
    throw new Error("Only posts with the status 'withdrawn' can be unwithdrawn");
  }

  await feedbackPosts.updateById(post.id, {
    status: feedbackStatus.Enum.open,
  });

  redirect(`/feedback/${post.id}`);
}
