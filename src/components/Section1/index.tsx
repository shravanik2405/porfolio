import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import frame1 from "../../assets/frame1.png";
import frame2 from "../../assets/frame2.png";
import birds from "../../assets/birds.png";
import { theme } from "../../theme";

const images = [frame1, frame2];

export const Section1 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={styles.section}
      style={{
        background: theme.gradients.splitBackground(
          theme.colors.primary,
          theme.colors.secondary
        ),
      }}>
      <img src={birds} alt='Birds' className={styles.birdsImage} />

      <div className={styles.container}>
        <div className={styles.textContainer}>
          <motion.h1
            className={styles.firstName}
            style={{ color: theme.colors.secondary }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}>
            <motion.span
              style={{
                display: "inline-block",
                transformOrigin: "bottom right",
              }}
              initial={{ rotate: 20 }}
              animate={{ rotate: 0, y: [0, -20, 0] }}
              transition={{
                rotate: { delay: 2, duration: 0.5, type: "spring" },
                y: { delay: 2, duration: 0.5, times: [0, 0.5, 1] },
              }}>
              S
            </motion.span>
            hravani
          </motion.h1>
          <motion.h1
            className={styles.lastName}
            style={{ color: theme.colors.primary }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}>
            <motion.span
              style={{
                display: "inline-block",
                transformOrigin: "bottom right",
              }}
              initial={{ rotate: 20 }}
              animate={{ rotate: 0, y: [0, -20, 0] }}
              transition={{
                rotate: { delay: 2.2, duration: 0.5, type: "spring" },
                y: { delay: 2.2, duration: 0.5, times: [0, 0.5, 1] },
              }}>
              K
            </motion.span>
            hatri
          </motion.h1>
        </div>

        <div className={styles.imageWrapper}>
          <img
            src={images[currentImageIndex]}
            alt='Girl Reading'
            className={styles.girlImage}
          />
        </div>
      </div>
    </section>
  );
};
