import React from "react";
import { Providers } from "./providers";
import { ClientLayout } from "./clientLayout";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Zeppelin Feedback Portal</title>
      </head>
      <body>
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
