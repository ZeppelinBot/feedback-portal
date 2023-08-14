import { z } from "zod";

function formDataToObject(fd: FormData): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of fd.entries()) {
    result[key] = value;
  }
  return result;
}

export function zFormData(schema: z.ZodType<any>) {
  return z.instanceof(FormData).transform((fd, ctx) => {
    const converted = formDataToObject(fd);
    return schema.parse(converted);
  });
}
