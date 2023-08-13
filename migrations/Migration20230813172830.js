"use strict";

import { Migration } from '@mikro-orm/migrations';

export class Migration20230813172830 extends Migration {

  async up() {
    this.addSql(`
      CREATE TABLE "feedback_posts" (
        id UUID PRIMARY KEY,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        author_id UUID NOT NULL,
        posted_at TIMESTAMP NOT NULL,
        num_votes INT NOT NULL,
        num_comments INT NOT NULL,

        CONSTRAINT feedback_posts_author_fk FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    this.addSql(`
      CREATE TABLE "feedback_comments" (
        id UUID PRIMARY KEY,
        post_id UUID NOT NULL,
        body TEXT NOT NULL,
        author_id UUID NOT NULL,
        posted_at TIMESTAMP NOT NULL,

        CONSTRAINT feedback_comments_author_fk FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT feedback_comments_post_fk FOREIGN KEY (post_id) REFERENCES feedback_posts (id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);

    this.addSql(`
      CREATE TABLE "feedback_votes" (
        id UUID PRIMARY KEY,
        author_id UUID NOT NULL,
        post_id UUID NOT NULL,
        voted_at TIMESTAMP NOT NULL,

        CONSTRAINT feedback_votes_author_fk FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT feedback_votes_post_fk FOREIGN KEY (post_id) REFERENCES feedback_posts (id) ON DELETE CASCADE ON UPDATE CASCADE
      );
    `);
  }

  async down() {
    this.addSql(`DROP TABLE IF EXISTS "feedback_votes"`);
    this.addSql(`DROP TABLE IF EXISTS "feedback_comments"`);
    this.addSql(`DROP TABLE IF EXISTS "feedback_posts"`);
  }

}
