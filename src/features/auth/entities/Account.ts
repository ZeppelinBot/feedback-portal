import { KnexEntityDefinition, hasOne } from "@snadi/knex";
import { z } from "zod";
import { userDef } from "./User";

type RemoveIndex<T> = {
  [K in keyof T as {} extends Record<K, 1> ? never : K]: T[K];
}

const zAccount = z.object({
  id: z.string().uuid(),
  user_id: z.string(),
  type: z.string(),
  provider: z.string(),
  provider_account_id: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
});

export type Account = z.output<typeof zAccount>;

export const accountDef = {
  tableName: "accounts",
  primaryKey: "id",
  toEntity: (data) => zAccount.parse(data),
} satisfies KnexEntityDefinition;

export const accountUser = () => hasOne(accountDef, "user_id", userDef, "id");
