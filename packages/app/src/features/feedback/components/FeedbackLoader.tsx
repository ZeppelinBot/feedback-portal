import { orm } from "../../../orm";
import { FeedbackDisplay } from "./FeedbackDisplay";
import { zClientFeedbackPost } from "../entities/ClientFeedbackPost";
import { feedbackPostAuthor, feedbackPostDef } from "../entities/FeedbackPost";

type FeedbackLoaderProps = {
  page: number;
  perPage: number;
  searchTerm: string;
};

export async function FeedbackLoader(params: FeedbackLoaderProps) {
  let qb = orm.kysely.selectFrom(feedbackPostDef.tableName);
  if (params.searchTerm) {
    qb = qb.where("title", "like", `%${params.searchTerm}%`);
  }

  const { count } = await qb.select(({ fn }) => [fn.countAll().as("count")]).executeTakeFirstOrThrow();
  const totalItems = Number(count);
  const perPage = Math.max(1, params.perPage);
  const page = Math.max(1, Math.min(params.page, Math.ceil(totalItems / perPage)));

  const fullQb = qb
    .offset((page - 1) * perPage)
    .limit(perPage)
    .orderBy("num_votes", "desc")
    .selectAll();

  const posts = await orm.loadMany(feedbackPostDef, fullQb.execute());

  const clientPosts = posts.map(p => zClientFeedbackPost.parse(p));

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
