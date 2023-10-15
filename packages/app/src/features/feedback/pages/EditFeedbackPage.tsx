import { Metadata } from "next";
import { orm } from "../../../orm";
import { feedbackPostDef } from "../entities/FeedbackPost";
import { ClientEditFeedbackPage } from "./ClientEditFeedbackPage";
import { zClientFeedbackPost } from "../entities/ClientFeedbackPost";
import { withSession } from "../../session/session";
import { NotFound } from "../../../components/NotFound";
import { pageRequireUser } from "../../auth/checks";

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

const EditFeedbackPage = withSession(async (props: Props) => {
  const post = await orm.getOne(feedbackPostDef, qb => qb.where("id", "=", props.params.id));
  if (! post) {
    return <NotFound message="Post not found" />;
  }

  const { user, errorPage } = await pageRequireUser(user => {
    return user.id === post.author_id;
  });
  if (! user) {
    return <>{errorPage}</>;
  }

  const clientPost = zClientFeedbackPost.parse(post);

  return (
    <ClientEditFeedbackPage post={clientPost} />
  );
});

export default EditFeedbackPage;
