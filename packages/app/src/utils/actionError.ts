import { redirect } from "next/navigation";

export function actionError(url: string, message: string): never {
  const params = new URLSearchParams();
  params.set("error", message);
  redirect(`${url}?${params.toString()}`);
}
