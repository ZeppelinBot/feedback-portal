import { EntitySchema, Ref } from "@mikro-orm/core";
import { v4 as uuidV4 } from "uuid";
import { User } from "./User";
import { AdapterSession } from "@auth/core/adapters";

export class Session implements AdapterSession {
  id = uuidV4();
  userId!: string;
  expires!: Date;
  sessionToken!: string;

  // Relations
  user?: User;
}

export const SessionSchema = new EntitySchema<Session>({
  class: Session,
  tableName: "sessions",
  properties: {
    id: { type: String, primary: true },
    userId: { type: String, fieldName: "user_id" },
    expires: { type: Date },
    sessionToken: { type: String, fieldName: "session_token" },

    // Relations
    user: { reference: "m:1", entity: () => User },
  },
});
