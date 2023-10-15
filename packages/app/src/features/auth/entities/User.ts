import { SnadiKyselyEntityDefinition, hasMany } from "@snadi/kysely";
import { z } from "zod";
import { roles } from "../roles";

const zRequiredFields = z.object({
  id: z.string().uuid(),
  discord_id: z.string(),
  name: z.string(),
  role: roles,
});

const zOptionalFields = z.object({
  avatar: z.string().nullable(),
});

const zToUserEntity = zRequiredFields
  .merge(zOptionalFields);

const zToUserInsert = zRequiredFields
  .merge(zOptionalFields.partial());

const zToUserUpdate = zToUserInsert.partial();

export type User = z.output<typeof zToUserEntity>;

export const userDef = {
  tableName: "users" as const,
  toEntity: (data: z.input<typeof zToUserEntity>) => zToUserEntity.parse(data),
  toInsert: (data: z.input<typeof zToUserInsert>) => zToUserInsert.parse(data),
  toUpdate: (data: z.input<typeof zToUserUpdate>) => zToUserUpdate.parse(data),
} satisfies SnadiKyselyEntityDefinition;
