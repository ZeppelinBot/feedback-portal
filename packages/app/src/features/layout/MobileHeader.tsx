import { ReactNode } from "react";
import { ClientUser } from "../auth/entities/ClientUser";
import { ClientMobileHeader } from "./ClientMobileHeader";

type MobileFooterProps = {
  currentUser: ClientUser | null;
};

export function MobileHeader(props: MobileFooterProps): ReactNode {
  return (
    <ClientMobileHeader currentUser={props.currentUser} />
  );
}
