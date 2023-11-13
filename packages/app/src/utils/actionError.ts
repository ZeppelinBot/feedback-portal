import { redirect } from "next/navigation";
import { ErrorType } from "../features/statusMessages/errorMessages";

export function actionError(url: string, message: ErrorType): never {
  const params = new URLSearchParams();
  params.set("error", message);
  redirect(`${url}?${params.toString()}`);
}
