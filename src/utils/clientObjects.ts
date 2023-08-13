export type ClientObjectDefinition<I, O> = {
  create: (input: I) => O;
};

export function defineClientObject<I, O>(def: ClientObjectDefinition<I, O>): ClientObjectDefinition<I, O> {
  return def;
}

export type ClientObjectType<Def extends ClientObjectDefinition<any, any>> = ReturnType<Def["create"]>;
