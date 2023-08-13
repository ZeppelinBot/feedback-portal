"use strict";

import { Migration } from '@mikro-orm/migrations';

export class Migration20230813150201 extends Migration {

  async up() {
    this.addSql(`
      CREATE TABLE "users" (
        id UUID PRIMARY KEY,
        name TEXT,
        email TEXT NOT NULL,
        email_verified TIMESTAMP,
        image TEXT,
        role TEXT,

        CONSTRAINT users_email_uq UNIQUE (email)
      );
    `);

    this.addSql(`
      CREATE TABLE "sessions" (
        id UUID PRIMARY KEY,
        user_id UUID,
        expires TIMESTAMP,
        session_token TEXT UNIQUE,

        CONSTRAINT sessions_user_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    this.addSql(`
      CREATE TABLE "accounts" (
        id UUID PRIMARY KEY,
        user_id UUID,
        type TEXT,
        provider TEXT,
        provider_account_id TEXT,
        refresh_token TEXT NULL,
        access_token TEXT NULL,
        expires_at INT NULL,
        token_type TEXT NULL,
        scope TEXT NULL,
        id_token TEXT NULL,
        session_state TEXT NULL,

        CONSTRAINT accounts_user_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT accounts_provider_id_uq UNIQUE (provider, provider_account_id)
      );
    `);

    this.addSql(`
      CREATE TABLE "verification_tokens" (
        token TEXT PRIMARY KEY,
        expires TIMESTAMP,
        identifier TEXT,

        CONSTRAINT verification_tokens_uq UNIQUE (token, identifier)
      );
    `);
  }

  async down() {
    this.addSql(`DROP TABLE IF EXISTS "verification_tokens"`);
    this.addSql(`DROP TABLE IF EXISTS "accounts"`);
    this.addSql(`DROP TABLE IF EXISTS "sessions"`);
    this.addSql(`DROP TABLE IF EXISTS "users"`);
  }

}
