"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "../../../src/features/auth/auth";
import { zFormData } from "../../../src/utils/zFormData";
import { users } from "../../../src/features/auth/users";
import { feedbackComments } from "../../../src/features/feedback/repositories/feedbackComments";

const zData = zFormData(z.object({
  comment_id: z.string(),
}));

export async function deleteComment(rawData: FormData) {
  const session = await auth();
  if (! session) {
    throw new Error("Not logged in");
  }

  const parsed = zData.parse(rawData);

  const comment = await feedbackComments.getById(parsed.comment_id);
  if (! comment) {
    throw new Error("Comment not found");
  }

  const user = await users.getById(session.user.id);
  if (comment.author_id !== session.user.id && user!.role !== "ADMIN") {
    throw new Error("Comment not found");
  }

  await feedbackComments.deleteById(comment.id);

  return redirect(`/feedback/${comment.post_id}?message=commentDeleted`);
}
