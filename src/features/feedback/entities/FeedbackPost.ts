import { Collection, EntitySchema, wrap } from "@mikro-orm/core";
import { User, UserSchema } from "../../auth/entities/User";
import { FeedbackComment } from "./FeedbackComment";
import { v4 as uuidV4 } from "uuid";
import { safeSerializer } from "../../../utils/safeSerializer";

export class FeedbackPost {
  id = uuidV4();
  title!: string;
  body!: string;
  author_id!: string;
  posted_at!: Date;
  num_votes!: number;
  num_comments!: number;

  // Relations
  author?: User;
  comments?: Collection<FeedbackComment>;
}

export const FeedbackPostSchema = new EntitySchema<FeedbackPost>({
  class: FeedbackPost,
  tableName: "feedback_posts",
  properties: {
    id: { type: String, primary: true },
    title: { type: String },
    body: { type: String },
    author_id: { type: String },
    posted_at: { type: Date },
    num_votes: { type: Number },
    num_comments: { type: Number },

    // Relations
    author: {
      reference: "m:1",
      entity: () => UserSchema,
      serializer: safeSerializer,
    },
    comments: {
      reference: "1:m",
      entity: () => FeedbackComment,
      inversedBy: (comment: FeedbackComment) => comment.post,
    },
  },
});
