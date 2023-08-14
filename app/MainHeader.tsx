import { auth } from "../src/features/auth/auth";
import { MainHeaderClient } from "./MainHeaderClient";

export const dynamic = "force-dynamic";

export async function MainHeader() {
  const session = await auth();
  return (
    <MainHeaderClient user={session?.user} />
  );
}
