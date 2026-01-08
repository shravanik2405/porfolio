import styles from "./styles.module.css";
import PianoLikes from "./PianoLikes";
import Rock from "../../assets/rock.svg";
import HangingPot from "../../assets/hanging-pot.svg";
import PlantsStand from "../../assets/plants-stand.svg";
import Flamingo from "../../assets/flamingo.svg";

export const Section5 = () => {
  return (
    <section className={styles.section}>
      <div className={styles.contentContainer}>
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
