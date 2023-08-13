"use strict";

import { Migration } from '@mikro-orm/migrations';

export class Migration20230813150201 extends Migration {

  async up() {
    this.addSql(`
      CREATE TABLE "users" (
        id TEXT PRIMARY KEY,
        name TEXT,
        email TEXT NOT NULL,
        email_verified TIMESTAMP,
        image TEXT,

        CONSTRAINT users_email_uq UNIQUE (email)
      );
    `);

    this.addSql(`
      CREATE TABLE "sessions" (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        expires TIMESTAMP,
        session_token TEXT UNIQUE,

        CONSTRAINT sessions_user_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    this.addSql(`
      CREATE TABLE "accounts" (
        id TEXT PRIMARY KEY,
        user_id TEXT,
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

}
