import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "./PianoLikes.css";
import PlayPause from "./play-pause";
import { useAudioEngine } from "../../hooks/useAudioEngine";

type PianoKey = {
  id: string;
  label: string;
  keyboard: string; // physical keyboard key
  midi: number; // for frequency
  isBlack?: boolean;
};

type FlyingNote = {
  id: string;
  text: string;
  createdAt: number;
  x: number;
  rot: number;
  keyId: string;
};

const DEFAULT_KEYS: PianoKey[] = [
  { id: "C4", label: "C", keyboard: "a", midi: 60 },
  { id: "Db4", label: "C#", keyboard: "w", midi: 61, isBlack: true },
  { id: "D4", label: "D", keyboard: "s", midi: 62 },
  { id: "Eb4", label: "D#", keyboard: "e", midi: 63, isBlack: true },
  { id: "E4", label: "E", keyboard: "d", midi: 64 },
  { id: "F4", label: "F", keyboard: "f", midi: 65 },
  { id: "Gb4", label: "F#", keyboard: "t", midi: 66, isBlack: true },
  { id: "G4", label: "G", keyboard: "g", midi: 67 },
  { id: "Ab4", label: "G#", keyboard: "y", midi: 68, isBlack: true },
  { id: "A4", label: "A", keyboard: "h", midi: 69 },
  { id: "Bb4", label: "A#", keyboard: "u", midi: 70, isBlack: true },
  { id: "B4", label: "B", keyboard: "j", midi: 71 },
  { id: "C5", label: "C", keyboard: "k", midi: 72 },
];

export default function PianoLikes({
  likes = [
    "Books (fiction keeps me sane)",
    "Chai for emotional hydration",
    "Flowers, always",
    "Kafka (for the vibes)",
    "Arundhati Roy",
    "Rainy weather",
    "Museums & quiet art corners",
    "Ghibli scenes",
    "The Lumineers for road trips",
    "Sufjan for… feelings",
  ],
  defaultPlaying = false,
  className,
}: {
  likes?: string[];
  defaultPlaying?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const { ensure, pluck, ctxRef } = useAudioEngine();

  const [playing, setPlaying] = useState(defaultPlaying);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [notes, setNotes] = useState<FlyingNote[]>([]);

  const [likeList, setLikeList] = useState<string[]>(likes);
  // Use ref for index to avoid React Strict Mode double-invocation issues with state updaters
  const nextIdxRef = useRef(0);

  // Refs so autoplay/handlers always read the latest list/index (avoids stale closures)
  const likeListRef = useRef<string[]>(likes);
  const playingKeysRef = useRef<Set<string>>(new Set()); // Track keys currently playing to prevent duplicates

  // Keep internal list in sync if prop changes
  useEffect(() => {
    setLikeList(likes);
    likeListRef.current = likes;
    nextIdxRef.current = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes?.join(" ")]);

  // Keep ref in sync when user edits the list locally
  useEffect(() => {
    likeListRef.current = likeList;
  }, [likeList]);

  const whiteKeys = useMemo(() => DEFAULT_KEYS.filter((k) => !k.isBlack), []);
  const blackKeys = useMemo(() => DEFAULT_KEYS.filter((k) => k.isBlack), []);

  const spawnNote = (key: PianoKey) => {
    const list = likeListRef.current;
    const i = nextIdxRef.current;
    const text = list.length ? list[i % list.length] : "Add things you like →";

    // Increment for next time
    nextIdxRef.current = i + 1;

    const x = (Math.random() - 0.5) * 220; // spread
    const rot = (Math.random() - 0.5) * 22;

    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const note: FlyingNote = {
      id,
      text,
      createdAt: Date.now(),
      x,
      rot,
      keyId: key.id,
    };

    setNotes((prev) => [...prev, note]);

    // cleanup after animation
    const ttl = reduceMotion ? 800 : 1600;
    window.setTimeout(() => {
      setNotes((prev) => prev.filter((n) => n.id !== id));
    }, ttl + 120);
  };

  // Track last play time for each key to debounce
  const lastPlayTimeRef = useRef<Map<string, number>>(new Map());

  const playKey = async (key: PianoKey) => {
    const now = Date.now();
    const lastPlayTime = lastPlayTimeRef.current.get(key.id) || 0;

    // Debounce: ignore if same key was played within 200ms
    if (now - lastPlayTime < 200) {
      return;
    }

    // Prevent duplicate triggers for the same key
    if (playingKeysRef.current.has(key.id)) {
      return;
    }

    lastPlayTimeRef.current.set(key.id, now);
    playingKeysRef.current.add(key.id);
    await ensure();
    setActiveKey(key.id);
    spawnNote(key);
    const midiToHz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);
    pluck(midiToHz(key.midi), 0.9, 0.28);

    window.setTimeout(() => {
      setActiveKey((k) => (k === key.id ? null : k));
      playingKeysRef.current.delete(key.id);
    }, 140);
  };

  // Keyboard support
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      // Ignore repeated keydown events when key is held
      if (e.repeat) return;

      const target = e.target as HTMLElement | null;
      const isTyping =
        !!target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          (target as any).isContentEditable);
      if (isTyping) return;

      const keyChar = e.key.toLowerCase();
      const match = DEFAULT_KEYS.find((k) => k.keyboard === keyChar);
      if (!match) return;
      e.preventDefault();
      playKey(match);
    };

    window.addEventListener("keydown", onDown);
    return () => window.removeEventListener("keydown", onDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  // Background autoplay
  useEffect(() => {
    if (!playing) return;
    let stopped = false;
    let t: number | undefined;

    const seq: string[] = [
      "C4",
      "E4",
      "G4",
      "C5",
      "B4",
      "G4",
      "E4",
      "D4",
      "F4",
      "A4",
      "C5",
      "G4",
    ];

    (async () => {
      const ctx = await ensure();
      if (!ctx) return;
      if (ctx.state === "suspended") {
        try {
          await ctx.resume();
        } catch {
          // ignore
        }
      }

      let i = 0;
      const tick = async () => {
        if (stopped) return;
        const id = seq[i % seq.length];
        const key =
          DEFAULT_KEYS.find((k) => k.id === id) ??
          DEFAULT_KEYS[i % DEFAULT_KEYS.length];
        await playKey(key);
        i += 1;
        t = window.setTimeout(tick, 260);
      };

      t = window.setTimeout(tick, 240);
    })();

    return () => {
      stopped = true;
      if (t) window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  return (
    <div className={`pl-wrap ${className ?? ""}`}>
      {/* Flying notes layer - positioned relative toWrapper */}
      <div className='pl-notes-layer' aria-hidden>
        <AnimatePresence>
          {notes.map((n) => (
            <motion.div
              key={n.id}
              initial={{
                opacity: 0,
                y: 40,
                x: n.x,
                rotate: n.rot,
                scale: 0.92,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: reduceMotion ? -10 : -400,
                x: n.x + (reduceMotion ? 0 : (Math.random() - 0.5) * 60),
                rotate: n.rot + (reduceMotion ? 0 : (Math.random() - 0.5) * 18),
                scale: [0.92, 1, 1],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0.8 : 1.6,
                ease: "easeOut",
                times: reduceMotion ? [0, 0.25, 0.8, 1] : [0, 0.12, 0.78, 1],
              }}
              className='pl-note-float'>
              <div className='pl-note-card'>
                <div className='pl-note-row'>
                  <span className='pl-note-badge'>♪</span>
                  <span className='pl-note-text'>{n.text}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className='pl-pianoCard'>
        <div className='pl-pianoShell'>
          <div className='pl-pianoTop'>
            <div className='pl-hint'>Tap/click keys too</div>
            <PlayPause
              playing={playing}
              onClick={async () => {
                await ensure();
                try {
                  await ctxRef.current?.resume();
                } catch {
                  // ignore
                }
                setPlaying((p) => !p);
              }}
            />
          </div>

          <div className='pl-keys'>
            <div className='pl-whiteRow'>
              {whiteKeys.map((k) => (
                <button
                  key={k.id}
                  onMouseDown={() => playKey(k)}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    playKey(k);
                  }}
                  className={`pl-whiteKey ${
                    activeKey === k.id ? "isActive" : ""
                  }`}
                  aria-label={`Key ${k.label} (${k.keyboard.toUpperCase()})`}>
                  <div className='pl-whiteKeyKb'>
                    {k.keyboard.toUpperCase()}
                  </div>
                  <div className='pl-whiteKeyLabel'>{k.label}</div>
                </button>
              ))}
            </div>

            <div className='pl-blackLayer' aria-hidden>
              <div className='pl-blackInner'>
                {blackKeys.map((k) => {
                  const idx = DEFAULT_KEYS.findIndex((x) => x.id === k.id);
                  const whitesBefore = DEFAULT_KEYS.slice(0, idx).filter(
                    (x) => !x.isBlack
                  ).length;
                  const leftPct = (whitesBefore / whiteKeys.length) * 100;

                  return (
                    <div
                      key={k.id}
                      className='pl-blackSlot'
                      style={{
                        left: `${leftPct}%`,
                        transform: "translateX(-50%)",
                      }}>
                      <button
                        onMouseDown={(e) => {
                          e.preventDefault();
                          playKey(k);
                        }}
                        onTouchStart={(e) => {
                          e.preventDefault();
                          playKey(k);
                        }}
                        className={`pl-blackKey ${
                          activeKey === k.id ? "isActive" : ""
                        }`}
                        aria-label={`Black key ${
                          k.label
                        } (${k.keyboard.toUpperCase()})`}>
                        <div className='pl-blackKeyKb'>
                          {k.keyboard.toUpperCase()}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='pl-footer-text'>
            Each key reveals something I am in love with.
          </div>
        </div>
      </div>
    </div>
  );
}
