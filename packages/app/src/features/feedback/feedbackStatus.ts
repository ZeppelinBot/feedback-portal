import { z } from "zod";

export const feedbackStatus = z.enum([
  "open",
  "resolved",
  "invalid",
  "duplicate",
  "wontfix",
  "withdrawn",
]);
