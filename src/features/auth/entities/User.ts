import { KnexEntityDefinition, hasMany } from "@snadi/knex";
import { z } from "zod";
import { accountDef } from "./Account";
import { sessionDef } from "./Session";
import { roles } from "../roles";

export const zToUserEntity = z.object({
  id: z.string().uuid(),
  name: z.string().nullable(),
  email: z.string(),
  email_verified: z.date().nullable(),
  image: z.string().nullable(),
  role: roles,
});

export const zToUserRow = z.object({
  id: z.string().uuid(),
  name: z.string().nullable().optional(),
  email: z.string(),
  email_verified: z.date().nullable().optional(),
  image: z.string().nullable().optional(),
  role: roles,
});

export type User = z.output<typeof zToUserEntity>;

export const userDef = {
  tableName: "users",
  primaryKey: "id",
  toEntity: (data: z.input<typeof zToUserEntity>) => zToUserEntity.parse(data),
  toRow: (data: z.input<typeof zToUserRow>) => zToUserRow.parse(data),
} satisfies KnexEntityDefinition;

export const userSessions = () => hasMany(userDef, "id", sessionDef, "user_id");
export const userAccounts = () => hasMany(userDef, "id", accountDef, "user_id");
