"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./AmbientBackground.module.css";

export default function AmbientBackground() {
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);
  const orb3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
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