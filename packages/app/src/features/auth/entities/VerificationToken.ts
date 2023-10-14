import { SnadiKyselyEntityDefinition } from "@snadi/kysely";
import { z } from "zod";

const zToVerificationTokenEntity = z.object({
  token: z.string(),
  expires: z.date(),
  identifier: z.string(),
});

const zToVerificationTokenInsert = zToVerificationTokenEntity;
const zToVerificationTokenUpdate = zToVerificationTokenEntity;

export type VerificationToken = z.output<typeof zToVerificationTokenEntity>;

export const verificationTokenDef = {
  tableName: "verification_tokens" as const,
  toEntity: (data: unknown) => zToVerificationTokenEntity.parse(data),
  toInsert: (data: z.input<typeof zToVerificationTokenInsert>) => zToVerificationTokenInsert.parse(data),
  toUpdate: (data: z.input<typeof zToVerificationTokenUpdate>) => zToVerificationTokenUpdate.parse(data),
} satisfies SnadiKyselyEntityDefinition;
