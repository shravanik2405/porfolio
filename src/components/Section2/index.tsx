import React, { useState, useEffect } from "react";
import books1 from "../../assets/books1.png";
import books2 from "../../assets/books3.png";
import { theme } from "../../theme";
import styles from "./styles.module.css";

const images = [books1, books2];

export const Section2 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 500); // Toggle every 500ms

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
      <div className={styles.imageContainer}>
        <img
          src={images[currentImageIndex]}
          alt='Books with Cat'
          className={styles.bookImage}
        />
      </div>
    </section>
  );
};
