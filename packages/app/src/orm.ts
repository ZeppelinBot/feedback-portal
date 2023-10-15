import { env } from "./env";
import { EntitiesToKyselyDatabase, SnadiKyselyOrm } from "@snadi/kysely";
import { userDef } from "./features/auth/entities/User";
import { feedbackCommentDef } from "./features/feedback/entities/FeedbackComment";
import { feedbackPostDef } from "./features/feedback/entities/FeedbackPost";
import { feedbackVoteDef } from "./features/feedback/entities/FeedbackVote";
import { MysqlDialect, Kysely } from "kysely";
import { createPool } from "mysql2";
import { loginSessionDef } from "./features/auth/entities/LoginSession";

export type KyselyDB = EntitiesToKyselyDatabase<
  | typeof userDef
  | typeof loginSessionDef
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
    timezone: "+00:00",
    supportBigNumbers: true,
    bigNumberStrings: true,
  }),

});

const kysely = new Kysely<KyselyDB>({ dialect });

export const orm = new SnadiKyselyOrm(kysely);
