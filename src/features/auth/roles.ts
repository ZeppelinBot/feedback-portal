import { z } from "zod";

export const roles = z.enum([
  "ADMIN",
  "MEMBER",
]);

export const defaultRole = roles.enum.MEMBER;
