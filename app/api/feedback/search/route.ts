import { NextRequest } from "next/server";
import { z } from "zod";

const queryParams = z.object({
  term: z.string(),
});

export function GET(req: NextRequest) {
  const searchTerm = req
}
