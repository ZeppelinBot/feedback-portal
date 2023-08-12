// TODO: Replace with DB entity type once that actually exists
export type FeedbackItem = {
  id: number;
  votes: number;
  title: string;
  body: string;
  authorName: string;
  type: string;
  date: string;
};
