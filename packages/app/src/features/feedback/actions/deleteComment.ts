"use server";

import { z } from "zod";
import { zFormData } from "../../../utils/zFormData";
import { feedbackComments } from "../repositories/feedbackComments";
import { actionRequireUser } from "../../auth/checks";
import { actionError } from "../../../utils/actionError";
import { actionSuccess } from "../../../utils/actionSuccess";
import { errorTypes } from "../../statusMessages/errorMessages";

const zData = zFormData(z.object({
  comment_id: z.string(),
}));

export async function deleteComment(rawData: FormData) {
  const parsed = zData.parse(rawData);

  const comment = await feedbackComments.getById(parsed.comment_id);
  if (! comment) {
    return actionError("", errorTypes.commentNotFound);
  }

  const { user, errorFn } = await actionRequireUser(user => {
    return user.role === "ADMIN" || user.id === comment.author_id;
  });
  if (! user) {
    return errorFn();
  }

  await feedbackComments.deleteById(comment.id);

  return actionSuccess(`/feedback/${comment.post_id}`, "Comment deleted");
}
