import React, { useMemo } from "react";

const createRandom = (seed: number) => {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
};

interface GrassStripProps {
  color?: string;
  width?: number;
  height?: number;
  bladeCount?: number;
  variability?: number;
  wind?: number;
  flowerDensity?: number;
  beeCount?: number;
}

export const GrassStrip: React.FC<GrassStripProps> = ({
  color = "#292926",
  width = 600, // Reduced default width
  height = 80,
  bladeCount = 240, // Reduced default blade count
  variability = 0.8,
  wind = 0.05,
  flowerDensity = 0.15,
  beeCount = 3,
}) => {
  // 1. Generate Grass Path
  const pathData = useMemo(() => {
    const rng = createRandom(54321);
    let d = "";

    const step = width / bladeCount;
    const headroom = 15;
    const maxBladeHeight = height - headroom;

    for (let i = 0; i < bladeCount; i++) {
      const x = i * step;
      const jitter = (rng() - 0.5) * step * 4;
      const baseX = x + jitter;

      const isFlower = rng() < flowerDensity;

      let bladeHeight =
        maxBladeHeight * (0.2 + rng() * 0.8 + rng() * variability * 0.2);

      if (isFlower) {
        bladeHeight = maxBladeHeight * (0.75 + rng() * 0.25);
      }

      const bladeWidth = step * (0.5 + rng() * 0.8);
      const stemWidth = isFlower ? bladeWidth * 1.5 : bladeWidth;

      const randomLean = (rng() - 0.5) * 40;
      const windFactor = wind * 60 * (bladeHeight / height);
      const lean = randomLean + windFactor;

      const tipX = baseX + lean;
      const tipY = height - bladeHeight;

      const cp1x = baseX + lean * 0.3;
      const cp1y = height - bladeHeight * 0.3;

      const droop = !isFlower && Math.abs(lean) > 20 ? 10 : 0;
      const cp2x = tipX - lean * 0.2;
      const cp2y = tipY + bladeHeight * 0.1 + droop;

      d += `M ${baseX} ${height} `;
      d += `C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${tipX} ${tipY} `;
      d += `L ${baseX + stemWidth} ${height} `;
      d += `Z `;

      if (isFlower) {
        const flowerType = Math.floor(rng() * 3);
        const size = 3 + rng() * 4;

        if (flowerType === 0) {
          d += `M ${tipX} ${tipY - size} `;
          d += `A ${size} ${size} 0 1 0 ${tipX} ${tipY + size} `;
          d += `A ${size} ${size} 0 1 0 ${tipX} ${tipY - size} `;
          d += `Z `;
        } else if (flowerType === 1) {
          d += `M ${tipX} ${tipY} `;
          d += `C ${tipX - size} ${tipY} ${tipX - size} ${tipY - size * 1.5} ${
            tipX - size * 0.5
          } ${tipY - size * 1.8} `;
          d += `L ${tipX} ${tipY - size * 1.2} `;
          d += `L ${tipX + size * 0.5} ${tipY - size * 1.8} `;
          d += `C ${tipX + size} ${tipY - size * 1.5} ${
            tipX + size
          } ${tipY} ${tipX} ${tipY} `;
          d += `Z `;
        } else {
          d += `M ${tipX} ${tipY - size * 1.8} `;
          d += `L ${tipX + size} ${tipY - size * 0.5} `;
          d += `L ${tipX} ${tipY + size * 0.5} `;
          d += `L ${tipX - size} ${tipY - size * 0.5} `;
          d += `Z `;
        }
      }
    }
    return d;
  }, [width, height, bladeCount, variability, wind, flowerDensity]);

  // 2. Generate Bees
  const bees = useMemo(() => {
    const rng = createRandom(777);
    return Array.from({ length: beeCount }).map((_, i) => {
      // Directions
      const startLeft = i % 2 === 0;

      // Calculate safe bounds (padding of 40px)
      const padding = 40;
      const xStart = startLeft ? padding : width - padding;
      const xEnd = startLeft ? width - padding : padding;

      return {
        id: i,
        // Keep bees in upper area
        yFixed: 20 + rng() * (height * 0.3),
        size: 5 + rng() * 2,
        // Increased duration significantly for slower flight
        // Was: 10 + rng() * 8 (10-18s)
        // Now: 25 + rng() * 15 (25-40s) for one-way trip
        duration: 25 + rng() * 15,
        delay: rng() * -20,

        // Flight path: Start -> End -> Start (Ping Pong)
        xValues: `${xStart}; ${xEnd}; ${xStart}`,
      };
    });
  }, [beeCount, width, height]);

  const honeyOrange = "#ff693d";

  return (
    <div style={{ width: "100%", overflow: "hidden", lineHeight: 0 }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio='none'
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          fill: color,
        }}>
        {/* Grass Layer */}
        <path d={pathData} />

        {/* Bees Layer */}
        {bees.map((bee) => (
          <g key={bee.id}>
            {/* Group 1: Horizontal Patrol (Ping Pong) */}
            <g>
              <animateTransform
                attributeName='transform'
                type='translate'
                values={bee.xValues
                  .split(";")
                  .map((x) => `${x} ${bee.yFixed}`)
                  .join("; ")}
                dur={`${bee.duration * 2}s`} // Double duration for round trip
                begin={`${bee.delay}s`}
                repeatCount='indefinite'
                calcMode='spline'
                keySplines='0.4 0 0.2 1; 0.4 0 0.2 1' // Smooth ease-in-out for turning
              />

              {/* Group 2: Vertical Bobbing */}
              <g>
                <animateTransform
                  attributeName='transform'
                  type='translate'
                  values='0,0; 0,-8; 0,0'
                  dur='1.5s'
                  repeatCount='indefinite'
                  calcMode='spline'
                  keySplines='0.4 0 0.2 1; 0.4 0 0.2 1'
                />

                {/* Bee Visuals: Honey Bee Style */}
                <g>
                  {/* Wings (Charcoal, Translucent) */}
                  <ellipse
                    cx={-bee.size * 0.6}
                    cy={-bee.size * 0.4}
                    rx={bee.size * 0.8}
                    ry={bee.size * 0.4}
                    fill={color}
                    opacity='0.4'>
                    <animateTransform
                      attributeName='transform'
                      type='rotate'
                      values={`30 ${-bee.size * 0.6} ${-bee.size * 0.4}; -10 ${
                        -bee.size * 0.6
                      } ${-bee.size * 0.4}; 30 ${-bee.size * 0.6} ${
                        -bee.size * 0.4
                      }`}
                      dur='0.08s'
                      repeatCount='indefinite'
                    />
                  </ellipse>
                  <ellipse
                    cx={bee.size * 0.6}
                    cy={-bee.size * 0.4}
                    rx={bee.size * 0.8}
                    ry={bee.size * 0.4}
                    fill={color}
                    opacity='0.4'>
                    <animateTransform
                      attributeName='transform'
                      type='rotate'
                      values={`-30 ${bee.size * 0.6} ${-bee.size * 0.4}; 10 ${
                        bee.size * 0.6
                      } ${-bee.size * 0.4}; -30 ${bee.size * 0.6} ${
                        -bee.size * 0.4
                      }`}
                      dur='0.08s'
                      repeatCount='indefinite'
                    />
                  </ellipse>

                  {/* Body (Orange Oval) */}
                  <ellipse
                    rx={bee.size}
                    ry={bee.size * 0.75}
                    fill={honeyOrange}
                  />

                  {/* Stripes (Charcoal) */}
                  <g
                    stroke={color}
                    strokeWidth={bee.size * 0.35}
                    strokeLinecap='round'>
                    {/* Left Stripe */}
                    <line
                      x1={-bee.size * 0.4}
                      y1={-bee.size * 0.6}
                      x2={-bee.size * 0.4}
                      y2={bee.size * 0.6}
                    />
                    {/* Middle Stripe */}
                    <line
                      x1={0}
                      y1={-bee.size * 0.7}
                      x2={0}
                      y2={bee.size * 0.7}
                    />
                    {/* Right Stripe */}
                    <line
                      x1={bee.size * 0.4}
                      y1={-bee.size * 0.6}
                      x2={bee.size * 0.4}
                      y2={bee.size * 0.6}
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
};
