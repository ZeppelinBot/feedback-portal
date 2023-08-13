import { EntitySchema } from "@mikro-orm/core";

export class FeedbackComment {
  id!: number;
  title!: string;
  body!: string;
  author_id!: number;
  posted_at!: string;
}

export const FeedbackCommentSchema = new EntitySchema<FeedbackComment>({
  class: FeedbackComment,
  properties: {
    id: { type: Number, primary: true, autoincrement: true },
    title: { type: String },
    body: { type: String },
  },
});
