import React, {
  useMemo,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

/**
 * AvocadoTree Component
 * * Features:
 * - Responsive: Scales to container width.
 * - Background: Transparent (Tree only).
 * - Controls: Removed (Default gentle wind).
 * - Species: Avocado (Smooth bark, lanceolate leaves).
 * - Color: #292926 for bark and foliage.
 * - Animation: Leaves sway, flowers fall on load.
 */

interface Branch {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  key: string;
}

interface Leaf {
  x: number;
  y: number;
  angle: number;
  scale: number;
  delay: number;
  key: string;
}

interface StaticFlower {
  x: number;
  y: number;
  angle: number;
  scale: number;
  key: string;
}

interface TreeData {
  branches: Branch[];
  leaves: Leaf[];
  staticFlowers: StaticFlower[];
}

interface FallingFlower {
  id: number;
  x: number;
  y: number;
  speed: number;
  startDelay: number;
}

const AvocadoTree = () => {
  // Fixed wind intensity since slider is removed
  const windIntensity = 1.2;
  const [fallingFlowers, setFallingFlowers] = useState<FallingFlower[]>([]);

  // Refs for animation loop
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  // Configuration
  const PRIMARY_COLOR = "#292926";
  const FLOWER_ORANGE = "#ff693d";
  const MAX_FALLING_FLOWERS = 25;

  // Generate the tree structure once on mount
  const treeData = useMemo<TreeData>(() => {
    const branches: Branch[] = [];
    const leaves: Leaf[] = [];
    const staticFlowers: StaticFlower[] = [];

    // Recursive function to generate branches
    const grow = (
      x: number,
      y: number,
      length: number,
      angle: number,
      depth: number,
      width: number,
    ) => {
      const endX = x + length * Math.cos(angle);
      const endY = y + length * Math.sin(angle);

      branches.push({
        x1: x,
        y1: y,
        x2: endX,
        y2: endY,
        width: width,
        key: `b-${x}-${y}-${depth}-${angle.toFixed(2)}`,
      });

      // LEAF & FLOWER LOGIC
      if (depth === 0 || (depth === 1 && Math.random() < 0.2)) {
        const leafCount = Math.floor(Math.random() * 3) + 1;

        // Static flowers on the tree
        const hasFlower = Math.random() < 0.35;

        if (hasFlower) {
          staticFlowers.push({
            x: endX,
            y: endY,
            angle: angle + Math.PI / 2,
            scale: 0.9,
            key: `f-${endX}-${endY}`,
          });
        }

        for (let i = 0; i < leafCount; i++) {
          leaves.push({
            x: endX,
            y: endY,
            angle: angle + (Math.random() * 2.0 - 1.0),
            scale: 1.0 + Math.random() * 0.5,
            delay: Math.random() * 4,
            key: `l-${endX}-${endY}-${i}`,
          });
        }
      }

      if (depth === 0) return;

      // BRANCHING LOGIC
      const branchCount = 2;
      for (let i = 0; i < branchCount; i++) {
        const spread = 1.4;
        const dir = i === 0 ? 1 : -1;
        const newAngle = angle + dir * spread * (0.3 + Math.random() * 0.2);
        const newLength = length * (0.7 + Math.random() * 0.1);
        const newWidth = width * 0.65;

        grow(endX, endY, newLength, newAngle, depth - 1, newWidth);
      }
    };

    // Initial call: Standard Avocado Tree Params
    // Centered horizontally (400), bottom of viewBox (800)
    grow(400, 800, 90, -Math.PI / 2, 6, 45);

    return { branches, leaves, staticFlowers };
  }, []);

  // Function to spawn a CLUSTER of flowers
  const spawnFlowerCluster = useCallback(() => {
    if (treeData.leaves.length === 0) return;

    setFallingFlowers((prevFlowers) => {
      if (prevFlowers.length >= MAX_FALLING_FLOWERS) return prevFlowers;

      const clusterSize = 4 + Math.floor(Math.random() * 2); // 4 or 5 flowers
      const newFlowers: FallingFlower[] = [];

      for (let i = 0; i < clusterSize; i++) {
        const randomLeafIndex = Math.floor(
          Math.random() * treeData.leaves.length,
        );
        const spawnPoint = treeData.leaves[randomLeafIndex];

        newFlowers.push({
          id: Date.now() + Math.random() + i, // Unique ID
          x: spawnPoint.x,
          y: spawnPoint.y,
          speed: 0.8 + Math.random() * 0.6, // Slight speed variance
          startDelay: i * 100,
        });
      }

      return [...prevFlowers, ...newFlowers];
    });
  }, [treeData.leaves]);

  // Initial Burst & Interval
  useEffect(() => {
    // 1. Immediate Spawns
    if (treeData.leaves.length > 0) {
      spawnFlowerCluster();
    }

    // 2. Regular Interval
    const spawnInterval = setInterval(() => {
      if (Math.random() < 0.5) {
        spawnFlowerCluster();
      }
    }, 2000);

    return () => clearInterval(spawnInterval);
  }, [spawnFlowerCluster, treeData.leaves.length]);

  // Animation loop for falling flowers
  const animateFlowers = useCallback((time: number) => {
    if (lastTimeRef.current !== undefined) {
      setFallingFlowers((prevFlowers) => {
        return prevFlowers
          .map((flower) => {
            // Strictly vertical motion (Gravity only)
            const newY = flower.y + flower.speed;
            return { ...flower, y: newY };
          })
          .filter((flower) => flower.y < 850); // Fall slightly past bottom
      });
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animateFlowers);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateFlowers);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animateFlowers]);

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 800 800"
        style={{ width: "100%", maxWidth: "56rem", height: "auto" }}
        preserveAspectRatio="xMidYMax meet"
      >
        <defs>
          <path
            id="avocado-leaf"
            d="M0,0 C10,-15 40,-5 50,0 C40,5 10,15 0,0 Z"
          />

          {/* Detailed 5-Petal Flower Group */}
          <g id="tiny-flower">
            {/* Stem */}
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-12"
              stroke={FLOWER_ORANGE}
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Flower Head Group */}
            <g transform="translate(0, -12)">
              {/* 5 White Petals */}
              <ellipse
                cx="0"
                cy="-5"
                rx="2.5"
                ry="5"
                fill="white"
                transform="rotate(0)"
              />
              <ellipse
                cx="0"
                cy="-5"
                rx="2.5"
                ry="5"
                fill="white"
                transform="rotate(72)"
              />
              <ellipse
                cx="0"
                cy="-5"
                rx="2.5"
                ry="5"
                fill="white"
                transform="rotate(144)"
              />
              <ellipse
                cx="0"
                cy="-5"
                rx="2.5"
                ry="5"
                fill="white"
                transform="rotate(216)"
              />
              <ellipse
                cx="0"
                cy="-5"
                rx="2.5"
                ry="5"
                fill="white"
                transform="rotate(288)"
              />

              {/* Orange Center */}
              <circle cx="0" cy="0" r="2.5" fill={FLOWER_ORANGE} />
            </g>
          </g>
        </defs>

        {/* Branches */}
        <g strokeLinecap="round" strokeLinejoin="round">
          {treeData.branches.map((b) => (
            <line
              key={b.key}
              x1={b.x1}
              y1={b.y1}
              x2={b.x2}
              y2={b.y2}
              stroke={PRIMARY_COLOR}
              strokeWidth={b.width}
            />
          ))}
        </g>

        {/* Leaves */}
        <g>
          {treeData.leaves.map((l) => (
            <g
              key={l.key}
              transform={`translate(${l.x}, ${l.y}) rotate(${
                l.angle * (180 / Math.PI)
              })`}
            >
              <g
                style={{
                  animation: `leaf-sway ${
                    4 / windIntensity
                  }s ease-in-out infinite alternate`,
                  animationDelay: `-${l.delay}s`,
                  transformOrigin: "0 0",
                }}
              >
                <use
                  href="#avocado-leaf"
                  fill={PRIMARY_COLOR}
                  fillOpacity={0.95}
                  style={{ transform: `scale(${l.scale})` }}
                />
              </g>
            </g>
          ))}
        </g>

        {/* Static Flowers on Tree */}
        <g>
          {treeData.staticFlowers.map((f) => (
            <g
              key={f.key}
              transform={`translate(${f.x}, ${f.y}) rotate(${90})`}
            >
              <g
                style={{
                  animation: `leaf-sway ${
                    4.5 / windIntensity
                  }s ease-in-out infinite alternate`,
                  transformOrigin: "0 0",
                }}
              >
                <use href="#tiny-flower" transform="scale(0.8)" />
              </g>
            </g>
          ))}
        </g>

        {/* Falling Flowers */}
        <g>
          {fallingFlowers.map((flower) => (
            <g
              key={flower.id}
              transform={`translate(${flower.x}, ${flower.y})`}
            >
              {/* Rotated 180 to make the stem point down (gravity) */}
              <use href="#tiny-flower" transform="rotate(180) scale(0.9)" />
            </g>
          ))}
        </g>

        <style>{`
          @keyframes leaf-sway {
            0% { transform: rotate(-6deg); }
            100% { transform: rotate(12deg); }
          }
        `}</style>
      </svg>
    </div>
  );
};

export default AvocadoTree;
