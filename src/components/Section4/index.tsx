import styles from "./styles.module.css";
import AvocadoTree from "./AvocadoTree";
import SteamingChai from "./SteamingChai";
import { GrassStrip } from "./GrassStrip";

export const Section4 = () => {
  return (
    <section className={styles.section}>
      <div className={styles.treeContainer}>
        <AvocadoTree />
      </div>
      <div className={styles.textContainer}>
        <p>Say hi. I’ll bring the chai — you bring the idea </p>
        <div className={styles.contactWrapper}>
          <span>shravani.khatri@gmail.com</span>
          <SteamingChai />
        </div>
      </div>

      <div className={styles.grassContainer}>
        <GrassStrip
          color='#292926'
          width={2500}
          bladeCount={1000}
          height={105}
          variability={0.8}
          wind={0.05}
          flowerDensity={0.15}
          beeCount={3}
        />
      </div>
    </section>
  );
};
