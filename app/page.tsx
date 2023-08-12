import React from "react";
import { FeedbackDisplay } from "../src/features/feedback/FeedbackDisplay";
import { FeedbackItem } from "../src/features/feedback/types";
import { z } from "zod";

const placeholderItems = [
  {
    id: 1,
    votes: 1000,
    title: "Level system",
    body: "You know how some other bots have a really cool level system...",
    authorName: "dragory",
    type: "Suggestion",
    date: "13 Jul 2023",
  },
  {
    id: 2,
    votes: 72,
    title: "Everything is broken",
    body: "Literally everything.",
    authorName: "dragory",
    type: "Bug",
    date: "2 Aug 2023",
  },
  {
    id: 3,
    votes: 3,
    title: "API keys in dashboard",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tristique velit sit amet vulputate aliquam.",
    authorName: "dragory",
    type: "Suggestion",
    date: "28 Jul 2023",
  },
] satisfies FeedbackItem[];

type IndexProps = {
  searchParams: any;
};

const zSearchParams = z.object({
  page: z.coerce.number().optional(),
  perPage: z.coerce.number().optional(),
});

export default function Index(props: IndexProps) {
  const searchParams = zSearchParams.parse(props.searchParams);

  const totalItems = 51;
  const perPage = Math.max(1, searchParams.perPage ?? 25);
  const page = Math.min(Math.ceil(totalItems / perPage), Math.max(1, searchParams.page ?? 1));

  return (
    <FeedbackDisplay
      items={placeholderItems}
      page={page}
      perPage={perPage}
      totalItems={51}
    />
  );
}
