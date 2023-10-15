import { env } from "../env";

const removeTrailingSlash = (v: string) => v.replace(/\/+$/, "");
const removeLeadingSlash = (v: string) => v.replace(/^\/+/, "");

export function rootUrl(path: string) {
  return `${removeTrailingSlash(env.ROOT_URL)}/${removeLeadingSlash(path)}`;
}
