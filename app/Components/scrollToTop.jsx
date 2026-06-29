"use client";

import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    // Only scroll to top if user hasn't scrolled yet
    if (window.scrollY === 0) {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}