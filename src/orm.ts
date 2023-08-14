import { KnexOrm } from "@snadi/knex";
import * as knexPkg from "knex";
import { env } from "./env";

export const knex = knexPkg.default({
  client: "pg",
  connection: {
    host: "postgres",
    port: 5432,
    user: "postgres",
    database: "postgres",
    password: env.POSTGRES_PASSWORD,
  },
});

export const orm = new KnexOrm(knex);
