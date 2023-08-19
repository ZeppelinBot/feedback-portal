import { Metadata } from "next";
import { feedbackPostAuthor, feedbackPostComments, feedbackPostDef } from "../../../src/features/feedback/entities/FeedbackPost";
import { orm } from "../../../src/orm";
import { zClientFeedbackPost } from "../../../src/features/feedback/entities/ClientFeedbackPost";
import { ClientFeedbackPostPage } from "./clientPage";
import { auth } from "../../../src/features/auth/auth";
import { feedbackCommentAuthor } from "../../../src/features/feedback/entities/FeedbackComment";
import { feedbackVoteDef } from "../../../src/features/feedback/entities/FeedbackVote";
import { z } from "zod";
import { zClientFeedbackComment } from "../../../src/features/feedback/entities/ClientFeedbackComment";
import { zClientUser } from "../../../src/features/auth/entities/ClientUser";
import { zClientAnonymousUser } from "../../../src/features/auth/entities/ClientAnonymousUser";

type Props = {
  params: { id: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const post = await orm.getOne(feedbackPostDef, qb => qb.where("id", "=", props.params.id));

  return {
    title: post?.title ?? "Not found",
  };
}

export const dynamic = "force-dynamic";

export default async function FeedbackPostPage(props: Props) {
  const post = await orm.getOne(feedbackPostDef, qb => qb.where("id", "=", props.params.id), {
    comments: [feedbackPostComments()(orm), {
      author: feedbackCommentAuthor()(orm),
    }],
    author: feedbackPostAuthor()(orm),
  });
  if (! post) {
    throw new Error("Post not found");
  }

  const session = await auth();
  const userVote = session
    ? await orm.getOne(feedbackVoteDef, qb => qb.where("post_id", "=", post.id).where("author_id", "=", session.user.id))
    : null;

  const authorSchema = session ? zClientUser : zClientAnonymousUser;
  const clientPost = zClientFeedbackPost
    .and(z.object({
      comments: z.array(z.unknown())
        .transform(arr => arr.map(v => (
          zClientFeedbackComment
            .and(z.object({
              author: authorSchema,
            }))
            .parse(v)
        ))),
      author: authorSchema,
    }))
    .parse(post);

  return (
    <ClientFeedbackPostPage post={clientPost} user={session?.user} hasUserVote={userVote != null} />
  );
}
