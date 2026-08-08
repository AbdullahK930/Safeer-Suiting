"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Cursor.module.css";

const INTERACTIVE_SELECTOR = "button, a, .luxury-btn, .nav-btn, .luxury-button";

export default function Cursor() {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      gsap.to(cursor.current, {
        x: e.clientX,
        y: e.clientY,
        ease: "expo.out",
        duration: 0.12, 
      });
    };

    window.addEventListener("mousemove", move);

    // Event delegation via mouseover/mouseout (which bubble, unlike
    // mouseenter/mouseleave) so this keeps working for elements that
    // mount later — e.g. the Collections gallery modal's close button —
    // instead of only the buttons/links present at initial page load.
    const handleOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        INTERACTIVE_SELECTOR
      );
      if (!target) return;

      gsap.to(cursor.current, {
        scale: 2.6,
        backgroundColor: "#d4af37",
        boxShadow: "0 0 30px #d4af37",
        duration: 0.25,
      });
    };

    const handleOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        INTERACTIVE_SELECTOR
      );
      if (!target) return;

      gsap.to(cursor.current, {
        scale: 1,
        backgroundColor: "#d4af37",
        boxShadow: "0 0 12px #d4af37",
        duration: 0.25,
      });
    };

    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
    };
  }, []);

  return <div ref={cursor} className={styles.cursor} />;
}