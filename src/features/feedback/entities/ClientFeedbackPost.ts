import { ZodTypeDef, z } from "zod";
import { createClientUser } from "../../auth/entities/ClientUser";
import { zUser } from "../../auth/entities/User";
import { ClientFeedbackComment, createClientFeedbackComment } from "./ClientFeedbackComment";
import { FeedbackComment, zFeedbackComment } from "./FeedbackComment";
import { FeedbackPost } from "./FeedbackPost";

export const zBaseClientFeedbackPost = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  author_id: z.string(),
  posted_at: z.date(),
  num_votes: z.number(),
  num_comments: z.number(),

  author: z.any().transform(u => createClientUser(u)).optional(),
});

// Recursive type stuff: https://github.com/colinhacks/zod#recursive-types

type ClientFeedbackPostInput = z.input<typeof zBaseClientFeedbackPost> & {
  comments?: FeedbackComment[];
};

export type ClientFeedbackPost = z.output<typeof zBaseClientFeedbackPost> & {
  comments?: ClientFeedbackComment[];
};

const zClientFeedbackPost: z.ZodType<ClientFeedbackPost, ZodTypeDef, ClientFeedbackPostInput> = zBaseClientFeedbackPost.extend({
  comments: z.lazy(() => z.array(z.any()).transform(arr => arr.map(c => createClientFeedbackComment(c))).optional()),
});

export const createClientFeedbackPost = (input: FeedbackPost) => {
  return zClientFeedbackPost.parse(input);
};
