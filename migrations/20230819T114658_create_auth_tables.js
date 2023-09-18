import { Kysely, sql } from "kysely";

/**
 * @param {Kysely<any>} db
 */
export async function up(db) {
  await db.schema.createTable("users")
    .addColumn("id", "varchar(36)", c => c.primaryKey())
    .addColumn("name", "varchar(255)", c => c.notNull())
    .addColumn("email", "varchar(255)", c => c.notNull())
    .addColumn("email_verified", "timestamp")
    .addColumn("image", "varchar(255)")
    .addColumn("role", "varchar(255)", c => c.notNull())
    .execute();

  await db.schema.createTable("sessions")
    .addColumn("id", "varchar(36)", c => c.primaryKey())
    .addColumn("user_id", "varchar(36)", c => c.notNull())
    .addColumn("expires", "timestamp", c => c.notNull())
    .addColumn("session_token", "varchar(255)", c => c.unique().notNull())
    .addForeignKeyConstraint(
      "sessions_user_fk", ["user_id"], "users", ["id"],
      cb => cb.onDelete("cascade").onUpdate("cascade"),
    )
    .execute();

  await db.schema.createTable("accounts")
    .addColumn("id", "varchar(36)", c => c.primaryKey())
    .addColumn("user_id", "varchar(36)", c => c.notNull())
    .addColumn("type", "varchar(255)", c => c.notNull())
    .addColumn("provider", "varchar(255)", c => c.notNull())
    .addColumn("provider_account_id", "varchar(255)", c => c.notNull())
    .addColumn("refresh_token", "text", c => c.defaultTo(sql`NULL`))
    .addColumn("access_token", "text", c => c.defaultTo(sql`NULL`))
    .addColumn("expires_at", "int", c => c.defaultTo(sql`NULL`))
    .addColumn("token_type", "text", c => c.defaultTo(sql`NULL`))
    .addColumn("scope", "text", c => c.defaultTo(sql`NULL`))
    .addColumn("id_token", "text", c => c.defaultTo(sql`NULL`))
    .addColumn("session_state", "text", c => c.defaultTo(sql`NULL`))
    .addForeignKeyConstraint(
      "accounts_user_fk", ["user_id"], "users", ["id"],
      cb => cb.onDelete("cascade").onUpdate("cascade"),
    )
    .addUniqueConstraint("accounts_provider_uq", ["provider", "provider_account_id"])
    .execute();

  await db.schema.createTable("verification_tokens")
    .addColumn("token", "varchar(255)", c => c.primaryKey())
    .addColumn("expires", "timestamp", c => c.notNull())
    .addColumn("identifier", "varchar(255)", c => c.notNull())
    .addUniqueConstraint("verification_tokens_uq", ["token", "identifier"])
    .execute();
}

/**
 * @param {Kysely<any>} db
 */
export async function down(db) {
  await db.schema.dropTable("verification_tokens").execute();
  await db.schema.dropTable("accounts").execute();
  await db.schema.dropTable("sessions").execute();
  await db.schema.dropTable("users").execute();
}
