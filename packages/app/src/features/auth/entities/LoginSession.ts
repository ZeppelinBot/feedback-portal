import { SnadiKyselyEntityDefinition } from "@snadi/kysely";
import { z } from "zod";

const zToLoginSessionEntity = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  logged_in_at: z.date(),
  expires_at: z.date(),
});

const zToLoginSessionInsert = zToLoginSessionEntity;
const zToLoginSessionUpdate = zToLoginSessionEntity.partial();

export type LoginSession = z.output<typeof zToLoginSessionEntity>;

export const loginSessionDef = {
  tableName: "login_sessions" as const,
  toEntity: (data: z.input<typeof zToLoginSessionEntity>) => zToLoginSessionEntity.parse(data),
  toInsert: (data: z.input<typeof zToLoginSessionInsert>) => zToLoginSessionInsert.parse(data),
  toUpdate: (data: z.input<typeof zToLoginSessionUpdate>) => zToLoginSessionUpdate.parse(data),
} satisfies SnadiKyselyEntityDefinition;
