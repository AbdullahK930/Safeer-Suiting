"use client";
import Image from "next/image";
import {
    FaFacebookF,
    FaInstagram,
    FaWhatsapp,
  } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import styles from "./Footer.module.css";
import {
    Phone,
    MapPin,
  } from "lucide-react";

export default function Footer() {
  return (
    <footer className={styles.footer}>

      <div className={styles.container}>

        {/* Brand */}

        <div className={styles.brand}>

        <div className={styles.brandLogo}>

<Image
  src="/images/logo-icon.png"
  alt="Safeer Suiting"
  width={70}
  height={70}
/>

<div>

  <h2>SAFEER SUITING</h2>

  <p>
    Premium bespoke tailoring, formal shirts, uniforms and eastern wear,
    crafted with precision for every occasion.
  </p>

</div>

</div>

        </div>

        {/* Quick Links */}

        <div className={styles.links}>

          <h3>Quick Links</h3>

          <a href="#heritage">Heritage</a>
          <a href="#craftsmanship">Craftsmanship</a>
          <a href="#collections">Collections</a>
          <a href="#contact">Contact</a>

        </div>

        {/* Contact */}

        <div className={styles.contact}>

          <h3>Visit Us</h3>

          <div className={styles.info}>

            <MapPin size={18}/>

            <p>
            Panorama Center, Stadium Road,
            Shamsabad, Rawalpindi, 
            Punjab, Pakistan.
            </p>

          </div>

          <div className={styles.info}>

            <Phone size={18}/>

            <p>+92-312-8957093</p>

          </div>

        </div>

        {/* Social */}

        <div className={styles.social}>

          <h3>Follow Us</h3>

          <div className={styles.icons}>

          <a
            href="https://www.facebook.com/safeer.suiting"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF size={18} />
          </a>

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>

          <a
            href="https://www.tiktok.com/@safeersuiting8?_r=1&_t=ZS-98UdSKnGE11"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <FaTiktok size={18} />
          </a>

          <a
            href="https://wa.me/923128957093"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <FaWhatsapp size={20} />
          </a>

          </div>

        </div>

      </div>

      <div className={styles.bottom}>

      © {new Date().getFullYear()} Safeer Suiting. All Rights Reserved.

      </div>

    </footer>
  );
}
