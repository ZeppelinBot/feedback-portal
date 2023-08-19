import { z } from "zod";

export const zClientFeedbackComment = z.object({
  id: z.string(),
  post_id: z.string(),
  body: z.string(),
  author_id: z.string(),
  posted_at: z.date(),
});

export type ClientFeedbackComment = z.output<typeof zClientFeedbackComment>;
