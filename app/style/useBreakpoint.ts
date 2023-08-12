import { useEffect, useState } from "react";

export function useBreakpoint(width: string, until = false) {
  const [status, setStatus] = useState(false);
  console.log(`useBreakpoint ${width}:`, status);

  useEffect(() => {
    const mediaStr = until ? `(max-width: calc(${width} - 1px))` : `(min-width: ${width})`;
    const matcher = window.matchMedia(mediaStr);

    if (matcher.matches) {
      setStatus(true);
    }

    const matchFn = (ev: MediaQueryListEventMap["change"]) => {
      setStatus(ev.matches);
    };
    matcher.addEventListener("change", matchFn);
    return () => {
      matcher.removeEventListener("change", matchFn);
    };
  }, [width, until]);

  return status;
}
