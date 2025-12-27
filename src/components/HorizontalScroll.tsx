import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Section1 } from "./Section1";
import { Section2 } from "./Section2";
import { Section3 } from "./Section3";
import { Section4 } from "./Section4";
import { Cloud } from "./Cloud";
import { theme } from "../theme";

export const HorizontalScroll = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<number | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const x = useTransform(
    smoothProgress,
    [0, 1],
    // Desktop: 4 * 100vw = 400vw total. Viewport 100vw. Move -300vw (-75%)
    // Mobile: 4 * 150vw = 600vw total. Viewport 100vw. Move -500vw (-83.33%)
    ["0%", isMobile ? `-${(500 / 600) * 100}%` : "-75%"]
  );

  return (
    <div ref={targetRef} style={{ height: "400vh", position: "relative" }}>
      {/* Ghost Snap Targets */}
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: `${index * 100}vh`,
            left: 0,
            width: "100%",
            height: "100vh",
            scrollSnapAlign: "start",
            pointerEvents: "none",
          }}
        />
      ))}

      <div
        style={{
          position: "sticky",
          top: 0,
          display: "flex",
          height: "100vh",
          overflow: "hidden",
        }}>
        <motion.div
          style={{
            x,
            display: "flex",
            position: "relative",
            // Apply the same gradient background to the container to mask any sub-pixel gaps between sections
            background: theme.gradients.splitBackground(
              theme.colors.primary,
              theme.colors.secondary
            ),
          }}>
          <Cloud isPaused={isScrolling} />
          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
        </motion.div>
      </div>
    </div>
  );
};
