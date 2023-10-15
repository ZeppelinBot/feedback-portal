import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
  await db.schema.alterTable("feedback_posts")
    .addColumn("last_active_at", "datetime", c => c.notNull().defaultTo(sql`NOW()`))
    .execute();

  await db.schema.createIndex("feedback_posts_status_active_idx")
    .on("feedback_posts")
    .columns(["status", "last_active_at"])
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropIndex("feedback_posts_status_active_idx")
    .execute();

  await db.schema.alterTable("feedback_posts")
    .dropColumn("last_active_at")
    .execute();
}
