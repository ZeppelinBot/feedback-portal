import { Kysely, sql } from "kysely";

/**
 * @param {Kysely<any>} db
 */
export async function up(db) {
  await db.schema.alterTable("feedback_posts")
    .addColumn("status", "text", c => c.notNull())
    .execute();
}

/**
 * @param {Kysely<any>} db
 */
export async function down(db) {
  await db.schema.alterTable("feedback_posts")
    .dropColumn("status")
    .execute();
}
