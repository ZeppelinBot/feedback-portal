import { SnadiKyselyEntityDefinition, hasOne } from "@snadi/kysely";
import { z } from "zod";
import { userDef } from "../../auth/entities/User";
import { feedbackPostDef } from "./FeedbackPost";
import { orm } from "../../../orm";

const zToFeedbackCommentEntity = z.object({
  id: z.string().uuid(),
  post_id: z.string(),
  body: z.string(),
  author_id: z.string(),
  posted_at: z.date(),
});

const zToFeedbackCommentInsert = zToFeedbackCommentEntity;
const zToFeedbackCommentUpdate = zToFeedbackCommentEntity;

export type FeedbackComment = z.output<typeof zToFeedbackCommentEntity>;

export const feedbackCommentDef = {
  tableName: "feedback_comments" as const,
  toEntity: (data: z.input<typeof zToFeedbackCommentEntity>) => zToFeedbackCommentEntity.parse(data),
  toInsert: (data: z.input<typeof zToFeedbackCommentInsert>) => zToFeedbackCommentInsert.parse(data),
  toUpdate: (data: z.input<typeof zToFeedbackCommentUpdate>) => zToFeedbackCommentUpdate.parse(data),
} satisfies SnadiKyselyEntityDefinition;

export const feedbackCommentAuthor = () => hasOne(feedbackCommentDef, "author_id", userDef, "id")(orm);
export const feedbackCommentPost = () => hasOne(feedbackCommentDef, "post_id", feedbackPostDef, "id")(orm);
