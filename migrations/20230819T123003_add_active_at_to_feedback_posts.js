import { Kysely, sql } from "kysely";

/**
 * @param {Kysely<any>} db
 */
export async function up(db) {
  await db.schema.alterTable("feedback_posts")
    .addColumn("last_active_at", "timestamp", c => c.notNull().defaultTo(sql`NOW()`))
    .execute();

  await db.schema.createIndex("feedback_posts_status_active_idx")
    .on("feedback_posts")
    .columns(["status", "last_active_at"])
    .execute();
}

/**
 * @param {Kysely<any>} db
 */
export async function down(db) {
  await db.schema.dropIndex("feedback_posts_status_active_idx")
    .execute();

  await db.schema.alterTable("feedback_posts")
    .dropColumn("last_active_at")
    .execute();
}
