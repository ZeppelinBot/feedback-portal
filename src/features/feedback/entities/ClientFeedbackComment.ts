import { z } from "zod";
import { createClientUser } from "../../auth/entities/ClientUser";
import { createClientFeedbackPost } from "./ClientFeedbackPost";
import { FeedbackComment } from "./FeedbackComment";

export const zClientFeedbackComment = z.object({
  id: z.string(),
  post_id: z.string(),
  body: z.string(),
  author_id: z.string(),
  posted_at: z.date(),

  author: z.any().transform(u => createClientUser(u)).optional(),
  post: z.any().transform(p => createClientFeedbackPost(p)).optional(),
});

export type ClientFeedbackComment = z.output<typeof zClientFeedbackComment>;

export const createClientFeedbackComment = (input: FeedbackComment) => {
  return zClientFeedbackComment.parse(input);
};
