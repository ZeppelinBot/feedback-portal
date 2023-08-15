import { KnexEntityDefinition, hasMany, hasOne } from "@snadi/knex";
import { z } from "zod";
import { userDef } from "../../auth/entities/User";
import { feedbackCommentDef } from "./FeedbackComment";

export const zToFeedbackPostEntity = z.object({
  id: z.string().uuid(),
  title: z.string(),
  body: z.string(),
  author_id: z.string(),
  posted_at: z.date(),
  num_votes: z.number(),
  num_comments: z.number(),
});

export const zToFeedbackPostRow = zToFeedbackPostEntity;

export type FeedbackPost = z.output<typeof zToFeedbackPostEntity>;

export const feedbackPostDef = {
  tableName: "feedback_posts",
  primaryKey: "id",
  toEntity: (data: z.input<typeof zToFeedbackPostEntity>) => zToFeedbackPostEntity.parse(data),
  toRow: (data: z.input<typeof zToFeedbackPostRow>) => zToFeedbackPostRow.parse(data),
} satisfies KnexEntityDefinition;

export const feedbackPostAuthor = () => hasOne(feedbackPostDef, "author_id", userDef, "id");
export const feedbackPostComments = () => hasMany(feedbackPostDef, "id", feedbackCommentDef, "post_id");
