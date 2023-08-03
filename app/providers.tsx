"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <SessionProvider>
        {children}
      </SessionProvider>
    </>
  );
}
