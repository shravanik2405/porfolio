import { theme } from "../../theme";
import styles from "./styles.module.css";
import PianoLikes from "./PianoLikes";
import PianoFrameVase from "../../assets/piano-frame-vase.svg";
import Rock from "../../assets/rock.svg";
import { SquigglyBackground } from "../Common/SquigglyBackground";

export const Section5 = () => {
  return (
    <section className={styles.section}>
      <SquigglyBackground
        topColor={theme.colors.primary}
        bottomColor={theme.colors.secondary}
      />
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
