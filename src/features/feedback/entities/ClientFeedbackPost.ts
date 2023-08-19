import { z } from "zod";

export const zClientFeedbackPost = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  posted_at: z.date(),
  num_votes: z.number(),
  num_comments: z.number(),
});

export type ClientFeedbackPost = z.output<typeof zClientFeedbackPost>;
