import { KyselyEntityDefinition, hasOne } from "@snadi/kysely";
import { z } from "zod";
import { userDef } from "../../auth/entities/User";
import { feedbackPostDef } from "./FeedbackPost";

export const zToFeedbackCommentEntity = z.object({
  id: z.string().uuid(),
  post_id: z.string(),
  body: z.string(),
  author_id: z.string(),
  posted_at: z.date(),
});

export const zToFeedbackCommentRow = zToFeedbackCommentEntity;

export type FeedbackComment = z.output<typeof zToFeedbackCommentEntity>;

export const feedbackCommentDef = {
  tableName: "feedback_comments" as const,
  primaryKey: "id",
  toEntity: (data: z.input<typeof zToFeedbackCommentEntity>) => zToFeedbackCommentEntity.parse(data),
  toRow: (data: z.input<typeof zToFeedbackCommentRow>) => zToFeedbackCommentRow.parse(data),
} satisfies KyselyEntityDefinition;

export const feedbackCommentAuthor = () => hasOne(feedbackCommentDef, "author_id", userDef, "id");
export const feedbackCommentPost = () => hasOne(feedbackCommentDef, "post_id", feedbackPostDef, "id");
