import { ClientUser } from "../auth/entities/ClientUser";
import { withSession } from "../session/session";
import { ClientDesktopHeader } from "./ClientDesktopHeader";

type MainHeaderProps = {
  currentUser: ClientUser | null;
};

export const DesktopHeader = withSession((props: MainHeaderProps) => {
  return (
    <ClientDesktopHeader user={props.currentUser} />
  );
});
