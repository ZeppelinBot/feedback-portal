import { z } from "zod";

export function parseFromFormData<Schema extends z.ZodTypeAny>(fd: FormData, key: string, schema: Schema): z.output<Schema> {
  return schema.parse(fd.get(key));
}
