import { getOrm } from "../../orm";
import { FeedbackDisplay } from "./FeedbackDisplay";
import { createClientFeedbackPost } from "./entities/ClientFeedbackPost";
import { FeedbackPost } from "./entities/FeedbackPost";

type FeedbackLoaderProps = {
  page: number;
  perPage: number;
  searchTerm: string;
};

export async function FeedbackLoader(params: FeedbackLoaderProps) {
  const em = (await getOrm()).em.fork();

  const qb = params.searchTerm
    ? em.createQueryBuilder(FeedbackPost).where("title ILIKE ?", [`%${params.searchTerm}%`])
    : em.createQueryBuilder(FeedbackPost);

  const totalItems = await qb.clone().count();
  const perPage = Math.max(1, params.perPage);
  const page = Math.max(1, Math.min(params.page, Math.ceil(totalItems / perPage)));

  const serverPosts = await qb.clone()
    .offset((page - 1) * perPage)
    .limit(perPage)
    .orderBy({
      num_votes: "DESC",
    })
    .select("*");

  const populatedServerPosts = await em.populate(serverPosts, ["author"]);

  const clientPosts = populatedServerPosts.map(p => createClientFeedbackPost(p));

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
