"use server";

import { z } from "zod";
import { feedbackStatus } from "@src/features/feedback/feedbackStatus";
import { feedbackPosts } from "@src/features/feedback/repositories/feedbackPosts";
import { feedbackVotes } from "@src/features/feedback/repositories/feedbackVotes";
import { withSession } from "@src/features/session/session";
import { actionRequireUser } from "@src/features/auth/checks";
import { rootUrl } from "../../../utils/urls";
import { redirect } from "next/navigation";
import { rateLimitTypes, rateLimiter } from "../../ratelimits/rateLimiter";
import { actionError } from "../../../utils/actionError";
import { errorTypes } from "../../statusMessages/errorMessages";

const zData = z.object({
  title: z.string().min(3).max(255),
  body: z.string().min(80).max(8_000),
});

export const postFeedback = withSession(async (fd) => {
  const { user, errorFn } = await actionRequireUser();
  if (! user) {
    return errorFn();
  }

  if (! rateLimiter.testRateLimit(rateLimitTypes.createPost, user.id)) {
    return actionError("", errorTypes.rateLimited);
  }

  const data = zData.parse({
    title: fd.get("title"),
    body: fd.get("body"),
  });

  const now = new Date();

  const post = await feedbackPosts.create({
    author_id: user.id,
    title: data.title,
    body: data.body,
    num_comments: 0,
    num_votes: 1, // Automatic self-vote
    posted_at: now,
    status: feedbackStatus.Enum.open,
    last_active_at: now,
  });

  await feedbackVotes.add(user.id, post.id);

  return redirect(rootUrl(`/feedback/${post.id}`));
});
