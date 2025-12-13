import { theme } from "../../theme";
import styles from "./styles.module.css";

import vase3 from "../../assets/vase3.svg";
import vase4 from "../../assets/vase4.svg";
import vase5 from "../../assets/vase5.svg";
import vase1 from "../../assets/vase1.svg";
import vase2 from "../../assets/vase2.svg";

import booksAndCat from "../../assets/books-and-cat.svg";
import { useEffect, useState } from "react";

export const Section2 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const vaseImages = [vase1, vase2, vase3, vase4, vase5];
  const images = [booksAndCat];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % vaseImages.length);
    }, 500); // Change frame every 500ms

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
          src={images[0]}
          alt='Books with Cat'
          className={styles.bookImage}
        />
      </div>

      <div className={styles.vaseImageContainer}>
        <img
          src={vaseImages[currentImageIndex]}
          alt='Frame Animation'
          className={styles.frameImage}
        />
      </div>
    </section>
  );
};
