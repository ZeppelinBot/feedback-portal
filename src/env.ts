import { z } from "zod";

const envSchema = z.object({
  SECRET: z.string().length(32),
  POSTGRES_PASSWORD: z.string().nonempty(),
  DISCORD_CLIENT_ID: z.string().nonempty(),
  DISCORD_CLIENT_SECRET: z.string().nonempty(),
  AUTH_GUILD_ID: z.string().nonempty(),
  AUTH_ROLE_ID: z.string().nonempty(),

  // This isn't actually used from the env object directly, but it's included here for validation
  // Required in prod
  NEXTAUTH_URL: process.env.NODE_ENV === "development"
    ? z.string().url().optional()
    : z.string().url(),
});

console.log('hi?');
export const env = envSchema.parse(process.env);
