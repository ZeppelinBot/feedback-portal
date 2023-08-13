import { Collection } from "@mikro-orm/core";
import { ZodTypeDef, z } from "zod";

export function zMappedCollection<OutputFn extends (input: any) => any>(mapFn: OutputFn): z.ZodType<Array<ReturnType<OutputFn>> | undefined, ZodTypeDef, Collection<any>> {
  return z.instanceof(Collection)
    .transform((c) => c.isInitialized() ? c.getItems().map(item => mapFn(item)) : undefined)
}
