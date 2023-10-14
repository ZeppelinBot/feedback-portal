import { SnadiKyselyEntityDefinition, hasMany, hasOne } from "@snadi/kysely";
import { z } from "zod";
import { userDef } from "../../auth/entities/User";
import { feedbackCommentDef } from "./FeedbackComment";
import { feedbackStatus } from "../feedbackStatus";
import { orm } from "../../../orm";

const zToFeedbackPostEntity = z.object({
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

const zToFeedbackPostInsert = zToFeedbackPostEntity;
const zToFeedbackPostUpdate = zToFeedbackPostEntity.partial();

export type FeedbackPost = z.output<typeof zToFeedbackPostEntity>;

export const feedbackPostDef = {
  tableName: "feedback_posts" as const,
  toEntity: (data: z.input<typeof zToFeedbackPostEntity>) => zToFeedbackPostEntity.parse(data),
  toInsert: (data: z.input<typeof zToFeedbackPostInsert>) => zToFeedbackPostInsert.parse(data),
  toUpdate: (data: z.input<typeof zToFeedbackPostUpdate>) => zToFeedbackPostUpdate.parse(data),
} satisfies SnadiKyselyEntityDefinition;

export const feedbackPostAuthor = () => hasOne(feedbackPostDef, "author_id", userDef, "id")(orm);
export const feedbackPostComments = () => hasMany(feedbackPostDef, "id", feedbackCommentDef, "post_id")(orm);
