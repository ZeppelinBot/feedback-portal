"use client";

import { useServerInsertedHTML } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

type StyledComponentsRegistryProps = {
  children: ReactNode;
};

// Provides SSR support for styled-components
// Huge thanks: https://github.com/vercel/next.js/discussions/50473#discussioncomment-6048341
export function StyledComponentsRegistry(props: StyledComponentsRegistryProps) {
  const [serverStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = serverStyleSheet.getStyleElement();
    serverStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") {
    return <>{props.children}</>;
  }

  return (
    <StyleSheetManager sheet={serverStyleSheet.instance}>
      {props.children}
    </StyleSheetManager>
  );
}
