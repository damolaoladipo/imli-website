"use client";

import { useEffect } from "react";

export function HashScrollHandler() {
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const element = document.getElementById(hash.slice(1));
      if (!element) return;
      const offset = 96;
      const top =
        element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });
    };

    if (window.location.hash) {
      setTimeout(handleHashScroll, 100);
    }
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, []);

  return null;
}
