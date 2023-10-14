import { SnadiKyselyEntityDefinition, hasMany } from "@snadi/kysely";
import { z } from "zod";
import { accountDef } from "./Account";
import { sessionDef } from "./Session";
import { roles } from "../roles";

const zRequiredFields = z.object({
  id: z.string().uuid(),
  email: z.string(),
  role: roles,
});

const zOptionalFields = z.object({
  name: z.string().nullable(),
  email_verified: z.date().nullable(),
  image: z.string().nullable(),
});

const zToUserEntity = zRequiredFields
  .merge(zOptionalFields);

const zToUserInsert = zRequiredFields
  .merge(zOptionalFields.partial());

const zToUserUpdate = zToUserInsert.partial();

export type User = z.output<typeof zToUserEntity>;

export const userDef = {
  tableName: "users" as const,
  toEntity: (data: unknown) => zToUserEntity.parse(data),
  toInsert: (data: z.input<typeof zToUserInsert>) => zToUserInsert.parse(data),
  toUpdate: (data: z.input<typeof zToUserUpdate>) => zToUserUpdate.parse(data),
} satisfies SnadiKyselyEntityDefinition;

export const userSessions = () => hasMany(userDef, "id", sessionDef, "user_id");
export const userAccounts = () => hasMany(userDef, "id", accountDef, "user_id");
