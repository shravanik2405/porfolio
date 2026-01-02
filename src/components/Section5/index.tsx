import { theme } from "../../theme";
import styles from "./styles.module.css";
import PianoLikes from "./PianoLikes";
import PianoFrameVase from "../../assets/piano-frame-vase.svg";
import Rock from "../../assets/rock.svg";

export const Section5 = () => {
  return (
    <section
      className={styles.section}
      style={{
        background: theme.gradients.splitBackground(
          theme.colors.primary,
          theme.colors.secondary
        ),
      }}>
      <div className={styles.contentContainer}>
        <img
          src={PianoFrameVase}
          alt='Vase with flowers'
          className={styles.vase}
        />
        <PianoLikes />
        <img src={Rock} alt='Rock' className={styles.rock} />
      </div>
    </section>
  );
};
