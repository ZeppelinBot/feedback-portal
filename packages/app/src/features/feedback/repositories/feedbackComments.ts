import { RelationsToLoad } from "@snadi/core";
import { orm } from "../../../orm";
import { feedbackCommentDef } from "../entities/FeedbackComment";
import { InsertInput } from "@snadi/kysely";
import { v4 as uuidV4 } from "uuid";

type CreateInput = Omit<InsertInput<typeof feedbackCommentDef>, "id">;

export const feedbackComments = {
  getById<R extends RelationsToLoad | undefined>(id: string, relations?: R) {
    return orm.getOne(
      feedbackCommentDef,
      qb => qb.where("id", "=", id),
      relations,
    );
  },

  async create(input: CreateInput) {
    const id = uuidV4();
    await orm.insert(feedbackCommentDef, {
      ...input,
      id,
    });
    return (await this.getById(id))!;
  },

  async deleteById(id: string) {
    const comment = await orm.getOne(feedbackCommentDef, qb => qb.where("id", "=", id));
    if (! comment) {
      return;
    }

    await orm.delete(feedbackCommentDef, qb => qb.where("id", "=", id));
  },
};
