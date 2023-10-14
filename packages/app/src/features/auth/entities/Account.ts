import { SnadiKyselyEntityDefinition, hasOne } from "@snadi/kysely";
import { z } from "zod";
import { userDef } from "./User";

const zRequiredFields = z.object({
  id: z.string().uuid(),
  user_id: z.string(),
  type: z.string(),
  provider: z.string(),
  provider_account_id: z.string(),
});

const zOptionalFields = z.object({
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
});

const zToAccountEntity = zRequiredFields
  .merge(zOptionalFields)
  .extend({
    session_state: z.string().nullable().transform(v => v != null ? JSON.parse(v) : v),
  });

const zToAccountInsert = zRequiredFields
  .merge(zOptionalFields.partial())
  .extend({
    session_state: z.any().transform(v => JSON.stringify(v)).optional()
  });

const zToAccountUpdate = zToAccountInsert.partial();

export type Account = z.output<typeof zToAccountEntity>;

export const accountDef = {
  tableName: "accounts" as const,
  toEntity: (data: unknown) => zToAccountEntity.parse(data),
  toInsert: (data: z.input<typeof zToAccountInsert>) => zToAccountInsert.parse(data),
  toUpdate: (data: z.input<typeof zToAccountUpdate>) => zToAccountUpdate.parse(data),
} satisfies SnadiKyselyEntityDefinition;

export const accountUser = () => hasOne(accountDef, "user_id", userDef, "id");
