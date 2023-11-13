import { ReactNode } from "react";
import { ClientUser } from "../auth/entities/ClientUser";
import { ClientMobileFooter } from "./ClientMobileFooter";

type MobileFooterProps = {
  currentUser: ClientUser | null;
};

export function MobileFooter(props: MobileFooterProps): ReactNode {
  return (
    <ClientMobileFooter currentUser={props.currentUser} />
  );
}
