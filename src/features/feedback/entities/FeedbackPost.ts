import { EntitySchema } from "@mikro-orm/core";

export class FeedbackPost {
  id!: number;
  title!: string;
  body!: string;
  author_id!: number;
  posted_at!: string;
}

export const FeedbackPostSchema = new EntitySchema<FeedbackPost>({
  class: FeedbackPost,
  tableName: "feedback_posts",
  properties: {
    id: { type: Number, primary: true, autoincrement: true },
    title: { type: String },
    body: { type: String },
    author_id: { type: String },
  },
});
