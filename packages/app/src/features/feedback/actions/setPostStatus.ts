"use server";

import { z } from "zod";
import { feedbackStatus } from "../feedbackStatus";
import { feedbackPosts } from "../repositories/feedbackPosts";
import { withSession } from "../../session/session";
import { actionRequireUser } from "../../auth/checks";
import { rootUrl } from "../../../utils/urls";
import { redirect } from "next/navigation";
import { actionError } from "../../../utils/actionError";
import { errorTypes } from "../../statusMessages/errorMessages";

const zData = z.object({
  post_id: z.string().uuid(),
  status: feedbackStatus,
});

export const setPostStatus = withSession(async (fd: FormData) => {
  const { user, errorFn } = await actionRequireUser(user => user.role === "ADMIN");
  if (! user) {
    return errorFn();
  }

  const data = zData.parse({
    post_id: fd.get("post_id"),
    status: fd.get("status"),
  });

  const post = await feedbackPosts.getById(data.post_id);
  if (! post) {
    return actionError("/", errorTypes.postNotFound);
  }

  await feedbackPosts.updateById(post.id, {
    status: data.status,
  });

  return redirect(rootUrl(`/feedback/${post.id}`));
});
