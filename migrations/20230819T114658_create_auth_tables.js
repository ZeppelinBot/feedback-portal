import { Kysely, sql } from "kysely";

/**
 * @param {Kysely<any>} db
 */
export async function up(db) {
  await db.schema.createTable("users")
    .addColumn("id", "uuid", c => c.primaryKey())
    .addColumn("name", "text")
    .addColumn("email", "text", c => c.notNull())
    .addColumn("email_verified", "timestamp")
    .addColumn("image", "text")
    .addColumn("role", "text", c => c.notNull())
    .execute();

  await db.schema.createTable("sessions")
    .addColumn("id", "uuid", c => c.primaryKey())
    .addColumn("user_id", "uuid", c => c.notNull())
    .addColumn("expires", "timestamp", c => c.notNull())
    .addColumn("session_token", "text", c => c.unique().notNull())
    .addForeignKeyConstraint(
      "sessions_user_fk", ["user_id"], "users", ["id"],
      cb => cb.onDelete("cascade").onUpdate("cascade"),
    )
    .execute();

  await db.schema.createTable("accounts")
    .addColumn("id", "uuid", c => c.primaryKey())
    .addColumn("user_id", "uuid", c => c.notNull())
    .addColumn("type", "text", c => c.notNull())
    .addColumn("provider", "text", c => c.notNull())
    .addColumn("provider_account_id", "text", c => c.notNull())
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
    .addColumn("token", "text", c => c.primaryKey())
    .addColumn("expires", "timestamp", c => c.notNull())
    .addColumn("identifier", "text", c => c.notNull())
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
