import { KnexEntityDefinition, hasOne } from "@snadi/knex";
import { z } from "zod";
import { userDef } from "./User";

const zToAccountEntity = z.object({
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
  session_state: z.string().nullable().transform(v => v != null ? JSON.parse(v) : v),
});

const zToAccountRow = z.object({
  id: z.string().uuid(),
  user_id: z.string(),
  type: z.string(),
  provider: z.string(),
  provider_account_id: z.string(),
  refresh_token: z.string().nullable().optional(),
  access_token: z.string().nullable().optional(),
  expires_at: z.number().nullable().optional(),
  token_type: z.string().nullable().optional(),
  scope: z.string().nullable().optional(),
  id_token: z.string().nullable().optional(),
  session_state: z.any().transform(v => JSON.stringify(v)).optional(),
});

export type Account = z.output<typeof zToAccountEntity>;

export const accountDef = {
  tableName: "accounts",
  primaryKey: "id",
  toEntity: (data: z.input<typeof zToAccountEntity>) => zToAccountEntity.parse(data),
  toRow: (data: z.input<typeof zToAccountRow>) => zToAccountRow.parse(data),
} satisfies KnexEntityDefinition;

export const accountUser = () => hasOne(accountDef, "user_id", userDef, "id");
