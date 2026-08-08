"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageReveal from "@/components/ImageReveal/ImageReveal";
import styles from "./Hero.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Intro Animation
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    tl.from(".hero-tag", {
      opacity: 0,
      y: 30,
      duration: 0.8,
    })
      .from(
        ".hero-title",
        {
          opacity: 0,
          y: 60,
          duration: 1,
        },
        "-=0.4"
      )
      .from(
        ".hero-description",
        {
          opacity: 0,
          y: 40,
          duration: 0.8,
        },
        "-=0.5"
      )
      .from(
        ".hero-buttons",
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
        },
        "-=0.4"
      )
      .from(
        ".hero-stats > div",
        {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.7,
        },
        "-=0.3"
      )
      .from(
        ".hero-scroll",
        {
          opacity: 0,
          y: -10,
          duration: 0.5,
        },
        "-=0.2"
      );

    // Hero Background Parallax
    gsap.to(".hero-background", {
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Hero Glow
    gsap.to(".hero-glow", {
      y: -120,
      opacity: 0.7,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Hero Image Parallax
    gsap.to(".hero-image", {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-image",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Animated Counters
    gsap.utils.toArray<HTMLElement>(".counter").forEach((counter) => {
      const target = Number(counter.dataset.value);

      gsap.fromTo(
        counter,
        {
          innerText: 0,
        },
        {
          innerText: target,
          duration: 2,
          ease: "power2.out",
          snap: {
            innerText: 1,
          },
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            once: true,
          },
          onUpdate() {
            const value = Math.floor(Number(counter.innerText));

            if (target === 25) {
              counter.innerText = `${value}+`;
            } else if (target === 10000) {
              counter.innerText = `${value.toLocaleString()}+`;
            } else {
              counter.innerText = value.toString();
            }
          },
        }
      );
    });
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className={`${styles.hero} hero-section`}
      id="home"
    >
      {/* Background Image */}
     <ImageReveal>
        <div className={`${styles.background} hero-background hero-image`}>
          <Image
            src="/images/hero.jpg"
            alt="Safeer Suiting Bespoke Tailoring"
            fill
            priority
            quality={75}
            sizes="100vw"
            className={styles.image}
          />
        </div>
      </ImageReveal>

      {/* Overlay */}
      <div className={`${styles.overlay} hero-overlay`} />

      {/* Luxury Glow */}
      <div className={`${styles.glow} hero-glow`} />

      {/* Content */}
      <div className={`${styles.content} hero-content`}>
      <h1 className={`${styles.title} hero-title shimmer-text`}>
  Timeless
  <br />
  Elegance,
  <br />
  Perfectly Tailored
</h1>

<span className={`${styles.tag} hero-tag`}>
BESPOKE TAILORING • ESTABLISHED 2000
</span>

<p className={`${styles.description} hero-description`}>
  Since 2000, Safeer Suiting has crafted bespoke garments for
  presidents, prime ministers, diplomats, army generals,
  entrepreneurs, and gentlemen who appreciate timeless elegance
  and exceptional craftsmanship.
</p>

        <div className={`${styles.buttons} hero-buttons`}>
          <a
            href="#collections"
            className={`${styles.primaryButton} luxury-button`}
          >
            Explore Collections
          </a>

          <a
            href="#contact"
            className={`${styles.secondaryButton} luxury-button`}
          >
            Book Appointment
          </a>
        </div>

        <div className={`${styles.stats} hero-stats`}>
          <div>
            <h3 className="counter" data-value="25">
              0
            </h3>
            <span>Years of Excellence</span>
          </div>

          <div>
            <h3 className="counter" data-value="2000">
              0
            </h3>
            <span>Established</span>
          </div>

          <div>
            <h3 className="counter" data-value="10000">
              0
            </h3>
            <span>Luxury Clients</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#heritage"
        className={`${styles.scroll} hero-scroll`}
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}