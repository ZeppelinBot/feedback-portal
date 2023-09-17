import { NextResponse } from "next/server";
import { auth } from "@src/features/auth/auth";

export async function POST() {
  const session = await auth();
  return NextResponse.json({
    authenticated: !! session,
  });
}

export const dynamic = "force-dynamic";
