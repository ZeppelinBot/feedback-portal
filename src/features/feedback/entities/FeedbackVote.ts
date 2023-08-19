import { KyselyEntityDefinition, hasOne } from "@snadi/kysely";
import { z } from "zod";
import { userDef } from "../../auth/entities/User";
import { feedbackPostDef } from "./FeedbackPost";

export const zToFeedbackVoteEntity = z.object({
  id: z.string().uuid(),
  author_id: z.string(),
  post_id: z.string(),
  voted_at: z.date(),
});

export const zToFeedbackVoteRow = zToFeedbackVoteEntity;

export type FeedbackVote = z.output<typeof zToFeedbackVoteEntity>;

export const feedbackVoteDef = {
  tableName: "feedback_votes" as const,
  primaryKey: "id",
  toEntity: (data: z.input<typeof zToFeedbackVoteEntity>) => zToFeedbackVoteEntity.parse(data),
  toRow: (data: z.input<typeof zToFeedbackVoteRow>) => zToFeedbackVoteRow.parse(data),
} satisfies KyselyEntityDefinition;

export const feedbackVoteAuthor = () => hasOne(feedbackVoteDef, "author_id", userDef, "id");
export const feedbackVotePost = () => hasOne(feedbackVoteDef, "post_id", feedbackPostDef, "id");
