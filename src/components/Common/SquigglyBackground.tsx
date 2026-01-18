import React from "react";

interface SquigglyBackgroundProps {
  topColor: string;
  bottomColor: string;
}

export const SquigglyBackground: React.FC<SquigglyBackgroundProps> = ({
  topColor,
  bottomColor,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: topColor,
        zIndex: 0,
        overflow: "hidden",
      }}>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "40%",
          backgroundColor: bottomColor,
        }}>
        <svg
          viewBox='0 0 1440 54'
          preserveAspectRatio='none'
          style={{
            position: "absolute",
            bottom: "99%",
            left: 0,
            width: "100%",
            height: "3vw", // Responsive height
            minHeight: "30px",
            display: "block",
          }}>
          <path
            d='M0 54V35C143 35 227 20 357 20C487 20 574 35 726 35C879 35 952 20 1083 20C1213 20 1289 35 1440 35V54H0Z'
            fill={bottomColor}
          />
        </svg>
      </div>
    </div>
  );
};
