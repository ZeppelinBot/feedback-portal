export type Optional<T extends object> = {
  [K in keyof T]?: T[K];
};
