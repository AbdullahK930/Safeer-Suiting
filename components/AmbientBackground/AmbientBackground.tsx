"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./AmbientBackground.module.css";

export default function AmbientBackground() {
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);
  const orb3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // The continuous infinite animation is what forces the browser to keep
    // re-compositing these blurred layers forever, on every single frame —
    // that ongoing cost (not just the blur itself) is a big part of what
    // made this expensive enough to crash on zoom. On mobile, where GPU
    // memory is most constrained (and where the crash was reproduced),
    // skip the animation entirely: a static blurred layer gets rasterized
    // once and cached, rather than recomputed indefinitely.
    if (window.matchMedia("(max-width: 768px)").matches) return;

    gsap.to(orb1.current, {
      x: 120,
      y: -90,
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(orb2.current, {
      x: -100,
      y: 80,
      duration: 22,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(orb3.current, {
      x: 70,
      y: 120,
      duration: 26,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div ref={orb1} className={`${styles.orb} ${styles.one}`} />
      <div ref={orb2} className={`${styles.orb} ${styles.two}`} />
      <div ref={orb3} className={`${styles.orb} ${styles.three}`} />
    </div>
  );
}