import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Section1 } from "./Section1"; // Updated import path auto-resolved to index
import { Section2 } from "./Section2"; // Updated import path auto-resolved to index
import { Section } from "./Section"; // Updated import path auto-resolved to index
import { Cloud } from "./Cloud";

export const HorizontalScroll = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<number | undefined>(undefined);

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

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <div ref={targetRef} style={{ height: "400vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          display: "flex",
          height: "100vh",
          overflow: "hidden",
        }}>
        <motion.div style={{ x, display: "flex", position: "relative" }}>
          <Cloud isPaused={isScrolling} />
          <Section1 />
          <Section2 />
          <Section index={3} />
          <Section index={4} />
        </motion.div>
      </div>
    </div>
  );
};
