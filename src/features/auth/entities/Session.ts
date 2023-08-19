import { KyselyEntityDefinition, hasOne } from "@snadi/kysely";
import { z } from "zod";
import { userDef } from "./User";

const zToSessionEntity = z.object({
  id: z.string().uuid(),
  user_id: z.string(),
  expires: z.date(),
  session_token: z.string(),
});

const zToSessionRow = z.object({
  id: z.string().uuid(),
  user_id: z.string(),
  expires: z.date(),
  session_token: z.string(),
});

export type Session = z.output<typeof zToSessionEntity>;

export const sessionDef = {
  tableName: "sessions" as const,
  primaryKey: "id",
  toEntity: (data: z.input<typeof zToSessionEntity>) => zToSessionEntity.parse(data),
  toRow: (data: z.input<typeof zToSessionRow>) => zToSessionRow.parse(data),
} satisfies KyselyEntityDefinition;

export const sessionUser = () => hasOne(sessionDef, "user_id", userDef, "id");
