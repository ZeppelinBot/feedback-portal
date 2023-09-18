import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>) {
  await db.schema.alterTable("feedback_posts")
    .addColumn("status", "varchar(64)", c => c.notNull())
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.alterTable("feedback_posts")
    .dropColumn("status")
    .execute();
}
