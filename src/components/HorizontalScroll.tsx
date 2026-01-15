import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Section1 } from "./Section1";
import { Section2 } from "./Section2";
import { Section3 } from "./Section3";
import { Section4 } from "./Section4";
import { Section5 } from "./Section5";
import { Cloud } from "./Cloud";
import { theme } from "../theme";
import { SquigglyBackground } from "./Common/SquigglyBackground";

export const HorizontalScroll = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<number | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(false);

  const [isSmallDevice, setIsSmallDevice] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
      setIsSmallDevice(window.matchMedia("(max-width: 425px)").matches);
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
    // Desktop: 5 * 100vw = 500vw total. Viewport 100vw. Move -400vw (-80%)
    // Mobile: 5 * 150vw = 750vw total. Viewport 100vw. Move -650vw (-86.66%)
    ["0%", isMobile ? `-${(650 / 750) * 100}%` : "-80%"]
  );

  return (
    <div ref={targetRef} style={{ height: "500vh", position: "relative" }}>
      {/* Ghost Snap Targets */}
      {[0, 1, 2, 3, 4].map((index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: `${index * 100}vh`,
            left: 0,
            width: "100%",
            height: "100vh",
            scrollSnapAlign: isSmallDevice ? "none" : "start",
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
        {/* Fixed background to eliminate vertical gaps between sections */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <SquigglyBackground
            topColor={theme.colors.primary}
            bottomColor={theme.colors.secondary}
          />
        </div>

        <motion.div
          style={{
            x,
            display: "flex",
            position: "relative",
            zIndex: 1,
          }}>
          <Cloud isPaused={isScrolling} />
          <Section1 />
          <Section3 />
          <Section2 />
          <Section5 />
          <Section4 />
        </motion.div>
      </div>
    </div>
  );
};
