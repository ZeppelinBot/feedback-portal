import { SnadiKyselyEntityDefinition, hasOne } from "@snadi/kysely";
import { z } from "zod";
import { userDef } from "./User";

const zToSessionEntity = z.object({
  id: z.string().uuid(),
  user_id: z.string(),
  expires: z.date(),
  session_token: z.string(),
});

const zToSessionInsert = zToSessionEntity;
const zToSessionUpdate = zToSessionEntity;

export type Session = z.output<typeof zToSessionEntity>;

export const sessionDef = {
  tableName: "sessions" as const,
  toEntity: (data: unknown) => zToSessionEntity.parse(data),
  toInsert: (data: z.input<typeof zToSessionInsert>) => zToSessionInsert.parse(data),
  toUpdate: (data: z.input<typeof zToSessionUpdate>) => zToSessionUpdate.parse(data),
} satisfies SnadiKyselyEntityDefinition;

export const sessionUser = () => hasOne(sessionDef, "user_id", userDef, "id");
