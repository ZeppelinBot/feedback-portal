import { RelationsToLoad } from "@snadi/core";
import { feedbackPostDef } from "../entities/FeedbackPost";
import { InsertInput, UpdateInput } from "@snadi/kysely";
import { orm } from "../../../orm";
import { feedbackCommentDef } from "../entities/FeedbackComment";
import { sql } from "kysely";
import { feedbackVoteDef } from "../entities/FeedbackVote";
import { v4 as uuidV4 } from "uuid";

type CreateInput = Omit<InsertInput<typeof feedbackPostDef>, "id">;

export const feedbackPosts = {
  getById<R extends RelationsToLoad | undefined>(id: string, relations?: R) {
    return orm.getOne(
      feedbackPostDef,
      qb => qb.where("id", "=", id),
      relations,
    );
  },

  async create(input: CreateInput) {
    const id = uuidV4();
    await orm.insert(feedbackPostDef, {
      ...input,
      id,
    });
    return (await this.getById(id))!;
  },

  updateById(id: string, input: UpdateInput<typeof feedbackPostDef>) {
    return orm.update(
      feedbackPostDef,
      qb => qb.where("id", "=", id),
      input,
    );
  },

  refreshLastActive(id: string) {
    return orm.transaction(async (trxOrm) => {
      const result = await trxOrm.kysely.selectFrom(feedbackPostDef.tableName)
        .leftJoin(feedbackCommentDef.tableName, cb => cb.onRef("feedback_comments.post_id", "=", "feedback_posts.id"))
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
