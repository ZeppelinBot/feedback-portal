import { KnexEntityDefinition, hasOne } from "@snadi/knex";
import { z } from "zod";
import { userDef } from "../../auth/entities/User";
import { feedbackPostDef } from "./FeedbackPost";

export const zFeedbackVote = z.object({
  id: z.string().uuid(),
  author_id: z.string(),
  post_id: z.string(),
  voted_at: z.coerce.date(),
});

export type FeedbackVote = z.output<typeof zFeedbackVote>;

export const feedbackVoteDef = {
  tableName: "feedback_votes",
  primaryKey: "id",
  toEntity: (data) => zFeedbackVote.parse(data),
} satisfies KnexEntityDefinition;

export const feedbackVoteAuthor = () => hasOne(feedbackVoteDef, "author_id", userDef, "id");
export const feedbackVotePost = () => hasOne(feedbackVoteDef, "post_id", feedbackPostDef, "id");
