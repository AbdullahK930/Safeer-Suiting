"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Loader from "@/components/Loader/Loader";
import Cursor from "@/components/Cursor/Cursor";
import AmbientBackground from "@/components/AmbientBackground/AmbientBackground";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import BespokeJourney from "@/components/BespokeJourney/BespokeJourney";
import AnatomySuit from "@/components/AnatomySuit/AnatomySuit";
import Heritage from "@/components/Heritage/Heritage";
import Craftsmanship from "@/components/Craftsmanship/Craftsmanship";
import Collections from "@/components/Collections/Collections";
import Testimonials from "@/components/Testimonials/Testimonials";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray<HTMLElement>("section");

      sections.forEach((section) => {
        // Hero & Anatomy already animate themselves
        if (section.id === "home" || section.id === "anatomy") return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });

        // Section entrance
        tl.from(section, {
          opacity: 0,
          y: 80,
          duration: 1,
          ease: "power3.out",
        });

        // Headings
        const headings = section.querySelectorAll("h1, h2, h3");

        if (headings.length) {
          tl.from(
            headings,
            {
              opacity: 0,
              y: 35,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
            },
            "-=0.7"
          );
        }

        // Paragraphs
        const paragraphs = section.querySelectorAll("p");

        if (paragraphs.length) {
          tl.from(
            paragraphs,
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
              stagger: 0.05,
              ease: "power2.out",
            },
            "-=0.6"
          );
        }

        // Cards
        const cards = section.querySelectorAll(
          ".card, .collection-card, .anatomy-card"
        );

        if (cards.length) {
          tl.from(
            cards,
            {
              opacity: 0,
              y: 45,
              duration: 0.7,
              stagger: 0.12,
              ease: "power3.out",
            },
            "-=0.5"
          );
        }

        // Images (fade only)
        const images = section.querySelectorAll<HTMLImageElement>("img");

        images.forEach((image) => {
          gsap.from(image, {
            opacity: 0,
            scale: 1.05,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: image,
              start: "top 85%",
              once: true,
            },
          });
        });
      });

      // No manual cleanup needed here — useGSAP's own `scope` (below)
      // automatically reverts/kills only the ScrollTriggers *this* hook
      // created when the component unmounts or re-runs.
    },
    { scope: pageRef }
  );

  return (
    <main ref={pageRef}>
      <Loader />

      <Cursor />

      <AmbientBackground />

      <Navbar />

      <Hero />

      <BespokeJourney />

      <AnatomySuit />

      <Heritage />

      <Craftsmanship />

      <Collections />

      <Testimonials />

      <Contact />

      <Footer />
    </main>
  );
}