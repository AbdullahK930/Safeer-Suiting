"use client";

import Image from "next/image";
import styles from "./Heritage.module.css";
import { ArrowRight } from "lucide-react";
import ImageReveal from "@/components/ImageReveal/ImageReveal";

export default function Heritage() {
  return (
    <section className={styles.heritage} id="heritage">
      <div className={styles.imageContainer}>
        <ImageReveal>
          <Image
            src="/images/heritage.jpg"
            alt="Safeer Suiting Heritage"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className={styles.image}
          />
        </ImageReveal>
      </div>

      <div className={styles.content}>
        <span className={styles.subtitle}>
          ESTABLISHED 2000
        </span>

        <h2 className={`${styles.title} shimmer-text`}>
          2+ Decades of
          <br />
          Bespoke Excellence
        </h2>

        <div className={styles.line}></div>

        <p className={styles.description}>
          Since 2000, Safeer Suiting has represented the pinnacle of bespoke
          tailoring in Pakistan. Founded by Mr. Safeer, our atelier has crafted
          garments for presidents, prime ministers, army generals, chief
          justices, distinguished businessmen, and celebrated television
          productions.
        </p>

        <p className={styles.description}>
          Every garment reflects meticulous precision, premium fabrics,
          and timeless craftsmanship passed down through generations.
          We do not simply stitch clothing—we create a legacy of elegance.
        </p>

        <a href="#craftsmanship" className={`${styles.button} luxury-button`}>
          Discover Our Heritage
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}