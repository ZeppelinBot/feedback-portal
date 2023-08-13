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
  num_votes: z.number(),
  num_comments: z.number(),

  author: z.any().transform((v) => createClientUser(v)).optional(),
  post: z.any().transform((v) => createClientFeedbackPost(v)).optional(),
});

export type ClientFeedbackComment = z.output<typeof zClientFeedbackComment>;

export const createClientFeedbackComment = (input: FeedbackComment) => zClientFeedbackComment.parse(input);
