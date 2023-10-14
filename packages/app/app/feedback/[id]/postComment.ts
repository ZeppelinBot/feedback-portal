"use server";

import { redirect } from "next/navigation";
import { v4 as uuidV4 } from "uuid";
import { z } from "zod";
import { auth } from "../../../src/features/auth/auth";
import { feedbackPosts } from "../../../src/features/feedback/repositories/feedbackPosts";
import { feedbackComments } from "../../../src/features/feedback/repositories/feedbackComments";

const zData = z.object({
  post_id: z.string(),
  body: z.string().max(2_000),
});

export async function postComment(fd: FormData) {
  const session = await auth();
  if (! session?.user?.id) {
    throw new Error("Not logged in");
  }

  const data = zData.parse(JSON.parse(String(fd.get("data") ?? "null")));
  const post = await feedbackPosts.getById(data.post_id);
  if (! post) {
    throw new Error("Unknown post");
  }

  const comment = await feedbackComments.create({
    post_id: data.post_id,
    body: data.body,
    author_id: session.user.id,
    posted_at: new Date(),
  });

  await feedbackPosts.refreshCommentCount(post.id);
  await feedbackPosts.refreshLastActive(post.id);

  redirect(`/feedback/${data.post_id}#${comment.id}`);
}
