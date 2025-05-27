import { useState, useLayoutEffect } from "react";

export function useHashLocation() {
  const [loc, setLoc] = useState<string>(window.location.hash.replace(/^#/, "") || "/");
  useLayoutEffect(() => {
    const handler = () => setLoc(window.location.hash.replace(/^#/, "") || "/");
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  const navigate = (to: string) => {
    window.location.hash = to;
    return undefined; // Make this mutable, not readonly, for wouter compatibility
  };
  // Return as a mutable tuple, not readonly
  return [loc, navigate] as [string, (to: string) => void];
}
