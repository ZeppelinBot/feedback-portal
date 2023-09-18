import { z } from "zod";
import { roles } from "../roles";

export const zClientUser = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  role: roles,
});

export type ClientUser = z.output<typeof zClientUser>;
