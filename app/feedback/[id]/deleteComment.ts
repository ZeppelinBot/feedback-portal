"use server";

import { z } from "zod";
import { zFormData } from "../../../src/utils/zFormData";
import { orm } from "../../../src/orm";
import { feedbackCommentDef } from "../../../src/features/feedback/entities/FeedbackComment";
import { auth } from "../../../src/features/auth/auth";
import { userDef } from "../../../src/features/auth/entities/User";
import { redirect } from "next/navigation";

const zData = zFormData(z.object({
  comment_id: z.string(),
}));

export async function deleteComment(rawData: FormData) {
  const session = await auth();
  if (! session) {
    throw new Error("Not logged in");
  }

  const parsed = zData.parse(rawData);

  const comment = await orm.getOne(feedbackCommentDef, qb => qb.where("id", "=", parsed.comment_id));
  if (! comment) {
    throw new Error("Comment not found");
  }

  const user = (await orm.getOne(userDef, qb => qb.where("id", "=", session.user.id)))!;
  if (comment.author_id !== session.user.id && user.role !== "ADMIN") {
    throw new Error("Comment not found");
  }

  await orm.delete(feedbackCommentDef, qb => qb.where("id", "=", comment.id));

  return redirect(`/feedback/${comment.post_id}?message=commentDeleted`);
}
