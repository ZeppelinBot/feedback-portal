"use server";

import { z } from "zod";
import { feedbackPosts } from "../repositories/feedbackPosts";
import { feedbackVotes } from "../repositories/feedbackVotes";
import { withSession } from "../../session/session";
import { actionRequireUser } from "../../auth/checks";
import { actionError } from "../../../utils/actionError";
import { redirect } from "next/navigation";

const zData = z.object({
  post_id: z.string(),
});

export const votePost = withSession(async (rawData: FormData) => {
  const { user, errorFn } = await actionRequireUser();
  if (! user) {
    return errorFn;
  }

  const data = zData.parse(JSON.parse(String(rawData.get("data") ?? "null")));
  const post = await feedbackPosts.getById(data.post_id);
  if (! post) {
    return actionError("/", "Unknown post");
  }

  await feedbackVotes.add(user.id, post.id);
  await feedbackPosts.refreshVoteCount(post.id);

  return redirect(`/feedback/${data.post_id}`);
});
