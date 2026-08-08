"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Collections.module.css";
import { ArrowRight, X } from "lucide-react";
import ImageReveal from "@/components/ImageReveal/ImageReveal";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

gsap.registerPlugin(ScrollTrigger);

type Category = {
  title: string;
  description: string;
  cover: string;
  images: string[];
};

const menCollections: Category[] = [
  {
    title: "Three-Piece Suits",
    description:
      "Tailored for executives, weddings, ceremonies, and gentlemen who appreciate timeless elegance.",
    cover: "/images/suits/navy-mature.jpg",
    images: [
      "/images/suits/navy-mature.jpg",
      "/images/suits/brown-young.jpg",
      "/images/suits/grey-teen.jpg",
    ],
  },
  {
    title: "Premium Shalwar Kameez",
    description:
      "Sophisticated eastern wear crafted for everyday luxury and distinguished occasions.",
    cover: "/images/shalwar-kameez/black-mature.jpg",
    images: [
      "/images/shalwar-kameez/black-mature.jpg",
      "/images/shalwar-kameez/white-young.jpg",
      "/images/shalwar-kameez/olive-teen.jpg",
    ],
  },
  {
    title: "Formal Shirts",
    description:
      "Premium cotton shirts designed for business professionals with impeccable tailoring.",
    cover: "/images/shirts/white-mature.jpg",
    images: [
      "/images/shirts/white-mature.jpg",
      "/images/shirts/skyblue-young.jpg",
      "/images/shirts/black-teen.jpg",
    ],
  },
  {
    title: "Corporate Uniform",
    description:
      "Tailored corporate and hospitality uniforms crafted for a sharp, professional presence.",
    cover: "/images/uniforms/corporate-black-waistcoat.jpg",
    images: [
      "/images/uniforms/corporate-black-waistcoat.jpg",
      "/images/uniforms/corporate-black-gold-trim.jpg",
      "/images/uniforms/corporate-cream-mandarin.jpg",
      "/images/uniforms/corporate-grey-casual.jpg",
      "/images/uniforms/corporate-chef-white.jpg",
      "/images/uniforms/corporate-chef-black-apron.jpg",
    ],
  },
  {
    title: "Groom",
    description:
      "Bespoke sherwanis, tuxedos, and wedding ensembles tailored for the groom's most important day.",
    cover: "/images/groom/groom-black-tuxedo.jpg",
    images: [
      "/images/groom/groom-black-tuxedo.jpg",
      "/images/groom/groom-black-tuxedo-cream.jpg",
      "/images/groom/groom-navy-embroidered.jpg",
      "/images/groom/groom-maroon-embroidered.jpg",
      "/images/groom/groom-gold-sherwani.jpg",
      "/images/groom/groom-cream-sherwani.jpg",
      "/images/groom/groom-cream-nehru.jpg",
      "/images/groom/groom-ivory-nehru.jpg",
      "/images/groom/groom-ivory-suit.jpg",
      "/images/groom/groom-blush-embroidered.jpg",
      "/images/groom/groom-pink-nehru.jpg",
      "/images/groom/groom-powder-blue-sherwani.jpg",
      "/images/groom/groom-silver-waistcoat.jpg",
      "/images/groom/groom-olive-kurta.jpg",
    ],
  },
];

const womenCollections: Category[] = [
  {
    title: "Corporate Uniform",
    description:
      "Refined corporate and hospitality uniforms tailored for women in business settings.",
    cover: "/images/women-corporate-uniform/women-corporate-black-waistcoat.jpg",
    images: [
      "/images/women-corporate-uniform/women-corporate-black-waistcoat.jpg",
      "/images/women-corporate-uniform/women-corporate-black-gold-trim.jpg",
      "/images/women-corporate-uniform/women-corporate-cream-mandarin.jpg",
      "/images/women-corporate-uniform/women-corporate-grey-casual.jpg",
      "/images/women-corporate-uniform/women-corporate-chef-white.jpg",
      "/images/women-corporate-uniform/women-corporate-chef-black-apron.jpg",
    ],
  },
  {
    title: "Formal Wear",
    description:
      "Sophisticated three-piece and tailored ensembles for the modern professional woman.",
    cover: "/images/women-formal-wear/women-formal-navy-blazer.jpg",
    images: [
      "/images/women-formal-wear/women-formal-navy-blazer.jpg",
      "/images/women-formal-wear/women-formal-black-pantsuit.jpg",
      "/images/women-formal-wear/women-formal-burgundy.jpg",
      "/images/women-formal-wear/women-formal-grey-check.jpg",
      "/images/women-formal-wear/women-formal-grey-pantsuit.jpg",
      "/images/women-formal-wear/women-formal-powder-blue.jpg",
    ],
  },
];

export default function Collections() {
  const [gender, setGender] = useState<"men" | "women">("men");
  const [selected, setSelected] = useState<number | null>(null);

  // createPortal needs to always be "present" in the tree (not conditionally
  // called) for AnimatePresence to detect and animate its exit — but calling
  // it unconditionally means its document.body argument gets evaluated on
  // every render, including the server-side prerender where `document`
  // doesn't exist. Gating on a mounted flag (set true only client-side,
  // after hydration) keeps the portal out of the render tree entirely until
  // we're safely in the browser.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Detecting "we've hydrated on the client" has no alternative to an
    // effect; this isn't syncing to an external system, it's the one
    // legitimate use of this pattern the rule doesn't carve out for.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const [displayIndex, setDisplayIndex] = useState<number | null>(null);
  // Adjusting state directly during render (guarded so it only fires on an
  // actual change) is React's supported pattern for this, and avoids the
  // extra render + lint warning that a useEffect-based version would cause.
  if (selected !== null && selected !== displayIndex) {
    setDisplayIndex(selected);
  }

  const activeCollections = gender === "men" ? menCollections : womenCollections;

  const handleGenderChange = (next: "men" | "women") => {
    if (next === gender) return;
    setSelected(null);
    setGender(next);
  };

  // useLayoutEffect (not useEffect) is important here: regular effect
  // cleanup runs *after* the browser has already painted the new DOM state,
  // so on close there was one frame where the modal had already unmounted
  // (revealing the grid) but the page was still scroll-locked at the old
  // offset — a visible flash/jump. Layout effects run synchronously before
  // paint, so the unlock and the unmount land in the same frame.
  useLayoutEffect(() => {
    if (selected === null) return;

    lockScroll();

    return () => {
      unlockScroll();
    };
  }, [selected]);

  useEffect(() => {
    if (selected === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  useGSAP(
    () => {
      gsap.utils
        .toArray<HTMLElement>(".collection-image")
        .forEach((image) => {
          gsap.to(image, {
            y: -35,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
    },
    { dependencies: [gender] }
  );

  return (
    <section className={styles.collections} id="collections">
      <div className={styles.header}>
        <span>BESPOKE COLLECTIONS</span>

        <h2>
          Crafted For Every
          <br />
          Occasion
        </h2>

        <p>
          Discover timeless garments tailored with exceptional craftsmanship,
          premium fabrics and impeccable attention to detail.
        </p>
      </div>

      <div className={styles.genderToggle} role="tablist" aria-label="Shop by">
        <button
          type="button"
          role="tab"
          aria-selected={gender === "men"}
          className={`${styles.toggleBtn} ${
            gender === "men" ? styles.toggleBtnActive : ""
          }`}
          onClick={() => handleGenderChange("men")}
        >
          Men
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={gender === "women"}
          className={`${styles.toggleBtn} ${
            gender === "women" ? styles.toggleBtnActive : ""
          }`}
          onClick={() => handleGenderChange("women")}
        >
          Women
        </button>
      </div>

      <div className={styles.grid}>
        {activeCollections.map((item, index) => (
          <div key={`${gender}-${item.title}`} className={styles.card}>
            <div
              className={`${styles.imageWrapper} collection-image`}
            >
              <ImageReveal>
                <Image
                  src={item.cover}
                  alt={item.title}
                  fill
                  className={styles.image}
                />
              </ImageReveal>
            </div>

            <div className={styles.content}>
              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <button
                className="luxury-button"
                onClick={() => setSelected(index)}
              >
                Explore Collection
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {mounted &&
        createPortal(
        <AnimatePresence>
          {selected !== null && displayIndex !== null && (
            <motion.div
              key="collections-modal"
              className={`${styles.modal} collections-modal`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              onClick={(e) => {
                // Only close when the backdrop itself is clicked, not its content
                if (e.target === e.currentTarget) setSelected(null);
              }}
            >
              <div className={styles.modalPanel}>
                <button
                  className={styles.close}
                  onClick={() => setSelected(null)}
                  aria-label="Close gallery"
                >
                  <X size={28} />
                </button>

                <h2>{activeCollections[displayIndex].title}</h2>

                <div className={styles.gallery}>
                  {activeCollections[displayIndex].images.map((img, i) => (
                    <div key={i} className={styles.galleryImage}>
                      <Image
                        src={img}
                        alt={`${activeCollections[displayIndex].title} ${i + 1}`}
                        fill
                        className={styles.image}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}