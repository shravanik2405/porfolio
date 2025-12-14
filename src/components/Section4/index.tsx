import React from "react";
import { theme } from "../../theme";
import styles from "./styles.module.css";
import AvocadoTree from "./AvocadoTree";

export const Section4 = () => {
  return (
    <section
      className={styles.section}
      style={{
        background: theme.gradients.splitBackground(
          theme.colors.primary,
          theme.colors.secondary
        ),
      }}>
      <div className={styles.treeContainer}>
        <AvocadoTree />
      </div>
    </section>
  );
};
