import styles from "./styles.module.css";
import MeditatingWoman from "./MeditatingWoman";
import booksAndCat from "../../assets/books-and-cat.svg";

export const Section2 = () => {
  const images = [booksAndCat];
  return (
    <section className={styles.section}>
      <div className={styles.imageContainer}>
        <img
          src={images[0]}
          alt='Books with Cat'
          className={styles.bookImage}
        />
      </div>

      <div className={styles.meditatingContainer}>
        <MeditatingWoman />
        <div className={styles.toolsText}>Tools I ship with</div>
      </div>
    </section>
  );
};
