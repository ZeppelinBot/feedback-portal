import { getCurrentUser } from "../auth/auth";
import { zClientUser } from "../auth/entities/ClientUser";
import { withSession } from "../session/session";
import { ClientMainHeader } from "./ClientMainHeader";

export const MainHeader = withSession(async () => {
  const user = await getCurrentUser();
  const clientUser = user ? zClientUser.parse(user) : null;
  return (
    <ClientMainHeader user={clientUser} />
  );
});
