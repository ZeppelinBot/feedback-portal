import React, { ReactNode } from "react";
import { Providers } from "./providers";
import { ClientRootLayout } from "./ClientRootLayout";
import { StyledComponentsRegistry } from "../style/StyledComponentsRegistry";
import { MainHeader } from "./MainHeader";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <ClientRootLayout header={<MainHeader />}>
              {children}
            </ClientRootLayout>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
