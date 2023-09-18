import { NextResponse, type NextRequest } from "next/server";

const authRequiredPaths = [
  /^\/feedback\/new/,
];

function getAppUrl(request: NextRequest): URL {
  if (process.env.NEXTAUTH_URL) {
    return new URL(process.env.NEXTAUTH_URL);
  }
  return request.nextUrl.clone();
}

export async function middleware(request: NextRequest) {
  // Middleware can currently only run in an Edge environment, which does not include Node APIs.
  // Some of the auth code, specifically d.js code, uses Node APIs, so they can't be used here directly.
  // So, as a workaround, we make an API call to a route handler that returns our auth status.
  // For this to work, we also need to forward any cookies from the request.
  // It's not ideal, but it is what it is.
  for (const path of authRequiredPaths) {
    if (path.test(request.nextUrl.pathname)) {
      const authCheckUrl = getAppUrl(request);
      authCheckUrl.pathname = "/api/auth/status";

      const headers = new Headers();
      headers.set("Cookie", request.headers.get("cookie") ?? "");

      const res = await fetch(authCheckUrl, {
        method: "POST",
        headers,
      });
      const { authenticated } = await res.json();
      if (! authenticated) {
        const rewriteUrl = getAppUrl(request);
        rewriteUrl.pathname = "/errors/login-required";
        return NextResponse.rewrite(rewriteUrl, { status: 401 });
      }
    }
  }
}
