import { z } from "zod";
import { feedbackStatus } from "../feedbackStatus";

export const zClientFeedbackPost = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  posted_at: z.date(),
  num_votes: z.number(),
  num_comments: z.number(),
  status: feedbackStatus,
  last_active_at: z.date(),
});

export type ClientFeedbackPost = z.output<typeof zClientFeedbackPost>;
