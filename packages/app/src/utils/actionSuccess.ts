import { redirect } from "next/navigation";

export function actionSuccess(url: string, message: string) {
  const params = new URLSearchParams();
  params.set("success", message);
  return redirect(`${url}?${params.toString()}`);
}
