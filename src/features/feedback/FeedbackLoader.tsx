import { orm } from "../../orm";
import { FeedbackDisplay } from "./FeedbackDisplay";
import { createClientFeedbackPost } from "./entities/ClientFeedbackPost";
import { feedbackPostAuthor, feedbackPostDef } from "./entities/FeedbackPost";

type FeedbackLoaderProps = {
  page: number;
  perPage: number;
  searchTerm: string;
};

export async function FeedbackLoader(params: FeedbackLoaderProps) {
  const qb = params.searchTerm
    ? orm.qb(feedbackPostDef).whereILike("title", `%${params.searchTerm}%`)
    : orm.qb(feedbackPostDef);

  const totalItems = await qb.clone().count();
  const perPage = Math.max(1, params.perPage);
  const page = Math.max(1, Math.min(params.page, Math.ceil(totalItems / perPage)));

  const fullQb = qb.clone()
    .offset((page - 1) * perPage)
    .limit(perPage)
    .orderBy("num_votes", "DESC")
    .select("*");

  const posts = await orm.getMany(feedbackPostDef, () => fullQb, {
    author: feedbackPostAuthor()(orm),
  });

  const clientPosts = posts.map(p => createClientFeedbackPost(p));

  const otherQueryParams: Record<string, any> = {};
  if (params.searchTerm) {
    otherQueryParams.searchTerm = params.searchTerm;
  }

  return (
    <FeedbackDisplay
      posts={clientPosts}
      page={page}
      perPage={perPage}
      totalItems={totalItems}
      otherQueryParams={otherQueryParams}
    />
  );
}
