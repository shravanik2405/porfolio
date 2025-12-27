import { theme } from "../../theme";
import styles from "./styles.module.css";
import StickyNotes from "./StickyNotes";

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
      <StickyNotes />
    </section>
  );
};
