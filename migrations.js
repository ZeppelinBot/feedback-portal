import { promises as fsp, writeFileSync } from "fs";
import * as path from "path";
import { FileMigrationProvider, Kysely, Migrator, PostgresDialect } from "kysely";
import { join as joinPaths } from "path";
import dotenv from "dotenv";
import pgPkg from "pg";
const { Pool } = pgPkg;

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
    dialect: new PostgresDialect({
      pool: new Pool({
        host: "postgres",
        port: 5432,
        user: "postgres",
        database: "postgres",
        password: process.env.POSTGRES_PASSWORD,
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
