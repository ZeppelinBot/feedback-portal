"use server";

import { z } from "zod";
import { feedbackPosts } from "../repositories/feedbackPosts";
import { feedbackComments } from "../repositories/feedbackComments";
import { actionRequireUser } from "../../auth/checks";
import { withSession } from "../../session/session";
import { rootUrl } from "../../../utils/urls";
import { actionError } from "../../../utils/actionError";
import { redirect } from "next/navigation";
import { fdToObject } from "../../../utils/fdToObject";
import { rateLimitTypes, rateLimiter } from "../../ratelimits/rateLimiter";
import { errorTypes } from "../../statusMessages/errorMessages";

const zData = z.object({
  post_id: z.string(),
  body: z.string().max(2_000),
});

export const postComment = withSession(async (fd: FormData) => {
  const { user, errorFn } = await actionRequireUser();
  if (! user) {
    return errorFn();
  }

  if (! rateLimiter.testRateLimit(rateLimitTypes.createPost, user.id)) {
    return actionError("", errorTypes.rateLimited);
  }

  const data = zData.parse(fdToObject(fd));
  const post = await feedbackPosts.getById(data.post_id);
  if (! post) {
    return actionError("", errorTypes.unknownPost);
  }

  await feedbackComments.create({
    post_id: data.post_id,
    body: data.body,
    author_id: user.id,
    posted_at: new Date(),
  });

  await feedbackPosts.refreshCommentCount(post.id);
  await feedbackPosts.refreshLastActive(post.id);

  redirect(rootUrl(`/feedback/${data.post_id}`));
});
