// NOTE: This config file is only used for the mikro-orm CLI
// For app DB config, see src/orm.ts

import { JSMigrationGenerator } from "@mikro-orm/migrations";

class EsmMigrationGenerator extends JSMigrationGenerator {
  generateMigrationFile(className, diff) {
    return `
"use strict";

import { Migration } from '@mikro-orm/migrations';

export class ${className} extends Migration {

  async up() {
    ${diff.up.map(sql => this.createStatement(sql, 4)).join("\n").trim()}
  }

  async down() {
    ${diff.down.map(sql => this.createStatement(sql, 4)).join("\n").trim()}
  }

}
    `.trim();
  }
}

export default {
  entities: [],

  type: "postgresql",
  host: "postgres",
  dbName: "postgres",
  user: "postgres",
  password: process.env.POSTGRES_PASSWORD,

  migrations: {
    path: "./migrations",
    snapshot: false,
    emit: "js",
    generator: EsmMigrationGenerator,
  },

  discovery: {
    warnWhenNoEntities: false,
  },
};
