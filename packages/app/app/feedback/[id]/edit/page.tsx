import { Metadata } from "next";
import { orm } from "../../../../src/orm";
import { feedbackPostDef } from "../../../../src/features/feedback/entities/FeedbackPost";
import { auth } from "../../../../src/features/auth/auth";
import { EditFeedbackPostClientPage } from "./clientPage";
import { zClientFeedbackPost } from "../../../../src/features/feedback/entities/ClientFeedbackPost";

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

export default async function EditFeedbackPostPage(props: Props) {
  const post = await orm.getOne(feedbackPostDef, qb => qb.where("id", "=", props.params.id));
  if (! post) {
    throw new Error("Post not found");
  }

  const session = await auth();
  if (! session) {
    throw new Error("Not logged in");
  }

  if (session.user.id !== post.author_id) {
    throw new Error("Unauthorized");
  }

  const clientPost = zClientFeedbackPost.parse(post);

  return (
    <EditFeedbackPostClientPage post={clientPost} />
  );
}
