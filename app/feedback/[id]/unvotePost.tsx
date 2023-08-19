"use server";

import { z } from "zod";
import { orm } from "../../../src/orm";
import { feedbackPostDef } from "../../../src/features/feedback/entities/FeedbackPost";
import { auth } from "../../../src/features/auth/auth";
import { feedbackVoteDef } from "../../../src/features/feedback/entities/FeedbackVote";
import { revalidatePath } from "next/cache";

const zData = z.object({
  post_id: z.string(),
});

export async function unvotePost(rawData: FormData) {
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
    await trxOrm.delete(
      feedbackVoteDef,
      qb => qb.where("post_id", "=", post.id).where("author_id", "=", session.user.id),
    );

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
