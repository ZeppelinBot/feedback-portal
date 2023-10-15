import { z } from "zod";
import { FeedbackDisplaySearch } from "../../feedback/components/FeedbackDisplaySearch";
import { FeedbackLoader } from "../../feedback/components/FeedbackLoader";

type IndexProps = {
  searchParams: any;
};

const zSearchParams = z.object({
  page: z.coerce.number().optional(),
  perPage: z.coerce.number().optional(),
  searchTerm: z.string().optional(),
});

export default function HomePage(props: IndexProps) {
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
