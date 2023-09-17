import { env } from "./env";
import { EntitiesToKyselyDatabase, KyselyOrm } from "@snadi/kysely";
import { accountDef } from "./features/auth/entities/Account";
import { sessionDef } from "./features/auth/entities/Session";
import { userDef } from "./features/auth/entities/User";
import { verificationTokenDef } from "./features/auth/entities/VerificationToken";
import { feedbackCommentDef } from "./features/feedback/entities/FeedbackComment";
import { feedbackPostDef } from "./features/feedback/entities/FeedbackPost";
import { feedbackVoteDef } from "./features/feedback/entities/FeedbackVote";
import { PostgresDialect, Kysely } from "kysely";
import { Pool } from "pg";

export type KyselyDB = EntitiesToKyselyDatabase<
  | typeof accountDef
  | typeof sessionDef
  | typeof userDef
  | typeof verificationTokenDef
  | typeof feedbackCommentDef
  | typeof feedbackPostDef
  | typeof feedbackVoteDef
>;

const dialect = new PostgresDialect({
  pool: new Pool({
    host: "postgres",
    port: 5432,
    user: "postgres",
    database: "postgres",
    password: env.POSTGRES_PASSWORD,
    max: 10,
  }),
});

const kysely = new Kysely<KyselyDB>({ dialect });

export const orm = new KyselyOrm(kysely);
