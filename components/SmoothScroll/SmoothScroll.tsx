"use client";

import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function SmoothScroll({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    // Mobile browsers (Chrome/Safari) fire resize events when the
    // address bar shows/hides during scroll, which would otherwise
    // make ScrollTrigger think the layout changed mid-scroll and
    // re-measure/jump — this keeps pins (e.g. AnatomySuit) stable.
    ScrollTrigger.config({ ignoreMobileResize: true });

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 2,
  
      prevent: (node) => {
        return !!node.closest(".collections-modal");
      },
    });

    // Exposed so overlays (mobile menu, loader, collections modal) can
    // pause/resume it while they lock body scroll — otherwise Lenis's
    // own rAF-driven momentum can keep nudging the page underneath a
    // "closed" fixed overlay.
    window.__lenis = lenis;
  
    // Connect Lenis to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
  
    // GSAP ticker
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      window.__lenis = undefined;
    };

  }, []);

  return <>{children}</>;
}