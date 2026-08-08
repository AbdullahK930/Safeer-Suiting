"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styles from "./Loader.module.css";
import { lockScroll, unlockScroll } from "@/lib/scrollLock";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    lockScroll();

    const timer = setTimeout(() => {
      setLoading(false);
      unlockScroll();
    }, 2500);

    return () => {
      clearTimeout(timer);
      unlockScroll();
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className={styles.loader}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.8,
              ease: "easeInOut",
            },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className={styles.logo}
          >
            <Image
              src="/icon.png"
              alt="Safeer Suiting"
              width={120}
              height={120}
              priority
            />
          </motion.div>

          <motion.div
            className={styles.line}
            initial={{ width: 0 }}
            animate={{
              width: 220,
            }}
            transition={{
              delay: 0.4,
              duration: 1.2,
              ease: "easeInOut",
            }}
          />

          <motion.p
            className={styles.text}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.2,
              duration: 0.8,
            }}
          >
            Crafting Excellence Since 2000
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
