import { theme } from "../../theme";
import styles from "./styles.module.css";
import PianoLikes from "./PianoLikes";

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
      <PianoLikes />
    </section>
  );
};
