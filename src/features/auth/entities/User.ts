import { Collection, EntitySchema } from "@mikro-orm/core";
import { v4 as uuidV4 } from "uuid";
import { Session } from "./Session";
import { AdapterUser } from "@auth/core/adapters";
import { Account } from "./Account";
import { defaultRole, roles } from "../roles";
import { FeedbackPost } from "../../feedback/entities/FeedbackPost";
import { FeedbackComment } from "../../feedback/entities/FeedbackComment";

export class User implements AdapterUser {
  id = uuidV4();
  name?: string | null;
  email = "";
  emailVerified: Date | null = null;
  image?: string | null;
  role: typeof roles[keyof typeof roles] = defaultRole;

  // Relations
  sessions?: Collection<Session>;
  accounts?: Collection<Account>;
  feedbackPosts?: Collection<FeedbackPost>;
  feedbackComments?: Collection<FeedbackComment>;
}

export const UserSchema = new EntitySchema<User>({
  class: User,
  tableName: "users",
  properties: {
    id: { type: String, primary: true },
    name: { type: String, nullable: true },
    email: { type: String, serializer: () => undefined },
    emailVerified: { type: Date, nullable: true, fieldName: "email_verified", serializer: () => undefined },
    image: { type: String, nullable: true },
    role: { type: String },

    // Relations
    sessions: { reference: "1:m", entity: () => Session, inversedBy: (session: Session) => session.user },
    accounts: { reference: "1:m", entity: () => Account, inversedBy: (account: Account) => account.user },
    feedbackPosts: { reference: "1:m", entity: () => FeedbackPost, inversedBy: (post: FeedbackPost) => post.author },
    feedbackComments: { reference: "1:m", entity: () => FeedbackComment, inversedBy: (comment: FeedbackComment) => comment.author },
  },
});
