"use client";

import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      <CSSReset />

      <CacheProvider>
        <ChakraProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </ChakraProvider>
      </CacheProvider>
    </>
  );
}
