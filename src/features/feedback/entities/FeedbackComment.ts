import { KnexEntityDefinition, hasOne } from "@snadi/knex";
import { z } from "zod";
import { userDef } from "../../auth/entities/User";
import { feedbackPostDef } from "./FeedbackPost";

export const zFeedbackComment = z.object({
  id: z.string().uuid(),
  post_id: z.string(),
  body: z.string(),
  author_id: z.string(),
  posted_at: z.coerce.date(),
});

export type FeedbackComment = z.output<typeof zFeedbackComment>;

export const feedbackCommentDef = {
  tableName: "feedback_comments",
  primaryKey: "id",
  toEntity: (data) => zFeedbackComment.parse(data),
} satisfies KnexEntityDefinition;

export const feedbackCommentAuthor = () => hasOne(feedbackCommentDef, "author_id", userDef, "id");
export const feedbackCommentPost = () => hasOne(feedbackCommentDef, "post_id", feedbackPostDef, "id");
