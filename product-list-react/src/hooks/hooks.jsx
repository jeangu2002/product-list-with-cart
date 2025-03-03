import { useEffect } from "react";

export const useMatchMedia = (mediaQuery, handler) => {
  const mql = window.matchMedia(mediaQuery);

  useEffect(() => {
    mql.addEventListener("change", handler);
    return () => {
      mql.removeEventListener("change", handler);
    };
  }, []);
};
