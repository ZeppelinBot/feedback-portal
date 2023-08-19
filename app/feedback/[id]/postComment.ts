"use server";

import { z } from "zod";
import { auth } from "../../../src/features/auth/auth";
import { feedbackCommentDef } from "../../../src/features/feedback/entities/FeedbackComment";
import { orm } from "../../../src/orm";
import { zFormData } from "../../../src/utils/zFormData";
import { v4 as uuidV4 } from "uuid";
import { redirect } from "next/navigation";
import { feedbackPostDef } from "../../../src/features/feedback/entities/FeedbackPost";

const zData = zFormData(z.object({
  post_id: z.string(),
  body: z.string().max(2_000),
}));

export async function postComment(rawData: FormData) {
  const session = await auth();
  if (! session?.user?.id) {
    throw new Error("Not logged in");
  }

  const data = zData.parse(rawData);
  const post = await orm.getOne(feedbackPostDef, qb => qb.where("id", "=", data.post_id));
  if (! post) {
    throw new Error("Unknown post");
  }

  const commentId = uuidV4();
  await orm.create(feedbackCommentDef, {
    id: commentId,
    post_id: data.post_id,
    body: data.body,
    author_id: session.user.id,
    posted_at: new Date(),
  });

  await orm.transaction(async (trxOrm) => {
    const commentCount = await trxOrm.kysely.selectFrom(feedbackCommentDef.tableName)
      .where("post_id", "=", data.post_id)
      .select(({ fn }) => [
        fn.countAll().as("count"),
      ])
      .executeTakeFirstOrThrow();

    await trxOrm.update(
      feedbackPostDef,
      qb => qb.where("id", "=", post.id),
      {
        num_comments: Number(commentCount.count),
      },
    );
  });

  redirect(`/feedback/${data.post_id}#${commentId}`);
}
