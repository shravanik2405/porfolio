import { useEffect, useRef } from "react";

// Color palette
const DARK = "#ffc785";
const ACCENT = "#292926";

interface PlayPauseProps {
  playing: boolean;
  onClick: () => void;
}

export default function PlayPause({ playing, onClick }: PlayPauseProps) {
  const bar1 = useRef<HTMLSpanElement | null>(null);
  const bar2 = useRef<HTMLSpanElement | null>(null);
  const triangle = useRef<HTMLDivElement | null>(null);
  const animations = useRef<Animation[]>([]);

  useEffect(() => {
    // Stop previous animations
    animations.current.forEach((a) => a.cancel());
    animations.current = [];

    // ▶️ PLAYING → animate PAUSE bars
    if (playing && bar1.current && bar2.current) {
      animations.current.push(
        bar1.current.animate(
          [
            { transform: "scaleY(1)" },
            { transform: "scaleY(1.6)" },
            { transform: "scaleY(1)" },
          ],
          { duration: 600, iterations: Infinity, easing: "ease-in-out" }
        )
      );

      animations.current.push(
        bar2.current.animate(
          [
            { transform: "scaleY(1.4)" },
            { transform: "scaleY(0.8)" },
            { transform: "scaleY(1.4)" },
          ],
          { duration: 600, iterations: Infinity, easing: "ease-in-out" }
        )
      );
    }

    // ⏸ PAUSED → animate PLAY triangle
    if (!playing && triangle.current) {
      animations.current.push(
        triangle.current.animate(
          [
            { transform: "scale(1) translateX(0)", opacity: 1 },
            { transform: "scale(1.1) translateX(1px)", opacity: 0.9 },
            { transform: "scale(1) translateX(0)", opacity: 1 },
          ],
          {
            duration: 2200,
            iterations: Infinity,
            easing: "ease-in-out",
          }
        )
      );
    }

    return () => {
      animations.current.forEach((a) => a.cancel());
      animations.current = [];
    };
  }, [playing]);

  return (
    <div className='anime-wrap'>
      <button
        aria-label={playing ? "Pause" : "Play"}
        className='player'
        onClick={onClick}>
        {playing ? (
          <div className='bars'>
            <span ref={bar1} />
            <span ref={bar2} />
          </div>
        ) : (
          <div className='triangle' ref={triangle} />
        )}
      </button>

      <style>{`
        .anime-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .player {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid ${ACCENT};
          background: ${DARK};
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: transform 0.25s ease;
          padding: 0;
        }

        .player:hover {
          transform: scale(1.08);
        }

        .triangle {
          width: 0;
          height: 0;
          border-left: 14px solid ${ACCENT};
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          margin-left: 4px;
        }

        .bars {
          display: flex;
          gap: 5px;
        }

        .bars span {
          width: 5px;
          height: 18px;
          background: ${ACCENT};
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}
