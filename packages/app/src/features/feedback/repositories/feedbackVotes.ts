import { orm } from "../../../orm";
import { feedbackVoteDef } from "../entities/FeedbackVote";
import { v4 as uuidV4 } from "uuid";

export const feedbackVotes = {
  add(authorId: string, postId: string) {
    return orm.transaction(async (trxOrm) => {
      const existingVote = await trxOrm.getOne(
        feedbackVoteDef,
        qb => qb.where("author_id", "=", authorId).where("post_id", "=", postId),
      );
      if (! existingVote) {
        await trxOrm.insert(feedbackVoteDef, {
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
};
