import { z } from "zod";
import { FeedbackDisplaySearch } from "../src/features/feedback/FeedbackDisplaySearch";
import { FeedbackLoader } from "../src/features/feedback/FeedbackLoader";

type IndexProps = {
  searchParams: any;
};

const zSearchParams = z.object({
  page: z.coerce.number().optional(),
  perPage: z.coerce.number().optional(),
  searchTerm: z.string().optional(),
});

export default function Index(props: IndexProps) {
  const searchParams = zSearchParams.parse(props.searchParams);

  return (
    <div>
      <FeedbackDisplaySearch searchTerm={searchParams.searchTerm ?? ""} />
      <FeedbackLoader
          page={searchParams.page ?? 1}
          perPage={searchParams.perPage ?? 25}
          searchTerm={searchParams.searchTerm ?? ""}
        />
    </div>
  );
}
