"use server";

import { z } from "zod";
import { feedbackStatus } from "../feedbackStatus";
import { feedbackPosts } from "../repositories/feedbackPosts";
import { withSession } from "../../session/session";
import { actionRequireUser } from "../../../features/auth/checks";
import { actionError } from "../../../utils/actionError";
import { redirect } from "next/navigation";

const zData = z.object({
  post_id: z.string().uuid(),
});

export const withdrawPost = withSession(async (fd: FormData) => {
  const data = zData.parse({
    post_id: fd.get("post_id"),
  });

  const post = await feedbackPosts.getById(data.post_id);
  if (! post) {
    return actionError("/", "Post not found");
  }

  const { user, errorFn } = await actionRequireUser(user => {
    return user.role === "ADMIN" || user.id === post.author_id;
  });
  if (! user) {
    return errorFn();
  }

  if (post.status !== feedbackStatus.Enum.open) {
    return actionError("", "Only posts with the status 'open' can be withdrawn");
  }

  await feedbackPosts.updateById(post.id, {
    status: feedbackStatus.Enum.withdrawn,
  });

  return redirect(`/feedback/${post.id}`);
});
