import { KnexEntityDefinition, hasMany } from "@snadi/knex";
import { z } from "zod";
import { accountDef } from "./Account";
import { sessionDef } from "./Session";

export const zUser = z.object({
  id: z.string().uuid(),
  name: z.string().nullable(),
  email: z.string(),
  email_verified: z.coerce.date(),
  image: z.string().nullable(),
  role: z.string(),
});

export type User = z.output<typeof zUser>;

export const userDef = {
  tableName: "users",
  primaryKey: "id",
  toEntity: (data) => zUser.parse(data),
} satisfies KnexEntityDefinition;

export const userSessions = () => hasMany(userDef, "id", sessionDef, "user_id");
export const userAccounts = () => hasMany(userDef, "id", accountDef, "user_id");
// export const userFeedbackPosts =
// export const userFeedbackComments =
