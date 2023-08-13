import { Collection } from "@mikro-orm/core";
import { ZodTypeDef, z } from "zod";
import { ClientFeedbackPost, createClientFeedbackPost } from "../../feedback/entities/ClientFeedbackPost";
import { FeedbackComment } from "../../feedback/entities/FeedbackComment";
import { FeedbackPost } from "../../feedback/entities/FeedbackPost";
import type { User } from "./User";
import { zMappedCollection } from "../../../utils/zMappedCollection";
import { ClientFeedbackComment, createClientFeedbackComment } from "../../feedback/entities/ClientFeedbackComment";

const zBaseClientUser = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  role: z.string(),
});

// Recursive type stuff: https://github.com/colinhacks/zod#recursive-types
// Both feedback posts and feedback comments reference back to the user

type ClientUserInput = z.input<typeof zBaseClientUser> & {
  feedbackPosts?: Collection<FeedbackPost>;
  feedbackComments?: Collection<FeedbackComment>;
};

export type ClientUser = z.output<typeof zBaseClientUser> & {
  feedbackPosts?: ClientFeedbackPost[];
  feedbackComments?: ClientFeedbackComment[];
};

const zClientUser: z.ZodType<ClientUser, ZodTypeDef, ClientUserInput> = zBaseClientUser.extend({
  feedbackPosts: z.lazy(
    () => zMappedCollection((v) => createClientFeedbackPost(v)).optional()
  ),
  feedbackComments: z.lazy(
    () => zMappedCollection((v) => createClientFeedbackComment(v)).optional()
  ),
});

export const createClientUser = (input: User) => zClientUser.parse(input);
