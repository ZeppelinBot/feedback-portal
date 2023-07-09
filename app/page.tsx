import React from "react";
import { FeedbackList } from "./feedback/list";
import { FeedbackItem } from "./feedback/types";

const placeholderItems = [
  {
    votes: 1000,
    title: "Level system",
    body: "You know how some other bots have a really cool level system...",
    authorName: "Dragory"
  },
  {
    votes: 3,
    title: "API keys in dashboard",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tristique velit sit amet vulputate aliquam.",
    authorName: "Dragory"
  },
] satisfies FeedbackItem[];

export default function Index() {
  return (
    <FeedbackList items={placeholderItems} />
  );
}
