"use client";

import styles from "./Testimonials.module.css";
import { Award, Crown, ShieldCheck } from "lucide-react";

export default function Testimonials() {
  return (
    <section
      className={`${styles.testimonials} reveal-section`}
      id="testimonials"
    >
      <div className={styles.header}>
        <span className="fade-up">TRUSTED FOR OVER 25+ YEARS</span>

        <h2 className="fade-up shimmer-text">
          A Legacy Worn by
          <br />
          Leaders & Gentlemen
        </h2>

        <p className="fade-up">
          Safeer Suiting has proudly served generations of distinguished
          clients through exceptional bespoke tailoring and unwavering
          commitment to craftsmanship.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={`${styles.card} fade-up`}>
          <Award className={styles.icon} size={40} />

          <h3>25+ Years of Excellence</h3>

          <p>
            For more than two decades, Safeer Suiting has been delivering
            premium bespoke tailoring with precision, consistency and
            unmatched craftsmanship.
          </p>
        </div>

        <div className={`${styles.card} fade-up`}>
          <Crown className={styles.icon} size={40} />

          <h3>Distinguished Clientele</h3>

          <p>
            Our creations have been worn by presidents, prime ministers,
            army generals, chief justices, diplomats, and business leaders.
          </p>
        </div>

        <div className={`${styles.card} fade-up`}>
          <ShieldCheck className={styles.icon} size={40} />

          <h3>Craftsmanship You Can Trust</h3>

          <p>
            Every stitch reflects our commitment to premium fabrics,
            perfect fitting and exceptional attention to detail,
            ensuring every customer leaves with confidence.
          </p>
        </div>
      </div>
    </section>
  );
}