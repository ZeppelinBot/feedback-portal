import { Kysely } from "kysely";

export async function up(db: Kysely<any>) {
  await db.schema.createTable("users")
    .addColumn("id", "varchar(36)", c => c.primaryKey())
    .addColumn("discord_id", "bigint")
    .addColumn("name", "varchar(255)", c => c.notNull())
    .addColumn("avatar", "varchar(255)")
    .addColumn("role", "varchar(255)", c => c.notNull())
    .addUniqueConstraint("users_discord_id_uq", ["discord_id"])
    .execute();

  await db.schema.createTable("login_sessions")
    .addColumn("id", "varchar(36)", c => c.primaryKey())
    .addColumn("user_id", "varchar(36)", c => c.notNull())
    .addColumn("logged_in_at", "datetime", c => c.notNull())
    .addColumn("expires_at", "datetime", c => c.notNull())
    .addForeignKeyConstraint(
      "sessions_user_fk", ["user_id"], "users", ["id"],
      cb => cb.onDelete("cascade").onUpdate("cascade"),
    )
    .execute();
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable("login_sessions").execute();
  await db.schema.dropTable("users").execute();
}
