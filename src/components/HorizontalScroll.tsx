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
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [isExtraSmall, setIsExtraSmall] = useState(false);
  const [isMobileS, setIsMobileS] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsSmallDevice(window.matchMedia("(max-width: 768px)").matches);
      setIsExtraSmall(window.matchMedia("(max-width: 425px)").matches);
      setIsMobileS(window.matchMedia("(max-width: 375px)").matches);
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
    stiffness: 50,
    damping: 35,
    restDelta: 0.0001,
    mass: 0.5,
  });

  const x = useTransform(
    smoothProgress,
    [0, 1],
    // Desktop: 5 * 100vw = 500vw. Move -400vw (-80%)
    // Tablet (768px): 110+100+100+150+100 = 560vw. Move -460vw (-82.14%)
    // Mobile (425px): 160+150+175+280+100 = 865vw. Move -765vw (-88.44%)
    [
      "0%",
      isMobileS
        ? `-${(815 / 915) * 100}%`
        : isExtraSmall
        ? `-${(765 / 865) * 100}%`
        : isSmallDevice
        ? `-${(460 / 560) * 100}%`
        : "-80%",
    ]
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
          willChange: "scroll-position",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}>
        {/* Fixed background to eliminate vertical gaps between sections */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <SquigglyBackground
            topColor={theme.colors.primary}
            bottomColor={theme.colors.secondary}
          />
        </div>

        {/* Clouds - fixed position, behind sections */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
          <Cloud isPaused={isScrolling} />
        </div>

        <motion.div
          style={{
            x,
            display: "flex",
            position: "relative",
            zIndex: 2,
            willChange: "transform",
          }}>
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
