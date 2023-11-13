"use server";

import { z } from "zod";
import { feedbackPosts } from "../repositories/feedbackPosts";
import { withSession } from "../../session/session";
import { actionRequireUser } from "../../auth/checks";
import { actionError } from "../../../utils/actionError";
import { redirect } from "next/navigation";
import { errorTypes } from "../../statusMessages/errorMessages";

const zData = z.object({
  post_id: z.string().uuid(),
  title: z.string().min(3).max(255),
  body: z.string().min(80).max(8_000),
});

export const editFeedback = withSession(async (fd: FormData) => {
  const data = zData.parse({
    post_id: fd.get("post_id"),
    title: fd.get("title"),
    body: fd.get("body"),
  });

  const post = await feedbackPosts.getById(data.post_id);
  if (! post) {
    return actionError("", errorTypes.postNotFound);
  }

  const { user, errorFn } = await actionRequireUser(user => {
    return user.role === "ADMIN" || user.id === post.author_id;
  });
  if (! user) {
    return errorFn();
  }

  await feedbackPosts.updateById(post.id, {
    title: data.title,
    body: data.body,
  });

  return redirect(`/feedback/${post.id}`);
});
