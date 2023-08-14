import { KnexEntityDefinition, hasOne } from "@snadi/knex";
import { z } from "zod";
import { userDef } from "./User";

const zSession = z.object({
  id: z.string().uuid(),
  user_id: z.string(),
  expires: z.coerce.date(),
  session_token: z.string(),
});

export type Session = z.output<typeof zSession>;

export const sessionDef = {
  tableName: "sessions",
  primaryKey: "id",
  toEntity: (data) => zSession.parse(data),
} satisfies KnexEntityDefinition;

export const sessionUser = () => hasOne(sessionDef, "user_id", userDef, "id");
