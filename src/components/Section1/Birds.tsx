import React from "react";
import { theme } from "../../theme";
import styles from "./styles.module.css";

export const Birds = () => {
  return (
    <div className={styles.birdsContainer}>
      <svg
        viewBox='0 0 400 200'
        className={styles.birdsSvg}
        preserveAspectRatio='xMidYMid meet'>
        {/* Wire - curved line */}
        <path
          d='M0,120 Q200,180 400,120'
          fill='none'
          stroke={theme.colors.secondary}
          strokeWidth='2'
        />

        {/* Left Bird - Wings up */}
        <g transform='translate(60, 115) rotate(-10)'>
          {/* Body */}
          <circle cx='20' cy='20' r='18' fill={theme.colors.secondary} />
          {/* Head */}
          <circle cx='35' cy='10' r='10' fill={theme.colors.secondary} />
          {/* Beak */}
          <path d='M42,10 L50,13 L42,16 Z' fill={theme.colors.primary} />
          {/* Eye */}
          <circle cx='38' cy='8' r='1.5' fill={theme.colors.primary} />
          {/* Wing up */}
          <path d='M5,20 Q-10,0 15,-10 Z' fill={theme.colors.secondary} />
          <path d='M10,20 Q0,-5 25,-15 Z' fill={theme.colors.secondary} />
          {/* Tail */}
          <path d='M5,30 L-10,40 L0,30 Z' fill={theme.colors.secondary} />
        </g>

        {/* Right Bird - Sitting */}
        <g transform='translate(180, 140)'>
          {/* Body */}
          <ellipse
            cx='20'
            cy='20'
            rx='20'
            ry='16'
            fill={theme.colors.secondary}
          />
          {/* Head */}
          <circle cx='5' cy='10' r='9' fill={theme.colors.secondary} />
          {/* Beak */}
          <path d='M-2,10 L-10,13 L-2,16 Z' fill={theme.colors.primary} />
          {/* Eye */}
          <circle cx='2' cy='8' r='1.5' fill={theme.colors.primary} />
          {/* Tail */}
          <path d='M35,25 L50,15 L35,30 Z' fill={theme.colors.secondary} />
        </g>
      </svg>
    </div>
  );
};
