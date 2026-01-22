import CloudSvg from "../assets/cloud.svg";

export const Cloud = ({ isPaused }: { isPaused: boolean }) => {
  return (
    <>
      <style>{`
        @keyframes cloudDrift {
          0% { transform: translateX(-15vw); }
          100% { transform: translateX(115vw); }
        }
        .cloud-item {
          position: absolute;
          pointer-events: none;
        }
        .cloud-1 {
          animation: cloudDrift 90s linear infinite;
          animation-delay: 0s;
        }
        .cloud-2 {
          animation: cloudDrift 90s linear infinite;
          animation-delay: -30s;
        }
        .cloud-3 {
          animation: cloudDrift 90s linear infinite;
          animation-delay: -60s;
        }
      `}</style>

      {/* Cloud 1 - top */}
      <div
        className='cloud-item cloud-1'
        style={{
          top: "6%",
          left: "0",
          width: "180px",
          animationPlayState: isPaused ? "paused" : "running",
        }}>
        <img
          src={CloudSvg}
          alt='Cloud'
          style={{ width: "100%", height: "auto", opacity: 0.85 }}
        />
      </div>

      {/* Cloud 2 - middle */}
      <div
        className='cloud-item cloud-2'
        style={{
          top: "10%",
          left: "0",
          width: "160px",
          animationPlayState: isPaused ? "paused" : "running",
        }}>
        <img
          src={CloudSvg}
          alt='Cloud'
          style={{ width: "100%", height: "auto", opacity: 0.85 }}
        />
      </div>

      {/* Cloud 3 - lower */}
      <div
        className='cloud-item cloud-3'
        style={{
          top: "4%",
          left: "0",
          width: "140px",
          animationPlayState: isPaused ? "paused" : "running",
        }}>
        <img
          src={CloudSvg}
          alt='Cloud'
          style={{ width: "100%", height: "auto", opacity: 0.85 }}
        />
      </div>
    </>
  );
};
