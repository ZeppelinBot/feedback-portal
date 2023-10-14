import { env } from "./env";
import { EntitiesToKyselyDatabase, SnadiKyselyOrm } from "@snadi/kysely";
import { accountDef } from "./features/auth/entities/Account";
import { sessionDef } from "./features/auth/entities/Session";
import { userDef } from "./features/auth/entities/User";
import { verificationTokenDef } from "./features/auth/entities/VerificationToken";
import { feedbackCommentDef } from "./features/feedback/entities/FeedbackComment";
import { feedbackPostDef } from "./features/feedback/entities/FeedbackPost";
import { feedbackVoteDef } from "./features/feedback/entities/FeedbackVote";
import { MysqlDialect, Kysely } from "kysely";
import { createPool } from "mysql2";

export type KyselyDB = EntitiesToKyselyDatabase<
  | typeof accountDef
  | typeof sessionDef
  | typeof userDef
  | typeof verificationTokenDef
  | typeof feedbackCommentDef
  | typeof feedbackPostDef
  | typeof feedbackVoteDef
>;

const dialect = new MysqlDialect({
  pool: createPool({
    host: env.MYSQL_HOST,
    port: env.MYSQL_PORT,
    user: env.MYSQL_USER,
    database: env.MYSQL_DATABASE,
    password: env.MYSQL_PASSWORD,
    connectionLimit: 10,
  }),
});

const kysely = new Kysely<KyselyDB>({ dialect });

export const orm = new SnadiKyselyOrm(kysely);
