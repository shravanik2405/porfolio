import React from "react";
import { theme } from "../../theme";
import styles from "./styles.module.css";

interface SectionProps {
  index: number;
}

export const Section: React.FC<SectionProps> = ({ index }) => {
  return (
    <section
      className={styles.section}
      style={{
        background: theme.gradients.splitBackground(
          theme.colors.primary,
          theme.colors.secondary,
        ),
        color: theme.colors.textLight,
      }}
    >
      <h1>Section {index}</h1>
    </section>
  );
};
