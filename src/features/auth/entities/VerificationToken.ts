import { KyselyEntityDefinition } from "@snadi/kysely";
import { z } from "zod";

export const zToVerificationTokenEntity = z.object({
  token: z.string(),
  expires: z.date(),
  identifier: z.string(),
});

export const zToVerificationTokenRow = zToVerificationTokenEntity;

export type VerificationToken = z.output<typeof zToVerificationTokenEntity>;

export const verificationTokenDef = {
  tableName: "verification_tokens" as const,
  primaryKey: "token",
  toEntity: (data: z.input<typeof zToVerificationTokenEntity>) => zToVerificationTokenEntity.parse(data),
  toRow: (data: z.input<typeof zToVerificationTokenRow>) => zToVerificationTokenRow.parse(data),
} satisfies KyselyEntityDefinition;
