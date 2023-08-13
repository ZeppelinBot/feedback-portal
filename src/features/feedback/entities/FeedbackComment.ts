import { EntitySchema } from "@mikro-orm/core";
import { User } from "../../auth/entities/User";
import { FeedbackPost } from "./FeedbackPost";
import { v4 as uuidV4 } from "uuid";
import { safeSerializer } from "../../../utils/safeSerializer";

export class FeedbackComment {
  id = uuidV4();
  post_id!: number;
  body!: string;
  author_id!: string;
  posted_at!: Date;

  // Relations
  author?: User;
  post?: FeedbackPost;
}

export const FeedbackCommentSchema = new EntitySchema<FeedbackComment>({
  class: FeedbackComment,
  tableName: "feedback_comments",
  properties: {
    id: { type: Number, primary: true, autoincrement: true },
    post_id: { type: Number },
    body: { type: String },
    author_id: { type: String },
    posted_at: { type: Date },

    // Relations
    author: { reference: "m:1", entity: () => User, serializer: safeSerializer },
    post: { reference: "m:1", entity: () => FeedbackPost, serializer: safeSerializer },
  },
});