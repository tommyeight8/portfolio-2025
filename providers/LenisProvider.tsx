// components/LenisProvider.tsx
"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Clean up
      return () => lenis.destroy();
    }, 100); // delay 100ms to allow layout to stabilize

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
