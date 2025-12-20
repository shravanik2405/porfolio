import { theme } from "../../theme";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

import switch1 from "../../assets/switch1.svg";
import switch2 from "../../assets/switch2.svg";
import switch3 from "../../assets/switch3.svg";
import wall from "../../assets/wall.svg";
import wallDark from "../../assets/wall-dark.svg";

export const Section3 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSwitched, setIsSwitched] = useState(false);
  const switchImages = [switch1, switch2, switch3];

  const handleAnimation = () => {
    const targetIndex = isSwitched ? 0 : switchImages.length - 1;
    let currentFrame = currentImageIndex;

    const intervalId = setInterval(() => {
      if (isSwitched) {
        currentFrame--;
      } else {
        currentFrame++;
      }

      setCurrentImageIndex(currentFrame);

      if (currentFrame === targetIndex) {
        clearInterval(intervalId);
        setIsSwitched(!isSwitched);
      }
    }, 200);
  };

  useEffect(() => {
    // Preload images
    switchImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <section
      className={styles.section}
      style={{
        background:isSwitched ? theme.gradients.splitBackground(
          theme.colors.primary,
          theme.colors.secondary,
        ) : theme.gradients.splitBackground(
          theme.colors.shadow,
          theme.colors.secondary,
        ) 
      }}
    >
      <div className={styles.switchContainer}>
        <img
          src={switchImages[currentImageIndex]}
          alt="Switch Animation"
          className={styles.frameImage}
          onClick={handleAnimation}
        />
      </div>
      <div
        className={styles.testContainer}
       
      >
        <div className={styles.wallContainer}>
          {isSwitched ? (
            <img
              src={wall}
              alt="Wall Decoration"
              className={styles.wallImage}
            />
          ) : (
            <img
              src={wallDark}
              alt="Wall Decoration"
              className={styles.wallImage}
            />
          )}
        </div>
      </div>

      <div className={styles.lampContainer}>
        <div
          className={styles.glow}
          style={{ opacity: isSwitched ? 0.6 : 0 }}
        ></div>
        <svg className={styles.lampSvg} viewBox="0 0 256 256">
          <g transform="translate(1.4 1.4) scale(2.81)">
            <path
              id="lamp-bulb"
              d="M 33.424 60.57 C 34.197 66.28 39.078 70.685 45 70.685 S 55.803 66.28 56.576 60.57 C 48.859 58.699 41.141 58.699 33.424 60.57 z"
              style={{
                fill: isSwitched ? "#ffff" : "#444",
                transition: "fill 0.3s",
              }}
            />

            <path
              d="M 46 15.485 V 1 c 0 -0.552 -0.448 -1 -1 -1 s -1 0.448 -1 1 v 14.485 h -6.586 v 9.039 c 2.427 -0.614 4.968 -0.943 7.586 -0.943 s 5.159 0.329 7.586 0.943 v -9.039 H 46 z"
              style={{ fill: "#596C76" }}
            />
            <path
              d="M 75.849 60.57 H 14.151 v -8.14 c 0 -17.037 13.811 -30.849 30.849 -30.849 h 0 c 17.037 0 30.849 13.811 30.849 30.849 V 60.57 z"
              style={{ fill: "#8C9FAC" }}
            />
          </g>
        </svg>
      </div>
    </section>
  );
};
