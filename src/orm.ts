import { MikroORM, Options } from "@mikro-orm/core";
import type { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { env } from "./env";
import { FeedbackPostSchema } from "./features/feedback/entities/FeedbackPost";
import { FeedbackCommentSchema } from "./features/feedback/entities/FeedbackComment";
import { UserSchema } from "./features/auth/entities/User";
import { AccountSchema } from "./features/auth/entities/Account";
import { SessionSchema } from "./features/auth/entities/Session";
import { VerificationTokenSchema } from "./features/auth/entities/VerificationToken";

export const mikroOrmOptions: Options<PostgreSqlDriver> = {
  entities: [
    UserSchema,
    AccountSchema,
    SessionSchema,
    VerificationTokenSchema,

    FeedbackPostSchema,
    FeedbackCommentSchema,
  ],
  type: "postgresql",
  host: "postgres",
  dbName: "postgres",
  user: "postgres",
  password: env.POSTGRES_PASSWORD,

  discovery: {
    requireEntitiesArray: true,
    alwaysAnalyseProperties: false,
  },
};

export const orm = await MikroORM.init<PostgreSqlDriver>(mikroOrmOptions);
