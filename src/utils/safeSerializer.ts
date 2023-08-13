import { EntityDTO, wrap } from "@mikro-orm/core";

/**
 * Serializer for one-to-one and many-to-one relations.
 *
 * By default, in mikro-orm, when serializing a non-loaded one-to-one or many-to-one relation (i.e. a relation where you're only loading 1 entity),
 * the placeholder object/uninitialized entity for the relation gets serialized as its ID's type, e.g. a string.
 * This is not desirable when the relation's type is defined as the related entity.
 * This serializer serializes an uninitialized relation as undefined instead.
 */
export function safeSerializer<T>(t: T): EntityDTO<T> | undefined {
  const wrapped = wrap(t);
  return wrapped.isInitialized() ? wrapped.toPOJO() : undefined;
}
