import { SnadiKyselyEntityDefinition, hasOne } from "@snadi/kysely";
import { z } from "zod";
import { userDef } from "../../auth/entities/User";
import { feedbackPostDef } from "./FeedbackPost";

const zToFeedbackVoteEntity = z.object({
  id: z.string().uuid(),
  author_id: z.string(),
  post_id: z.string(),
  voted_at: z.date(),
});

const zToFeedbackVoteInsert = zToFeedbackVoteEntity;
const zToFeedbackVoteUpdate = zToFeedbackVoteEntity;

export type FeedbackVote = z.output<typeof zToFeedbackVoteEntity>;

export const feedbackVoteDef = {
  tableName: "feedback_votes" as const,
  toEntity: (data: z.input<typeof zToFeedbackVoteEntity>) => zToFeedbackVoteEntity.parse(data),
  toInsert: (data: z.input<typeof zToFeedbackVoteInsert>) => zToFeedbackVoteInsert.parse(data),
  toUpdate: (data: z.input<typeof zToFeedbackVoteUpdate>) => zToFeedbackVoteUpdate.parse(data),
} satisfies SnadiKyselyEntityDefinition;

export const feedbackVoteAuthor = () => hasOne(feedbackVoteDef, "author_id", userDef, "id");
export const feedbackVotePost = () => hasOne(feedbackVoteDef, "post_id", feedbackPostDef, "id");
