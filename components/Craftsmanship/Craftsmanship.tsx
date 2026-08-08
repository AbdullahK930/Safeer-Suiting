"use client";

import Image from "next/image";
import styles from "./Craftsmanship.module.css";
import { Scissors, Ruler, Sparkles } from "lucide-react";
import ImageReveal from "@/components/ImageReveal/ImageReveal";

export default function Craftsmanship() {
  return (
    <section
      className={`${styles.section} reveal-section`}
      id="craftsmanship"
    >
      <div className={styles.heading}>
        <span className="fade-up">OUR CRAFTSMANSHIP</span>

        <h2 className="fade-up shimmer-text">
          Tailoring is not just a profession.
          <br />
          It is an art perfected over generations.
        </h2>

        <p className="fade-up">
          Every garment at Safeer Suiting is handcrafted with exceptional
          precision, using premium fabrics and decades of experience.
        </p>
      </div>

      <div className={styles.cards}>
        <div className={`${styles.card} fade-up`}>
          <div className={styles.imageBox}>
            <ImageReveal>
              <Image
                src="/images/detail.jpg"
                alt="Precision Tailoring"
                fill
                className={styles.image}
              />
            </ImageReveal>
          </div>

          <Scissors size={34} className={styles.icon} />

          <h3>Precision Cutting</h3>

          <p>
            Every pattern is measured and cut with absolute accuracy to
            create garments that fit flawlessly.
          </p>
        </div>

        <div className={`${styles.card} fade-up`}>
          <div className={styles.imageBox}>
            <ImageReveal>
              <Image
                src="/images/craftsmanship.jpg"
                alt="Hand Stitching"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.image}
              />
            </ImageReveal>
          </div>

          <Sparkles size={34} className={styles.icon} />

          <h3>Handcrafted Finish</h3>

          <p>
            Fine detailing and meticulous hand-finishing ensure timeless
            elegance in every stitch.
          </p>
        </div>

        <div className={`${styles.card} fade-up`}>
          <div className={styles.imageBox}>
            <ImageReveal>
              <Image
                src="/images/footer-texture.jpg"
                alt="Perfect Fit"
                fill
                className={styles.image}
              />
            </ImageReveal>
          </div>

          <Ruler size={34} className={styles.icon} />

          <h3>Perfect Fit</h3>

          <p>
            Bespoke tailoring designed around your posture, measurements,
            and personal style.
          </p>
        </div>
      </div>
    </section>
  );
}