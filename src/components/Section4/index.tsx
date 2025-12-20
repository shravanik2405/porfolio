import { theme } from "../../theme";
import styles from "./styles.module.css";
import AvocadoTree from "./AvocadoTree";
import { GrassStrip } from "./GrassStrip";

export const Section4 = () => {
  return (
    <section
      className={styles.section}
      style={{
        background: theme.gradients.splitBackground(
          theme.colors.primary,
          theme.colors.secondary,
        ),
      }}
    >
      <div className={styles.treeContainer}>
        <AvocadoTree />
      </div>
      <div className={styles.grassContainer}>
        <GrassStrip
          color="#292926"
          width={800}
          bladeCount={320}
          height={80}
          variability={0.8}
          wind={0.05}
          flowerDensity={0.15}
          beeCount={3}
        />
      </div>
    </section>
  );
};
