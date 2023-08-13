import { Suspense } from "react";
import { z } from "zod";
import { FeedbackDisplaySearch } from "../src/features/feedback/FeedbackDisplaySearch";
import { FeedbackLoader } from "../src/features/feedback/FeedbackLoader";
import { FeedbackPlaceholder } from "../src/features/feedback/FeedbackPlaceholder";

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
      <Suspense fallback={<FeedbackPlaceholder />}>
        <FeedbackLoader
          page={searchParams.page ?? 1}
          perPage={searchParams.perPage ?? 25}
          searchTerm={searchParams.searchTerm ?? ""}
        />
      </Suspense>
    </div>
  );
}
