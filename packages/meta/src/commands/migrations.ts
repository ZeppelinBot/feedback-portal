import { Command } from "@commander-js/extra-typings";
import { FileMigrationProvider, Kysely, Migrator, MysqlDialect } from "kysely";
import { join as joinPaths } from "path";
import { createPool } from "mysql2";
import * as path from "path";
import { promises as fsp, writeFileSync } from "fs";

const migrationTemplate = `
import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {

}

export async function down(db: Kysely<any>) {

}
`.trim();

function migrationPath(filename = "") {
  return joinPaths(process.cwd(), "dist/migrations", filename);
}

function getMigrator() {
  const db = new Kysely({
    dialect: new MysqlDialect({
      pool: createPool({
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT ?? "", 10),
        user: process.env.MYSQL_USER,
        database: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_PASSWORD,
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

export function initMigrationsCommand(program: Command) {
  const baseCommand = program.command("migrations");

  baseCommand
    .command("up")
    .action(async () => {
      const { db, migrator } = getMigrator();
      const { error, results } = await migrator.migrateToLatest();
      results?.forEach((it) => {
        if (it.status === "Success") {
          console.log(`Migrated ${it.migrationName}`);
        } else if (it.status === "Error") {
          console.error(`Migration failed: ${it.migrationName}`);
        }
      });
      await db.destroy();
      if (error) {
        program.error(String(error));
      }
      if (! error && ! results?.length) {
        console.log("Nothing to migrate");
      }
    });

  baseCommand
    .command("down")
    .action(async () => {
      const { db, migrator } = getMigrator();
      const { error, results } = await migrator.migrateDown();
      results?.forEach((it) => {
        if (it.status === "Success") {
          console.log(`Rolled back ${it.migrationName}`);
        } else if (it.status === "Error") {
          console.error(`Rollback failed: ${it.migrationName}`);
        }
      });
      await db.destroy();
      if (error) {
        program.error(String(error));
      }
      if (! error && ! results?.length) {
        console.log("Nothing to rollback");
      }
    });

  baseCommand
    .command("create")
    .argument("<name>", "Name of the migration")
    .action(async (name) => {
      const ts = (new Date()).toISOString().slice(0, 19).replace(/[:-]/g, "");
      const filename = `${ts}_${name}.ts`;
      writeFileSync(migrationPath(filename), migrationTemplate, { encoding: "utf8" });
      console.log(`Created ${migrationPath(filename)}`);
    });
}
