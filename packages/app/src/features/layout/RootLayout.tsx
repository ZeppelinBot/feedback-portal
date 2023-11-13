import React, { ReactNode } from "react";
import { Providers } from "./providers";
import { ClientRootLayout } from "./ClientRootLayout";
import { StyledComponentsRegistry } from "../style/StyledComponentsRegistry";
import { DesktopHeader } from "./DesktopHeader";
import { ClientStatusArea } from "./ClientStatusArea";
import { getCurrentUser } from "../auth/auth";
import { MobileFooter } from "./MobileFooter";
import { withSession } from "../session/session";
import { zClientUser } from "../auth/entities/ClientUser";
import { MobileHeader } from "./MobileHeader";

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = withSession(async (props: RootLayoutProps) => {
  const currentUser = await getCurrentUser();
  const clientCurrentUser = currentUser ? zClientUser.parse(currentUser) : null;

  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <ClientRootLayout
              desktopHeader={<DesktopHeader currentUser={clientCurrentUser} />}
              mobileHeader={<MobileHeader currentUser={clientCurrentUser} />}
              statusArea={<ClientStatusArea />}
              mobileFooter={<MobileFooter currentUser={clientCurrentUser} />}
            >
              {props.children}
            </ClientRootLayout>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
});
export default RootLayout;
