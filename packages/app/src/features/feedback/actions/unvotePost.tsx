"use server";

import { z } from "zod";
import { feedbackPosts } from "@src/features/feedback/repositories/feedbackPosts";
import { feedbackVotes } from "@src/features/feedback/repositories/feedbackVotes";
import { withSession } from "@src/features/session/session";
import { actionRequireUser } from "@src/features/auth/checks";
import { rootUrl } from "../../../utils/urls";
import { actionError } from "../../../utils/actionError";
import { redirect } from "next/navigation";
import { errorTypes } from "../../statusMessages/errorMessages";

const zData = z.object({
  post_id: z.string(),
});

export const unvotePost = withSession(async (rawData: FormData) => {
  const { user, errorFn } = await actionRequireUser();
  if (! user) {
    return errorFn();
  }

  const data = zData.parse(JSON.parse(String(rawData.get("data") ?? "null")));
  const post = await feedbackPosts.getById(data.post_id);
  if (! post) {
    return actionError("/", errorTypes.unknownPost);
  }

  await feedbackVotes.remove(user.id, post.id);
  await feedbackPosts.refreshVoteCount(post.id);

  return redirect(rootUrl(`/feedback/${data.post_id}`));
});
