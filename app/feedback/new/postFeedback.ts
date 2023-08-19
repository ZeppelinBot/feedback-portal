"use server";

import { z } from "zod";
import { auth } from "../../../src/features/auth/auth";
import { orm } from "../../../src/orm";
import { feedbackPostDef } from "../../../src/features/feedback/entities/FeedbackPost";
import { v4 as uuidV4 } from "uuid";
import { feedbackVoteDef } from "../../../src/features/feedback/entities/FeedbackVote";
import { redirect } from "next/navigation";

const zData = z.object({
  title: z.string().min(3).max(255),
  body: z.string().min(80).max(8_000),
});

export async function postFeedback(fd: FormData) {
  const session = await auth();
  if (! session) {
    throw new Error("Not logged in");
  }

  const data = zData.parse({
    title: fd.get("title"),
    body: fd.get("body"),
  });

  const post = await orm.transaction(async (trxOrm) => {
    const now = new Date();

    const post = await trxOrm.create(feedbackPostDef, {
      id: uuidV4(),
      author_id: session.user.id,
      title: data.title,
      body: data.body,
      num_comments: 0,
      num_votes: 1, // Automatic self-vote
      posted_at: now,
    });

    await trxOrm.create(feedbackVoteDef, {
      id: uuidV4(),
      author_id: session.user.id,
      post_id: post.id,
      voted_at: now,
    });

    return post;
  });

  redirect(`/feedback/${post.id}`);
}
