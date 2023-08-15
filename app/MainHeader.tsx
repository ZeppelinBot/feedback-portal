import { auth } from "../src/features/auth/auth";
import { createClientUser } from "../src/features/auth/entities/ClientUser";
import { userDef } from "../src/features/auth/entities/User";
import { orm } from "../src/orm";
import { MainHeaderClient } from "./MainHeaderClient";

export const dynamic = "force-dynamic";

export async function MainHeader() {
  const session = await auth();
  const user = session?.user
    ? await orm.getOne(userDef, qb => qb.where("id", session.user.id).first())
    : null;
  const clientUser = user ? createClientUser(user) : null;

  return (
    <MainHeaderClient user={clientUser} />
  );
}
