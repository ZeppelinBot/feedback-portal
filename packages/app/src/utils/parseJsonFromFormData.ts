import { z } from "zod";

type ParseReturnType<Schema extends z.ZodTypeAny> =
  | { success: true; data: z.output<Schema>; error: null }
  | { success: false; data: null; error: Error };

export function parseJsonFromFormData<Schema extends z.ZodTypeAny>(fd: FormData, key: string, schema: Schema): ParseReturnType<Schema> {
  const value = fd.get(key);
  if (! value) {
    return { success: false, data: null, error: new Error(`Missing required key ${key} from form data`) };
  }

  if (typeof value !== "string") {
    return { success: false, data: null, error: new Error(`${key} must be stringified JSON`) };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch (err) {
    if (err instanceof SyntaxError) {
      return { success: false, data: null, error: new Error(`${key} is not valid JSON`) };
    }
    throw err;
  }

  const result = schema.safeParse(parsed);
  return result.success ? { ...result, error: null } : { ...result, data: null };
}
