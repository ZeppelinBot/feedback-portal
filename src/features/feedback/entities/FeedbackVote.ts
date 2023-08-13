import { EntitySchema } from "@mikro-orm/core";
import { User } from "../../auth/entities/User";
import { v4 as uuidV4 } from "uuid";
import { FeedbackPost } from "./FeedbackPost";
import { safeSerializer } from "../../../utils/safeSerializer";

export class FeedbackVote {
  id = uuidV4();
  author_id!: string;
  post_id!: string;
  voted_at!: Date;

  // Relations
  author?: User;
  post?: FeedbackPost;
}

export const FeedbackVoteSchema = new EntitySchema<FeedbackVote>({
  class: FeedbackVote,
  tableName: "feedback_votes",
  properties: {
    id: { type: String, primary: true },
    author_id: { type: String },
    post_id: { type: String },
    voted_at: { type: Date },

    // Relations
    author: { reference: "m:1", entity: () => User, serializer: safeSerializer },
    post: { reference: "m:1", entity: () => FeedbackPost, serializer: safeSerializer },
  },
});
