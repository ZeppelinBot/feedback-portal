import { ReactNode } from "react";
import { getCurrentUser } from "./auth";
import { RequiresLogin } from "./components/RequiresLogin";
import { User } from "./entities/User";
import { actionError } from "../../utils/actionError";

type RequireUserCheckFn = (user: User) => boolean | Promise<boolean>;

type PageRequireUserResult =
  | { user: User, errorPage: null }
  | { user: null, errorPage: ReactNode };

export async function pageRequireUser(check?: RequireUserCheckFn): Promise<PageRequireUserResult> {
  const currentUser = await getCurrentUser();
  if (! currentUser) {
    return {
      user: null,
      errorPage: <RequiresLogin />,
    };
  }
  if (check && ! (await check(currentUser))) {
    return {
      user: null,
      errorPage: <RequiresLogin />,
    };
  }
  return {
    user: currentUser,
    errorPage: null,
  };
}

type ApiRequireUserResult =
  | { user: User, errorRes: null }
  | { user: null, errorRes: Response };

export async function apiRequireUser(check?: RequireUserCheckFn): Promise<ApiRequireUserResult> {
  const currentUser = await getCurrentUser();
  if (! currentUser) {
    return {
      user: null,
      errorRes: Response.json({
        error: "Unauthorized",
      }, {
        status: 401,
      }),
    };
  }
  if (check && ! (await check(currentUser))) {
    return {
      user: null,
      errorRes: Response.json({
        error: "Forbidden",
      }, {
        status: 404,
      }),
    };
  }
  return {
    user: currentUser,
    errorRes: null,
  };
}


type ActionRequireUserResult =
  | { user: User, errorFn: null }
  | { user: null, errorFn: () => never };

export async function actionRequireUser(check?: RequireUserCheckFn): Promise<ActionRequireUserResult> {
  const currentUser = await getCurrentUser();
  if (! currentUser) {
    return {
      user: null,
      errorFn: () => actionError("", "Unauthorized"),
    };
  }
  if (check && ! (await check(currentUser))) {
    return {
      user: null,
      errorFn: () => actionError("", "Forbidden"),
    };
  }
  return {
    user: currentUser,
    errorFn: null,
  };
}
