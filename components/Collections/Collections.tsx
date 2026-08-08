"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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

  const activeCollections = gender === "men" ? menCollections : womenCollections;

  const handleGenderChange = (next: "men" | "women") => {
    if (next === gender) return;
    setSelected(null);
    setGender(next);
  };

  // Only acts (and registers cleanup) while the modal is actually open, so
  // mounting with selected=null never fires a stray unlock that could
  // cancel an unrelated lock already held elsewhere (e.g. the page Loader,
  // or the mobile nav menu).
  useEffect(() => {
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

      {selected !== null &&
        createPortal(
          <div
            className={`${styles.modal} collections-modal`}
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

              <h2>{activeCollections[selected].title}</h2>

              <div className={styles.gallery}>
                {activeCollections[selected].images.map((img, i) => (
                  <div key={i} className={styles.galleryImage}>
                    <Image
                      src={img}
                      alt={`${activeCollections[selected].title} ${i + 1}`}
                      fill
                      className={styles.image}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
