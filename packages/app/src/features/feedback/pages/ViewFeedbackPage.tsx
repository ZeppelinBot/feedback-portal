import { Metadata } from "next";
import { feedbackPostAuthor, feedbackPostComments } from "../entities/FeedbackPost";
import { zClientFeedbackPost } from "../entities/ClientFeedbackPost";
import { ClientViewFeedbackPage } from "./ClientViewFeedbackPage";
import { feedbackCommentAuthor } from "../entities/FeedbackComment";
import { z } from "zod";
import { zClientFeedbackComment } from "../entities/ClientFeedbackComment";
import { zClientUser } from "../../auth/entities/ClientUser";
import { orm } from "../../../orm";
import { feedbackVoteDef } from "../entities/FeedbackVote";
import { feedbackPosts } from "../repositories/feedbackPosts";
import { withSession } from "../../session/session";
import { NotFound } from "../../../components/NotFound";
import { apiRequireUser } from "../../auth/checks";

type Props = {
  params: { id: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const post = await feedbackPosts.getById(props.params.id);
  return {
    title: post?.title ?? "Not found",
  };
}

export const dynamic = "force-dynamic";

const ViewFeedbackPage = withSession(async (props: Props) => {
  const post = await feedbackPosts.getById(props.params.id, {
    comments: [feedbackPostComments(), {
      author: feedbackCommentAuthor(),
    }],
    author: feedbackPostAuthor(),
  });
  if (! post) {
    return <NotFound message="Post not found" />;
  }

  const { user } = await apiRequireUser();
  const userVote = user
    ? await orm.getOne(feedbackVoteDef, qb => qb.where("post_id", "=", post.id).where("author_id", "=", user.id))
    : null;

  post.comments.sort((a, b) => a.posted_at > b.posted_at ? -1 : 1);

  const clientPost = zClientFeedbackPost
    .and(z.object({
      comments: z.array(zClientFeedbackComment.and(z.object({ author: zClientUser }))),
      author: zClientUser,
    }))
    .parse(post);

  return (
    <ClientViewFeedbackPage post={clientPost} user={user} hasUserVote={userVote != null} />
  );
});

export default ViewFeedbackPage;
