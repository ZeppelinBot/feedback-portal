"use strict";

import { Migration } from '@mikro-orm/migrations';

export class Migration20230813150201 extends Migration {

  async up() {
    this.addSql(`
      CREATE TABLE "users" (
        id TEXT NOT NULL PRIMARY KEY,
        name TEXT,
        email TEXT NOT NULL UNIQUE,
        email_verified TIMESTAMP,
        image TEXT
      );
    `);
  }

}
