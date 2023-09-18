import { KyselyEntityDefinition, hasMany, hasOne } from "@snadi/kysely";
import { z } from "zod";
import { userDef } from "../../auth/entities/User";
import { feedbackCommentDef } from "./FeedbackComment";
import { feedbackStatus } from "../feedbackStatus";
import { orm } from "../../../orm";

export const zToFeedbackPostEntity = z.object({
  id: z.string().uuid(),
  title: z.string(),
  body: z.string(),
  author_id: z.string(),
  posted_at: z.date(),
  num_votes: z.number(),
  num_comments: z.number(),
  status: feedbackStatus,
  last_active_at: z.date(),
});

export const zToFeedbackPostRow = zToFeedbackPostEntity;

export type FeedbackPost = z.output<typeof zToFeedbackPostEntity>;

export const feedbackPostDef = {
  tableName: "feedback_posts" as const,
  primaryKey: "id",
  toEntity: (data: z.input<typeof zToFeedbackPostEntity>) => zToFeedbackPostEntity.parse(data),
  toRow: (data: z.input<typeof zToFeedbackPostRow>) => zToFeedbackPostRow.parse(data),
} satisfies KyselyEntityDefinition;

export const feedbackPostAuthor = () => hasOne(feedbackPostDef, "author_id", userDef, "id")(orm);
export const feedbackPostComments = () => hasMany(feedbackPostDef, "id", feedbackCommentDef, "post_id")(orm);
