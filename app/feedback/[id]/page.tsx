import { Metadata } from "next";
import { feedbackPostAuthor, feedbackPostComments, feedbackPostDef } from "../../../src/features/feedback/entities/FeedbackPost";
import { orm } from "../../../src/orm";
import { createClientFeedbackPost } from "../../../src/features/feedback/entities/ClientFeedbackPost";
import { ClientFeedbackPostPage } from "./clientPage";
import { auth } from "../../../src/features/auth/auth";
import { feedbackCommentAuthor } from "../../../src/features/feedback/entities/FeedbackComment";

type Props = {
  params: { id: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const post = await orm.getOne(feedbackPostDef, qb => qb.where("id", props.params.id).first());

  return {
    title: post?.title ?? "Not found",
  };
}

export default async function FeedbackPostPage(props: Props) {
  const post = await orm.getOne(feedbackPostDef, qb => qb.where("id", props.params.id).first(), {
    comments: [feedbackPostComments()(orm), {
      author: feedbackCommentAuthor()(orm),
    }],
    author: feedbackPostAuthor()(orm),
  });
  if (! post) {
    throw new Error("Post not found");
  }

  const session = await auth();
  const clientPost = createClientFeedbackPost(post);

  return (
    <ClientFeedbackPostPage post={clientPost} user={session?.user} />
  );
}
