import { promises as fsp, writeFileSync } from "fs";
import * as path from "path";
import { FileMigrationProvider, Kysely, Migrator, MysqlDialect } from "kysely";
import { join as joinPaths } from "path";
import dotenv from "dotenv";
import { createPool } from "mysql2";

dotenv.config();

const migrationTemplate = `
import { Kysely, sql } from "kysely";

/**
 * @param {Kysely<any>} db
 */
export async function up(db) {

}

/**
 * @param {Kysely<any>} db
 */
export async function down(db) {

}
`.trim();

function migrationPath(filename = "") {
  return joinPaths(process.cwd(), "migrations", filename);
}

function getMigrator() {
  const db = new Kysely({
    dialect: new MysqlDialect({
      pool: createPool({
        host: process.env.MYSQL_HOST ?? "mysql",
        port: process.env.MYSQL_PORT ?? 3306,
        user: process.env.MYSQL_USER ?? "root",
        database: process.env.MYSQL_DATABASE ?? "zeppelin-feedback-portal",
        password: process.env.MYSQL_PASSWORD ?? process.env.MYSQL_ROOT_PASSWORD,
        connectionLimit: 10,
      }),
    }),
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs: fsp,
      path,
      migrationFolder: migrationPath(""),
    }),
  });

  return { db, migrator };
}

const action = process.argv[2];
if (! action) {
  console.error("Specify an action");
  process.exit(1);
}

if (action === "create") {
  const name = process.argv[3];
  if (! name) {
    console.error("Specify a name for the migration");
    process.exit(1);
  }

  const ts = (new Date()).toISOString().slice(0, 19).replace(/[:-]/g, "");
  const filename = `${ts}_${name}.js`;
  writeFileSync(migrationPath(filename), migrationTemplate, { encoding: "utf8" });
  console.log(`Created ${migrationPath(filename)}`);
  process.exit(0);
}

if (action === "up") {
  const { db, migrator } = getMigrator();
  const { error, results } = await migrator.migrateToLatest();
  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`Migrated ${it.migrationName}`);
    } else if (it.status === "Error") {
      console.error(`Migration failed: ${it.migrationName}`);
    }
  });
  if (error) {
    console.error(error);
    process.exit(1);
  }
  if (! error && ! results?.length) {
    console.log("Nothing to migrate");
  }

  await db.destroy();
  process.exit(1);
}

if (action === "down") {
  const { db, migrator } = getMigrator();
  const { error, results } = await migrator.migrateDown();
  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`Rolled back ${it.migrationName}`);
    } else if (it.status === "Error") {
      console.error(`Rollback failed: ${it.migrationName}`);
    }
  });
  if (error) {
    console.error(error);
    process.exit(1);
  }
  if (! error && ! results?.length) {
    console.log("Nothing to rollback");
  }

  await db.destroy();
  process.exit(1);
}
