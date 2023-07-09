"use client";

import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import React from "react";

export function Providers({ children }) {
  return (
    <>
      <CSSReset />

      <CacheProvider>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </CacheProvider>
    </>
  );
}
