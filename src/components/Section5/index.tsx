import { theme } from "../../theme";
import styles from "./styles.module.css";
import PianoLikes from "./PianoLikes";
import PianoFrameVase from "../../assets/piano-frame-vase.svg";
import Rock from "../../assets/rock.svg";
import HangingPot from "../../assets/hanging-pot.svg";
import PlantsStand from "../../assets/plants-stand.svg";
import Flamingo from "../../assets/flamingo.svg";
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
        <img
          src={PlantsStand}
          alt='Plants Stand'
          className={styles.plantsStand}
        />

        <PianoLikes />
        <img src={Rock} alt='Rock' className={styles.rock} />
        <img src={Flamingo} alt='Flamingo' className={styles.flamingo} />
      </div>
      <img src={HangingPot} alt='Hanging Pot' className={styles.hangingPot} />
    </section>
  );
};
