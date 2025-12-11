import { useState, useEffect } from "react";
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
          <h1
            className={styles.firstName}
            style={{ color: theme.colors.secondary }}>
            SHRAVANI
          </h1>
          <h1
            className={styles.lastName}
            style={{ color: theme.colors.primary }}>
            KHATRI
          </h1>
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
