import { RelationsToLoad } from "@snadi/core";
import { KyselyOrm, ToRowInput } from "@snadi/kysely";
import { sql } from "kysely";
import { KyselyDB, orm } from "../../orm";
import { Optional } from "../../utils/types";
import { feedbackCommentDef } from "./entities/FeedbackComment";
import { feedbackPostDef } from "./entities/FeedbackPost";
import { feedbackVoteDef } from "./entities/FeedbackVote";
import { v4 as uuidV4 } from "uuid";

export const feedbackPosts = {
  getById<R extends RelationsToLoad | undefined>(id: string, relations?: R) {
    return orm.getOne(
      feedbackPostDef,
      qb => qb.where("id", "=", id),
      relations,
    );
  },

  create(input: ToRowInput<typeof feedbackPostDef>) {
    return orm.create(feedbackPostDef, input);
  },

  updateById(id: string, input: Optional<ToRowInput<typeof feedbackPostDef>>) {
    return orm.update(
      feedbackPostDef,
      qb => qb.where("id", "=", id),
      input,
    );
  },

  refreshLastActive(id: string) {
    return orm.transaction(async (trxOrm) => {
      const result = await trxOrm.kysely.selectFrom(feedbackPostDef.tableName)
        .leftJoin(feedbackCommentDef.tableName, cb => cb.on("feedback_comments.post_id", "=", "feedback_posts.id"))
        .where("feedback_posts.id", "=", id)
        .groupBy("feedback_posts.id")
        .select([
          sql`GREATEST(feedback_posts.posted_at, MAX(feedback_comments.posted_at))`.as("last_active_at")
        ])
        .executeTakeFirstOrThrow();

      await trxOrm.update(
        feedbackPostDef,
        qb => qb.where("id", "=", id),
        {
          last_active_at: new Date(result.last_active_at as string),
        },
      );
    });
  },

  refreshCommentCount(id: string) {
    return orm.transaction(async (trxOrm) => {
      const commentCount = await trxOrm.kysely.selectFrom(feedbackCommentDef.tableName)
        .where("post_id", "=", id)
        .select(({ fn }) => [
          fn.countAll().as("count"),
        ])
        .executeTakeFirstOrThrow();

      await trxOrm.update(
        feedbackPostDef,
        qb => qb.where("id", "=", id),
        {
          num_comments: Number(commentCount.count),
        },
      );
    });
  },

  refreshVoteCount(id: string) {
    return orm.transaction(async (trxOrm) => {
      const voteCount = await trxOrm.kysely.selectFrom(feedbackVoteDef.tableName)
        .where("post_id", "=", id)
        .select(({ fn }) => [
          fn.countAll().as("count"),
        ])
        .executeTakeFirstOrThrow();

      await trxOrm.update(
        feedbackPostDef,
        qb => qb.where("id", "=", id),
        {
          num_votes: Number(voteCount.count),
        },
      );
    });
  },
};

export const feedbackComments = {
  getById<R extends RelationsToLoad | undefined>(id: string, relations?: R) {
    return orm.getOne(
      feedbackCommentDef,
      qb => qb.where("id", "=", id),
      relations,
    );
  },

  create(input: ToRowInput<typeof feedbackCommentDef>) {
    return orm.create(feedbackCommentDef, input);
  },

  async deleteById(id: string) {
    const comment = await orm.getOne(feedbackCommentDef, qb => qb.where("id", "=", id));
    if (! comment) {
      return;
    }

    await orm.delete(feedbackCommentDef, qb => qb.where("id", "=", id));
  },
};

export const feedbackVotes = {
  add(authorId: string, postId: string) {
    return orm.transaction(async (trxOrm) => {
      const existingVote = await trxOrm.getOne(
        feedbackVoteDef,
        qb => qb.where("author_id", "=", authorId).where("post_id", "=", postId),
      );
      if (! existingVote) {
        await trxOrm.create(feedbackVoteDef, {
          id: uuidV4(),
          author_id: authorId,
          post_id: postId,
          voted_at: new Date(),
        });
      }
    });
  },

  async remove(authorId: string, postId: string) {
    await orm.delete(
      feedbackVoteDef,
      qb => qb.where("author_id", "=", authorId).where("post_id", "=", postId),
    );
  },

  create(input: ToRowInput<typeof feedbackVoteDef>) {
    return orm.create(feedbackVoteDef, input);
  },
};
