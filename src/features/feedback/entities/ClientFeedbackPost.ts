import { ZodTypeDef, z } from "zod";
import { createClientUser } from "../../auth/entities/ClientUser";
import { FeedbackPost } from "./FeedbackPost";
import { zMappedCollection } from "../../../utils/zMappedCollection";
import { ClientFeedbackComment, createClientFeedbackComment } from "./ClientFeedbackComment";
import { Collection } from "@mikro-orm/core";
import { FeedbackComment } from "./FeedbackComment";

export const zBaseClientFeedbackPost = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  author_id: z.string(),
  posted_at: z.date(),
  num_votes: z.number(),
  num_comments: z.number(),

  author: z.any().transform(createClientUser).optional(),
});

// Recursive type stuff: https://github.com/colinhacks/zod#recursive-types

type ClientFeedbackPostInput = z.input<typeof zBaseClientFeedbackPost> & {
  comments?: Collection<FeedbackComment>;
};

export type ClientFeedbackPost = z.output<typeof zBaseClientFeedbackPost> & {
  comments?: ClientFeedbackComment[];
};

const zClientFeedbackPost: z.ZodType<ClientFeedbackPost, ZodTypeDef, ClientFeedbackPostInput> = zBaseClientFeedbackPost.extend({
  comments: z.lazy(() => zMappedCollection((v) => createClientFeedbackComment(v)).optional()),
});

export const createClientFeedbackPost = (input: FeedbackPost) => zClientFeedbackPost.parse(input);
