"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ImageReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      const image = ref.current.querySelector("img");
      if (!image) return;

      // Plain fade-in (+ a very subtle scale-down for a touch of polish) —
      // no gold curtain/overlay sweeping across the image anymore.
      gsap.from(image, {
        opacity: 0,
        scale: 1.06,
        duration: 1.2,
        ease: "power2.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}
