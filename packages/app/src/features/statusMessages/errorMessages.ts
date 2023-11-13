import { keys } from "../../utils";

export const errorMessages = {
  unauthorized: "Unauthorized",
  forbidden: "Forbidden",
  notLoggedIn: "Not logged in",
  commentNotFound: "Comment not found",
  postNotFound: "Post not found",
  rateLimited: "Rate limited",
  unknownPost: "Unknown post",
  inputError: "Input error",
  cantUnwithdraw: "Only posts with the status 'withdrawn' can be un-withdrawn",
  cantWithdraw: "Only posts with the status 'open' can be withdrawn",
} as const;

export type ErrorType = keyof typeof errorMessages;

type ErrorTypeMap = {
  [Key in ErrorType]: Key;
};

export const errorTypes = keys(errorMessages).reduce((obj, key) => {
  obj[key] = key;
  return obj;
}, {} as any) as ErrorTypeMap;

export function isValidErrorType(str: string): str is ErrorType {
  return str in errorTypes;
}
