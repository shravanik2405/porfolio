import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./StickyNotes.module.css";
import ChaiCup from "../../assets/chai-cup.svg";
import MusicSvg from "../../assets/music.svg";
import BookSvg from "../../assets/book.svg";
import { useWindowSize } from "../../hooks/useWindowSize";

const notes = [
  {
    id: 1,
    title: "",
    icon: MusicSvg,
    text: "Lumineers for the road, hozier for the night and sufjan for Mondays",
    color: "#FF5F6D",
    rotate: -6,
  },
  {
    id: 2,
    title: "Other Humans?",
    icon: "",
    text: "Sometimes, in small doses, preferably with snacks and an exit plan.",
    color: "#FFC371",
    rotate: 5,
  },
  {
    id: 3,
    title: "",
    icon: BookSvg,
    text: "Preferrably fiction, I like stories that ruin me politely — The God of Small Things does it best",
    color: "#6EE7B7",
    rotate: -3,
  },
  {
    id: 4,
    title: "",
    icon: ChaiCup,
    text: "Chai for emotional hydration",
    color: "#60A5FA",
    rotate: 7,
  },
  {
    id: 4,
    title: "",
    icon: ChaiCup,
    text: "Chai for emotional hydration",
    color: "#60A5FA",
    rotate: 7,
  },
  //   {
  //     id: 4,
  //     title: "",
  //     icon: ChaiCup,
  //     text: "Chai for emotional hydration",
  //     color: "#60A5FA",
  //     rotate: 7,
  //   },
  {
    id: 5,
    title: "UX",
    icon: "🧠",
    text: "Clean UX always wins",
    color: "#C084FC",
    rotate: -4,
  },
];

// ... (existing code) ...

// -------------------- SCATTER LAYOUTS --------------------
const scatterLayouts: ((
  i: number,
  n: number,
  p: number
) => { x: number; y: number })[] = [
  (i, n, r) => {
    const a = (i / n) * Math.PI * 2;
    return { x: Math.cos(a) * r, y: Math.sin(a) * r };
  },
  (i, _n, gap) => ({
    x: (i - 2) * gap,
    y: i % 2 === 0 ? -gap * 0.6 : gap * 0.6,
  }),
  (i, _n, gap) => {
    const a = i * 1.4;
    const r = gap * (i + 1) * 0.4;
    return { x: Math.cos(a) * r, y: Math.sin(a) * r };
  },
  (i, _n, gap) => ({
    x: ((i % 3) - 1) * gap,
    y: (Math.floor(i / 3) - 1) * gap,
  }),
];

// -------------------- COMPONENT --------------------
export default function StickyNotes() {
  const { width, height } = useWindowSize();
  const isMobile = width < 768;

  // Ensure client-side calculation to prevent hydration mismatch (0 init)
  // But for now, we'll just guard or use the values.

  const containerSize = Math.min(width || 800, height || 600, 560);
  const noteSize = isMobile ? containerSize * 0.42 : 176;
  const gap = noteSize * 1.15;

  const [scatter, setScatter] = useState(false);
  const [layoutIndex, setLayoutIndex] = useState(0);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.notesContainer}
        style={{ width: containerSize, height: containerSize }}
        onMouseEnter={
          !isMobile
            ? () => {
                setLayoutIndex((i) => (i + 1) % scatterLayouts.length);
                setScatter(true);
              }
            : undefined
        }
        onMouseLeave={!isMobile ? () => setScatter(false) : undefined}
        onClick={isMobile ? () => setScatter((s) => !s) : undefined}>
        {notes.map((note, index) => {
          let x, y;

          if (isMobile) {
            // 2x2 Grid logic for mobile
            const col = index % 2;
            const row = Math.floor(index / 2);

            // Center offsets and handle 5th item
            if (index === 4) {
              x = 0;
            } else {
              x = (col === 0 ? -0.5 : 0.5) * (noteSize * 1.1);
            }
            // Rows centered around middle
            y = (row - 1) * (noteSize * 1.1);
          } else {
            const layout = scatterLayouts[layoutIndex](
              index,
              notes.length,
              gap
            );
            x = layout.x;
            y = layout.y;
          }

          // Stack in the center initially, but looser
          const center = containerSize / 2 - noteSize / 2;
          const baseTop = center + (index - 2) * 30; // Increased spread
          const baseLeft = center + (index - 2) * 15;

          return (
            <motion.div
              key={note.id}
              initial={{
                opacity: 0,
                scale: 0.6,
                y: 120,
                rotate: note.rotate * 2,
              }}
              animate={{
                opacity: 1,
                scale: scatter ? 1.05 : 1,
                x: scatter ? x : 0,
                y: scatter ? y : 0,
                rotate: scatter ? note.rotate * 0.5 : note.rotate,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
              drag
              dragElastic={0.4}
              dragMomentum={false}
              className={styles.note}
              style={{
                width: noteSize,
                height: noteSize,
                top: baseTop,
                left: baseLeft,
                borderRadius: 12,
                backgroundColor: note.color,
              }}>
              {/* Limbs */}
              {/* Left Arm */}
              <motion.div
                className={styles.limb}
                style={{
                  height: 40,
                  top: "40%", // Moved down slightly
                  left: 4, // Brought closer (was -2)
                  originY: 0,
                }}
                animate={
                  scatter
                    ? { rotate: 50, x: -15, y: -5 } // Open
                    : { rotate: 140, x: 10, y: 0 } // Wrapped/Hugged
                }
              />
              {/* Right Arm */}
              <motion.div
                className={styles.limb}
                style={{
                  height: 40,
                  top: "40%", // Moved down slightly
                  right: 4, // Brought closer (was -2)
                  originY: 0,
                }}
                animate={
                  scatter
                    ? { rotate: -50, x: 15, y: -5 } // Open
                    : { rotate: -140, x: -10, y: 0 } // Wrapped/Hugged
                }
              />
              {/* Left Leg */}
              <motion.div
                className={`${styles.limb} ${styles.leg} ${styles.legLeft}`}
                style={{
                  height: 35,
                  bottom: -15,
                  left: "30%", // Squeeze in
                  originY: 0,
                }}
                animate={
                  scatter
                    ? { rotate: 15, x: -5 } // Dangling
                    : { rotate: 80, x: 10, y: -10 } // Tucked
                }
              />
              {/* Right Leg */}
              <motion.div
                className={`${styles.limb} ${styles.leg} ${styles.legRight}`}
                style={{
                  height: 35,
                  bottom: -15,
                  right: "30%", // Squeeze in
                  originY: 0,
                }}
                animate={
                  scatter
                    ? { rotate: -15, x: 5 } // Dangling
                    : { rotate: -80, x: -10, y: -10 } // Tucked
                }
              />

              {/* Tape */}
              <div className={styles.tape} />

              {/* Floating wrapper (note floats, text does not) */}
              <motion.div
                className={styles.noteFloatWrapper}
                animate={scatter ? { y: [0, -12, 0] } : { y: 0 }}
                transition={{
                  duration: 3 + index * 0.6,
                  repeat: scatter ? Infinity : 0,
                  ease: "easeInOut",
                }}
              />

              {/* Content */}
              <div className={styles.noteContent}>
                <div className={styles.noteTitle}>
                  {note.icon &&
                  (note.icon.startsWith("/") ||
                    note.icon.startsWith("http")) ? (
                    <img src={note.icon} alt='' className={styles.iconImage} />
                  ) : (
                    <span style={{ marginRight: "6px" }}>{note.icon}</span>
                  )}
                  {note.title}
                </div>
                <div className={styles.noteText}>{note.text}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
