import { EntitySchema, Ref } from "@mikro-orm/core";
import { v4 as uuidV4 } from "uuid";
import { User } from "./User";
import { AdapterAccount } from "@auth/core/adapters";

type RemoveIndex<T> = {
  [K in keyof T as {} extends Record<K, 1> ? never : K]: T[K];
}

export class Account implements RemoveIndex<AdapterAccount> {
  id = uuidV4();

  userId!: string;

  type!: AdapterAccount["type"];

  provider!: string;

  providerAccountId!: string;

  refresh_token?: string;

  access_token?: string;

  expires_at?: number;

  token_type?: string;

  id_token?: string;

  session_state?: string;

  user!: User;
}

export const AccountSchema = new EntitySchema<Account>({
  class: Account,
  properties: {
    id: { type: String, primary: true },
    userId: { type: String, fieldName: "user_id" },
    type: { type: String },
    provider: { type: String },
    providerAccountId: { type: String, fieldName: "provider_account_id" },
    refresh_token: { type: String, nullable: true },
    access_token: { type: String, nullable: true },
    expires_at: { type: Number, nullable: true },
    token_type: { type: String, nullable: true },
    id_token: { type: String, nullable: true },
    session_state: { type: String, nullable: true },

    user: { reference: "m:1", entity: () => User, mappedBy: (user: User) => user.accounts },
  },
});
