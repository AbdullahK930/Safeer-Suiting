"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Mobile links need to close the (scroll-locked) menu *and* then navigate.
  // Doing this via the mobileOpen useEffect alone risks a race: the browser's
  // native hash-jump can happen before React's effect restores the locked
  // scroll position, which would then immediately snap the page back to
  // where it started. Handling both steps explicitly, in order, avoids that.
  const handleMobileNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    unlockScroll();

    requestAnimationFrame(() => {
      const target = document.querySelector(hash);
      if (target) {
        if (window.__lenis) {
          window.__lenis.scrollTo(target as HTMLElement, { offset: 0 });
        } else {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  };

  // Lock body scroll while the mobile menu is open, close on Escape.
  // Only acts (and registers cleanup) while actually open, so mounting
  // with mobileOpen=false never fires a stray unlock that could cancel
  // an unrelated lock already held elsewhere (e.g. the page Loader).
  useEffect(() => {
    if (!mobileOpen) return;

    lockScroll();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      unlockScroll();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  useGSAP(() => {
    // Intro animation
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    tl.fromTo(
      ".nav-logo",
      {
        opacity: 0,
        x: -40,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
      }
    )
    .fromTo(
      ".nav-item",
      {
        opacity: 0,
        y: -20,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
      },
      "-=0.4"
    )
    .fromTo(
      ".nav-btn",
      {
        opacity: 0,
        x: 30,
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
      },
      "-=0.4"
    );

    // Navbar on scroll
    gsap.to(navRef.current, {
      backgroundColor: "rgba(10,10,10,0.82)",
      backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "60 top",
        end: "bottom bottom",
        toggleActions: "play reverse play reverse",
      },
    });
  }, []);

  return (
    <header ref={navRef} className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link href="/" className="logo nav-logo">
        <Image
  src="/images/logo-icon.png"
  alt="Safeer Suiting"
  width={46}
  height={46}
  className="logo-icon"
  priority
/>

          <div className="logo-text">
            <span>SAFEER</span>
            <small>SUITING</small>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="nav-links">
          <Link className="nav-item" href="#heritage">
            Heritage
          </Link>

          <Link className="nav-item" href="#craftsmanship">
            Craftsmanship
          </Link>

          <Link className="nav-item" href="#collections">
            Collections
          </Link>

          <Link className="nav-item" href="#contact">
            Contact
          </Link>
        </nav>

        {/* CTA */}
        <a href="#contact" className="appointment-btn nav-btn luxury-button">
          Book Appointment
        </a>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="menu-toggle"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {/* Mobile menu panel */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <nav className="mobile-nav-links">
          <Link
            href="#heritage"
            onClick={(e) => handleMobileNavClick(e, "#heritage")}
          >
            Heritage
          </Link>

          <Link
            href="#craftsmanship"
            onClick={(e) => handleMobileNavClick(e, "#craftsmanship")}
          >
            Craftsmanship
          </Link>

          <Link
            href="#collections"
            onClick={(e) => handleMobileNavClick(e, "#collections")}
          >
            Collections
          </Link>

          <Link href="#contact" onClick={(e) => handleMobileNavClick(e, "#contact")}>
            Contact
          </Link>
        </nav>

        <a
          href="#contact"
          onClick={(e) => handleMobileNavClick(e, "#contact")}
          className="appointment-btn luxury-button"
        >
          Book Appointment
        </a>
      </div>
    </header>
  );
}