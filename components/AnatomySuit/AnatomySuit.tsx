"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./AnatomySuit.module.css";

gsap.registerPlugin(ScrollTrigger);

const suitParts = [
  {
    number: "01",
    title: "Natural Shoulder",
    description:
      "Designed to follow the body's natural silhouette for elegant comfort.",
  },
  {
    number: "02",
    title: "Peak Lapel",
    description:
      "Sharp handcrafted lapels that define timeless bespoke elegance.",
  },
  {
    number: "03",
    title: "Floating Canvas",
    description:
      "Traditional full-canvas construction allowing the jacket to mould naturally over time.",
  },
  {
    number: "04",
    title: "Hand Finished Sleeve",
    description:
      "Precisely balanced sleeves ensuring exceptional movement and comfort.",
  },
  {
    number: "05",
    title: "Horn Buttons",
    description:
      "Premium natural horn buttons individually selected for every garment.",
  },
  {
    number: "06",
    title: "Perfect Final Fitting",
    description:
      "Multiple fittings guarantee flawless proportions before delivery.",
  },
];

export default function AnatomySuit() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let particlesStarted = false;
    const cards = gsap.utils.toArray<HTMLElement>(".anatomy-card");

    // ----------------------------
    // SECTION ENTRANCE (opacity only — no transform here,
    // since a transform on this section would break the fixed-position
    // pin's containing block below)
    // ----------------------------
    gsap.from(sectionRef.current, {
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });

    // ----------------------------
    // PIN THE IMAGE PANEL
    // ----------------------------
    // Desktop: content and image sit side-by-side, so pinning while the
    // content column scrolls past keeps the image locked in its column.
    // Mobile/tablet (<=1100px, matching the CSS breakpoint where .wrapper
    // stacks and .imageWrapper gets order:-1 to appear first): the image
    // now sits ABOVE the content in normal flow, so the pin has to trigger
    // as soon as the image itself reaches the top — not once the content
    // column (which now starts only after the full image height) does —
    // otherwise the image has already scrolled out of view by the time the
    // old trigger condition fired, causing a visible jump instead of a
    // smooth pin.
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1101px)",
        isMobile: "(max-width: 1100px)",
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };

        ScrollTrigger.create({
          trigger: isDesktop ? contentRef.current : pinRef.current,
          start: isDesktop ? "top 120px" : "top 90px",
          endTrigger: contentRef.current,
          end: "bottom bottom",
          pin: pinRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        });
      }
    );
    
    // ----------------------------
    // INITIAL STATES
    // ----------------------------
    gsap.set(".blueprint", {
      opacity: 1,
      scale: 1,
      overwrite:"auto",
    });
    
    gsap.set(".half", {
      opacity: 0,
      scale: 0.96,
      overwrite:"auto",
    });
    
    gsap.set(".finished", {
      opacity: 0,
      scale: 0.96,
      overwrite:"auto",
    });
    
    gsap.set("." + styles.thread, {
      scaleY: 0,
      transformOrigin: "top",
      opacity: 1,
      overwrite:"auto",
    });
    gsap.to("." + styles.lightSweep,{
      x:"250%",
      duration:4,
      repeat:-1,
      ease:"none"
    });
    
    // ----------------------------
    // CARD ANIMATIONS
    // ----------------------------
    cards.forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        x: -70,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      });
    });
    
    // ----------------------------
    // CARD 1
    // ----------------------------
    ScrollTrigger.create({
      trigger: cards[0],
      start: "top center",
      invalidateOnRefresh: true,
    
      onEnter: () => {
    
        gsap.to(".blueprint", {
          opacity: 1,
          duration: 0.5,
        });
    
        gsap.to(".half", {
          opacity: 0,
          duration: 0.5,
        });
    
        gsap.to(".finished", {
          opacity: 0,
          duration: 0.5,
        });
    
      },
    
      onEnterBack: () => {
    
        gsap.to(".blueprint", {
          opacity: 1,
        });
    
        gsap.to(".half", {
          opacity: 0,
        });
    
        gsap.to(".finished", {
          opacity: 0,
        });
    
      },
    
    });
    
    // ----------------------------
    // CARD 2
    // ----------------------------
    ScrollTrigger.create({
      trigger: cards[1],
      start: "top center",
      invalidateOnRefresh: true,
    
      onEnter: () => {
    
        gsap.to("." + styles.thread, {
          scaleY: 1,
          duration: 0.8,
        });
    
      },
    
    });
    
    // ----------------------------
    // CARD 3
    // ----------------------------
    ScrollTrigger.create({
      trigger: cards[2],
      start: "top center",
      invalidateOnRefresh: true,
  
      onEnter: () => {
    
        gsap.to(".blueprint", {
          opacity: 0,
          duration: 0.7,
        });
    
        gsap.to(".half", {
          opacity: 1,
          scale: 1,
          duration: 0.7,
        });
    
      },
    
    });
    
    // ----------------------------
    // CARD 4
    // ----------------------------
    ScrollTrigger.create({
      trigger: cards[3],
      start: "top center",
      invalidateOnRefresh: true,
    
      onEnter: () => {
    
        gsap.to(".half", {
          scale: 1.05,
          duration: 0.8,
        });
    
      },
    
    });
    
    // ----------------------------
    // CARD 5
    // ----------------------------
    ScrollTrigger.create({
      trigger: cards[4],
      start: "top center",
      invalidateOnRefresh: true,
    
      onEnter: () => {
    
        gsap.to(".half", {
          opacity: 0,
          duration: 0.6,
        });
    
        gsap.to(".finished",{
          opacity: 1,
          scale:1.03,
          duration:0.8,
          overwrite:"auto"
        });
    
      },
    
    });
    
    // ----------------------------
    // CARD 6
    // ----------------------------
    ScrollTrigger.create({
      trigger: cards[5],
      start: "top center",
      invalidateOnRefresh: true,
    
      onEnter: () => {
    
        gsap.to(".finished", {
          scale: 1.08,
          duration: 1,
          ease: "power3.out",
        });
    
        gsap.to("." + styles.thread, {
          opacity: 0.25,
          duration: 0.6,
        });
        if (particlesStarted) return;
  particlesStarted = true;



const particles = gsap.utils.toArray<HTMLElement>("." + styles.particle);

particles.forEach((particle) => {

  gsap.set(particle,{
    x: gsap.utils.random(30,350),
    y: gsap.utils.random(80,700),
    scale: gsap.utils.random(.5,1.5)
  });

  gsap.to(particle,{
    y:"-=180",
    x:"+=" + gsap.utils.random(-40,40),
    opacity:0,
    duration:gsap.utils.random(3,6),
    repeat:-1,
    ease:"none",
    delay:gsap.utils.random(0,4),

    onRepeat(){
      gsap.set(particle,{
        y:700,
        x:gsap.utils.random(30,350),
        opacity:.8
      });
    }
  });

});
    
      },

      
      
  
    });
   

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      id="anatomy"
    >
      <div className="container">

        <span className={styles.tag}>
          ANATOMY OF A BESPOKE SUIT
        </span>

        <h2 className={`${styles.heading} shimmer-text`}>
          Every Detail
          <br />
          Has A Purpose
        </h2>

        <p className={styles.intro}>
          Exceptional tailoring is not defined by what is visible,
          but by every hidden layer, every stitch and every decision
          made by master craftsmen.
        </p>

        <div className={styles.wrapper}>

          {/* LEFT */}

          <div className={styles.content} ref={contentRef}>

            {suitParts.map((item) => (

              <div
                key={item.number}
                className={`${styles.card} anatomy-card`}
              >

                <div className={styles.dot}></div>

                <span className={styles.number}>
                  {item.number}
                </span>

                <div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                </div>

              </div>

            ))}

          </div>

          {/* RIGHT */}

          <div
            className={`${styles.imageWrapper} anatomy-image anatomy-pin`}
            ref={pinRef}
          >
          <div className={styles.lightSweep}></div>
          

  <Image
    src="/images/anatomy/blueprint.png"
    alt="Blueprint"
    fill
    className={`${styles.layer} blueprint`}
  />

  <Image
    src="/images/anatomy/half-tailored.png"
    alt="Half Tailored"
    fill
    className={`${styles.layer} half`}
  />

  <Image
    src="/images/anatomy/finished.png"
    alt="Finished Gentleman"
    fill
    className={`${styles.layer} finished`}
  />
  <div className={styles.thread}></div>

  {Array.from({ length: 10 }).map((_, i) => (
  <span
    key={i}
    className={styles.particle}
  />
))}

</div>

        </div>

      </div>
    </section>
  );
}