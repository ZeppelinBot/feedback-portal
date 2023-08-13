import { Collection, EntitySchema } from "@mikro-orm/core";
import { v4 as uuidV4 } from "uuid";
import { Session } from "./Session";
import { AdapterUser } from "@auth/core/adapters";
import { Account } from "./Account";

export class User implements AdapterUser {
  id = uuidV4();

  name?: string;

  email = "";

  emailVerified: Date | null = null;

  image?: string;

  sessions = new Collection<Session>(this);

  accounts = new Collection<Account>(this);
}

export const UserSchema = new EntitySchema<User>({
  class: User,
  properties: {
    id: { type: String, primary: true },
    name: { type: String, nullable: true },
    email: { type: String },
    emailVerified: { type: String, nullable: true },
    image: { type: String, nullable: true },

    sessions: { reference: "1:m", entity: () => Session, mappedBy: (session: Session) => session.user },
    accounts: { reference: "1:m", entity: () => Account, mappedBy: (account: Account) => account.user },
  },
});
