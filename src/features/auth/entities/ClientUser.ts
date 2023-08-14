import { ZodTypeDef, z } from "zod";
import { ClientFeedbackComment, createClientFeedbackComment } from "../../feedback/entities/ClientFeedbackComment";
import { ClientFeedbackPost, createClientFeedbackPost } from "../../feedback/entities/ClientFeedbackPost";
import { FeedbackComment, zFeedbackComment } from "../../feedback/entities/FeedbackComment";
import { FeedbackPost, zFeedbackPost } from "../../feedback/entities/FeedbackPost";
import type { User } from "./User";

const zBaseClientUser = z.object({
  id: z.string(),
  name: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  role: z.string(),
});

// Recursive type stuff: https://github.com/colinhacks/zod#recursive-types
// Both feedback posts and feedback comments reference back to the user

type ClientUserInput = z.input<typeof zBaseClientUser> & {
  feedbackPosts?: FeedbackPost[];
  feedbackComments?: FeedbackComment[];
};

export type ClientUser = z.output<typeof zBaseClientUser> & {
  feedbackPosts?: ClientFeedbackPost[];
  feedbackComments?: ClientFeedbackComment[];
};

const zClientUser: z.ZodType<ClientUser, ZodTypeDef, ClientUserInput> = zBaseClientUser.extend({
  feedbackPosts: z.lazy(
    () => z.array(z.any()).transform(arr => arr.map(p => createClientFeedbackPost(p))).optional()
  ),
  feedbackComments: z.lazy(
    () => z.array(z.any()).transform(arr => arr.map(p => createClientFeedbackComment(p))).optional()
  ),
});

export const createClientUser = (input: User) => zClientUser.parse(input);
