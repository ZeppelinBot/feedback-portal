import React from "react";
import { FeedbackList } from "./feedback/list";
import { FeedbackItem } from "./feedback/types";
import { z } from "zod";

const placeholderItems = [
  {
    votes: 1000,
    title: "Level system",
    body: "You know how some other bots have a really cool level system...",
    authorName: "dragory",
    type: "Suggestion",
    date: "13 Jul 2023",
  },
  {
    votes: 72,
    title: "Everything is broken",
    body: "Literally everything.",
    authorName: "dragory",
    type: "Bug",
    date: "2 Aug 2023",
  },
  {
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
    <FeedbackList
      items={placeholderItems}
      page={page}
      perPage={perPage}
      totalItems={51}
    />
  );
}
