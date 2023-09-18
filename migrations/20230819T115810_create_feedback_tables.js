import { Kysely, sql } from "kysely";

/**
 * @param {Kysely<any>} db
 */
export async function up(db) {
  await db.schema.createTable("feedback_posts")
    .addColumn("id", "varchar(36)", c => c.primaryKey())
    .addColumn("title", "text", c => c.notNull())
    .addColumn("body", "text", c => c.notNull())
    .addColumn("author_id", "varchar(36)", c => c.notNull())
    .addColumn("posted_at", "timestamp", c => c.notNull().defaultTo(sql`NOW()`))
    .addColumn("num_votes", "int", c => c.notNull().defaultTo(sql`0`))
    .addColumn("num_comments", "int", c => c.notNull().defaultTo(sql`0`))
    .addForeignKeyConstraint(
      "feedback_posts_author_fk", ["author_id"], "users", ["id"],
      cb => cb.onDelete("cascade").onUpdate("cascade"),
    )
    .execute();

  await db.schema.createTable("feedback_comments")
    .addColumn("id", "varchar(36)", c => c.primaryKey())
    .addColumn("post_id", "varchar(36)", c => c.notNull())
    .addColumn("body", "text", c => c.notNull())
    .addColumn("author_id", "varchar(36)", c => c.notNull())
    .addColumn("posted_at", "timestamp", c => c.notNull().defaultTo(sql`NOW()`))
    .addForeignKeyConstraint(
      "feedback_comments_post_fk", ["post_id"], "feedback_posts", ["id"],
      cb => cb.onDelete("cascade").onUpdate("cascade"),
    )
    .addForeignKeyConstraint(
      "feedback_comments_author_fk", ["author_id"], "users", ["id"],
      cb => cb.onDelete("cascade").onUpdate("cascade"),
    )
    .execute();

  await db.schema.createTable("feedback_votes")
    .addColumn("id", "varchar(36)", c => c.primaryKey())
    .addColumn("author_id", "varchar(36)", c => c.notNull())
    .addColumn("post_id", "varchar(36)", c => c.notNull())
    .addColumn("voted_at", "timestamp", c => c.notNull().defaultTo(sql`NOW()`))
    .addForeignKeyConstraint(
      "feedback_votes_author_fk", ["author_id"], "users", ["id"],
      cb => cb.onDelete("cascade").onUpdate("cascade"),
    )
    .addForeignKeyConstraint(
      "feedback_votes_post_fk", ["post_id"], "feedback_posts", ["id"],
      cb => cb.onDelete("cascade").onUpdate("cascade"),
    )
    .execute();
}

/**
 * @param {Kysely<any>} db
 */
export async function down(db) {
  await db.schema.dropTable("feedback_votes").execute();
  await db.schema.dropTable("feedback_comments").execute();
  await db.schema.dropTable("feedback_posts").execute();
}
