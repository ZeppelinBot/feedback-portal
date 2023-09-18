import { auth } from "../src/features/auth/auth";
import { zClientUser } from "../src/features/auth/entities/ClientUser";
import { userDef } from "../src/features/auth/entities/User";
import { orm } from "../src/orm";
import { MainHeaderClient } from "./MainHeaderClient";

export const dynamic = "force-dynamic";

export async function MainHeader() {
  const session = await auth();
  const user = session?.user
    ? await orm.getOne(userDef, qb => qb.where("id", "=", session.user.id))
    : null;
  const clientUser = user ? zClientUser.parse(user) : null;

  return (
    <MainHeaderClient user={clientUser} />
  );
}
