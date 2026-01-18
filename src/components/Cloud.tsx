import CloudSvg from "../assets/cloud.svg";

interface CloudProps {
  top: string;
  width: string;
  mobileWidth: string;
  duration: number;
  delay?: number;
  zIndex?: number;
  initialX?: string;
  isPaused: boolean;
}

const CloudItem = ({
  top,
  width,
  mobileWidth,
  duration,
  delay = 0,
  zIndex = 5,
  initialX = "-20vw",
  isPaused,
}: CloudProps) => {
  return (
    <div
      className='cloud-item'
      style={
        {
          position: "absolute",
          top,
          zIndex,
          left: 0,
          "--start-x": initialX,
          "--end-x": "420vw",
          "--duration": `${duration}s`,
          "--delay": `${delay}s`,
          "--play-state": isPaused ? "paused" : "running",
          "--width-desktop": width,
          "--width-mobile": mobileWidth,
        } as React.CSSProperties
      }>
      <img src={CloudSvg} alt='Cloud' className='cloud-img' />
    </div>
  );
};

export const Cloud = ({ isPaused }: { isPaused: boolean }) => {
  return (
    <>
      <style>{`
        @keyframes cloudDrift {
          from { transform: translateX(var(--start-x)); }
          to { transform: translateX(var(--end-x)); }
        }
        .cloud-item {
          width: var(--width-desktop);
          animation: cloudDrift var(--duration) linear infinite;
          animation-delay: var(--delay);
          animation-play-state: var(--play-state);
        }
        .cloud-img {
          width: 100%;
          height: auto;
          opacity: 0.9;
        }
        @media (max-width: 768px) {
          .cloud-item {
            width: var(--width-mobile);
          }
        }
      `}</style>

      <CloudItem
        isPaused={isPaused}
        top='5%'
        width='200px'
        mobileWidth='100px'
        duration={120}
        zIndex={5}
        delay={0}
      />
      <CloudItem
        isPaused={isPaused}
        top='15%'
        width='160px'
        mobileWidth='80px'
        duration={120}
        zIndex={4}
        delay={-30}
      />
      <CloudItem
        isPaused={isPaused}
        top='8%'
        width='180px'
        mobileWidth='90px'
        duration={120}
        zIndex={3}
        delay={-60}
      />
      <CloudItem
        isPaused={isPaused}
        top='3%'
        width='150px'
        mobileWidth='75px'
        duration={120}
        zIndex={5}
        delay={-90}
      />
      <CloudItem
        isPaused={isPaused}
        top='12%'
        width='140px'
        mobileWidth='70px'
        duration={120}
        zIndex={4}
        delay={-15}
      />
      <CloudItem
        isPaused={isPaused}
        top='6%'
        width='170px'
        mobileWidth='85px'
        duration={120}
        zIndex={3}
        delay={-75}
      />
    </>
  );
};
