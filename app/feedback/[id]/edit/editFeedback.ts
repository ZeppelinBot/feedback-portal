"use server";

import { z } from "zod";
import { auth } from "../../../../src/features/auth/auth";
import { feedbackPostDef } from "../../../../src/features/feedback/entities/FeedbackPost";
import { orm } from "../../../../src/orm";
import { redirect } from "next/navigation";

const zData = z.object({
  post_id: z.string().uuid(),
  title: z.string().min(3).max(255),
  body: z.string().min(80).max(8_000),
});

export async function editFeedback(fd: FormData) {
  const session = await auth();
  if (! session) {
    throw new Error("Not logged in");
  }

  const data = zData.parse({
    post_id: fd.get("post_id"),
    title: fd.get("title"),
    body: fd.get("body"),
  });

  const post = await orm.getOne(feedbackPostDef, qb => qb.where("id", "=", data.post_id));
  if (! post) {
    throw new Error("Post not found");
  }

  if (session.user.id !== post.author_id) {
    throw new Error("Unauthorized");
  }

  await orm.update(
    feedbackPostDef,
    qb => qb.where("id", "=", post.id),
    {
      title: data.title,
      body: data.body,
    },
  );

  redirect(`/feedback/${post.id}`);
}
