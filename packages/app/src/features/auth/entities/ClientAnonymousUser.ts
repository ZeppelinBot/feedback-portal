import { z } from "zod";

export const zClientAnonymousUser = z.object({
  name: z.any().transform(() => "Anonymous"),
});

export type ClientAnonymousUser = z.output<typeof zClientAnonymousUser>;
