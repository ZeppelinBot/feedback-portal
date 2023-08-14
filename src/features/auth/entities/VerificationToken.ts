import { KnexEntityDefinition } from "@snadi/knex";
import { z } from "zod";

export const zVerificationToken = z.object({
  token: z.string(),
  expires: z.coerce.date(),
  identifier: z.string(),
});

export type VerificationToken = z.output<typeof zVerificationToken>;

export const verificationTokenDef = {
  tableName: "verification_tokens",
  primaryKey: "token",
  toEntity: (data) => zVerificationToken.parse(data),
} satisfies KnexEntityDefinition;
