"use client";

import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 2,
  
      prevent: (node) => {
        return !!node.closest(".collections-modal");
      },
    });
  
    // Connect Lenis to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
  
    // GSAP ticker
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };

  }, []);

  return <>{children}</>;
}