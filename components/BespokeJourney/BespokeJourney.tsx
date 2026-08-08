"use client";

import styles from "./BespokeJourney.module.css";
import {
  Ruler,
  PencilRuler,
  Scissors,
  Shirt,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: Ruler,
    title: "Measurement",
    description:
      "Every garment begins with precise measurements for a flawless personal fit.",
  },
  {
    icon: PencilRuler,
    title: "Pattern Making",
    description:
      "Our master tailors create individual patterns crafted specifically for you.",
  },
  {
    icon: Scissors,
    title: "Precision Cutting",
    description:
      "Premium fabrics are hand-cut with meticulous attention to every detail.",
  },
  {
    icon: Shirt,
    title: "Hand Stitching",
    description:
      "Each piece is assembled using traditional tailoring techniques refined over decades.",
  },
  {
    icon: Sparkles,
    title: "Final Fitting",
    description:
      "Every garment is carefully adjusted until the fit is absolutely perfect.",
  },
  {
    icon: CheckCircle2,
    title: "Timeless Elegance",
    description:
      "The finished garment reflects the heritage and craftsmanship of Safeer Suiting.",
  },
];

export default function BespokeJourney() {
  return (
    <section className={styles.section} id="journey">
      <div className="container">

        <span className={styles.tag}>
          THE BESPOKE JOURNEY
        </span>

        <h2 className={`${styles.heading} shimmer-text`}>
          From Fabric
          <br />
          To Masterpiece
        </h2>

        <div className={styles.timeline}>
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div className={styles.card} key={index}>
                <div className={styles.icon}>
                  <Icon size={28} />
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

                {index !== steps.length - 1 && (
                  <div className={styles.line}></div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}