import { theme } from "../../theme";
import styles from "./styles.module.css";
import MeditatingWoman from "./MeditatingWoman";
import booksAndCat from "../../assets/books-and-cat.svg";
import { SquigglyBackground } from "../Common/SquigglyBackground";

export const Section2 = () => {
  const images = [booksAndCat];
  return (
    <section className={styles.section}>
      <SquigglyBackground
        topColor={theme.colors.primary}
        bottomColor={theme.colors.secondary}
      />
      <div className={styles.imageContainer}>
        <img
          src={images[0]}
          alt='Books with Cat'
          className={styles.bookImage}
        />
      </div>

      <div className={styles.meditatingContainer}>
        <MeditatingWoman />
      </div>
    </section>
  );
};
