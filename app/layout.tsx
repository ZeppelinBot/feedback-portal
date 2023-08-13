import React, { ReactNode } from "react";
import { Providers } from "./providers";
import { ClientLayout } from "./clientLayout";
import { StyledComponentsRegistry } from "../src/features/style/StyledComponentsRegistry";
import { MainHeader } from "./MainHeader";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Zeppelin Feedback Portal</title>
      </head>
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <ClientLayout header={<MainHeader />}>
              {children}
            </ClientLayout>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
