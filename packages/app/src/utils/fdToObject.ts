export function fdToObject(fd: FormData): unknown {
  return Object.fromEntries(fd.entries());
}
