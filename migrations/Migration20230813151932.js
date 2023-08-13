"use strict";

import { Migration } from '@mikro-orm/migrations';

export class Migration20230813151932 extends Migration {

  async up() {
    this.addSql('select 1');

  }

  async down() {

  }

}