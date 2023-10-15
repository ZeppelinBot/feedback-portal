import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { z } from "zod";

const devDefaults = {
  MYSQL_HOST: "mysql",
  MYSQL_PORT: 3306,
  MYSQL_USER: "root",
  MYSQL_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
  MYSQL_DATABASE: "zeppelin-feedback-portal",
};

const prodDefaults = {};

const defaults = process.env.NODE_ENV === "production"
  ? prodDefaults
  : devDefaults;

const envSchema = z.object({
  SECRET: z.string().length(32),
  MYSQL_HOST: z.string().nonempty(),
  MYSQL_PORT: z.coerce.number(),
  MYSQL_USER: z.string().nonempty(),
  MYSQL_PASSWORD: z.string().nonempty(),
  MYSQL_DATABASE: z.string().nonempty(),
  DISCORD_CLIENT_ID: z.string().nonempty(),
  DISCORD_CLIENT_SECRET: z.string().nonempty(),
  AUTH_GUILD_ID: z.string().nonempty(),
  AUTH_ROLE_ID: z.string().nonempty(),
  ROOT_URL: z.string().url(),

  // This isn't actually used from the env object directly, but it's included here for validation
  // Required in prod
  NEXTAUTH_URL: process.env.NODE_ENV === "development" || true
    ? z.string().url().optional()
    : z.string().url(),
});

const buildPlaceholder = {} as z.output<typeof envSchema>;

export const env = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD
  ? buildPlaceholder
  : envSchema.parse({
    ...defaults,
    ...process.env,
  });
