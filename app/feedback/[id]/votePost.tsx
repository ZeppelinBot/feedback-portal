"use server";

import { z } from "zod";
import { orm } from "../../../src/orm";
import { feedbackPostDef } from "../../../src/features/feedback/entities/FeedbackPost";
import { auth } from "../../../src/features/auth/auth";
import { feedbackVoteDef } from "../../../src/features/feedback/entities/FeedbackVote";
import { revalidatePath } from "next/cache";
import { v4 as uuidV4 } from "uuid";

const zData = z.object({
  post_id: z.string(),
});

export async function votePost(rawData: FormData) {
  const session = await auth();
  if (! session?.user.id) {
    throw new Error("Not logged in");
  }

  const data = zData.parse(JSON.parse(String(rawData.get("data") ?? "null")));
  const post = await orm.getOne(feedbackPostDef, qb => qb.where("id", "=", data.post_id));
  if (! post) {
    throw new Error("Unknown post");
  }

  await orm.transaction(async (trxOrm) => {
    const existingVote = await trxOrm.getOne(feedbackVoteDef, qb => qb.where("author_id", "=", session.user.id).where("post_id", "=", post.id));
    if (! existingVote) {
      await trxOrm.create(feedbackVoteDef, {
        id: uuidV4(),
        author_id: session.user.id,
        post_id: post.id,
        voted_at: new Date(),
      });
    }

    const voteCount = await trxOrm.kysely.selectFrom(feedbackVoteDef.tableName)
      .where("post_id", "=", post.id)
      .select(({ fn }) => [
        fn.countAll().as("count"),
      ])
      .executeTakeFirstOrThrow();

    await trxOrm.update(
      feedbackPostDef,
      qb => qb.where("id", "=", post.id),
      {
        num_votes: Number(voteCount.count),
      },
    );
  });

  revalidatePath(`/feedback/${data.post_id}`);
}
