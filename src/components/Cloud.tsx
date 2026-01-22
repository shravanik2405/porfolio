import CloudSvg from "../assets/cloud.svg";

export const Cloud = ({ isPaused }: { isPaused: boolean }) => {
  return (
    <>
      <style>{`
        @keyframes cloudDrift1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(500vw); }
        }
        @keyframes cloudDrift2 {
          0% { transform: translateX(0); }
          100% { transform: translateX(500vw); }
        }
        @keyframes cloudDrift3 {
          0% { transform: translateX(0); }
          100% { transform: translateX(500vw); }
        }
        .cloud-1 {
          animation: cloudDrift1 120s linear infinite;
        }
        .cloud-2 {
          animation: cloudDrift2 140s linear infinite;
        }
        .cloud-3 {
          animation: cloudDrift3 100s linear infinite;
        }
      `}</style>

      {/* Cloud 1 - left side */}
      <div
        className='cloud-item cloud-1'
        style={{
          position: "absolute",
          top: "8%",
          left: "5vw",
          zIndex: 5,
          width: "200px",
          animationPlayState: isPaused ? "paused" : "running",
        }}>
        <img
          src={CloudSvg}
          alt='Cloud'
          style={{ width: "100%", height: "auto", opacity: 0.9 }}
        />
      </div>

      {/* Cloud 2 - center */}
      <div
        className='cloud-item cloud-2'
        style={{
          position: "absolute",
          top: "12%",
          left: "40vw",
          zIndex: 6,
          width: "180px",
          animationPlayState: isPaused ? "paused" : "running",
        }}>
        <img
          src={CloudSvg}
          alt='Cloud'
          style={{ width: "100%", height: "auto", opacity: 0.9 }}
        />
      </div>

      {/* Cloud 3 - right side */}
      <div
        className='cloud-item cloud-3'
        style={{
          position: "absolute",
          top: "5%",
          left: "75vw",
          zIndex: 7,
          width: "160px",
          animationPlayState: isPaused ? "paused" : "running",
        }}>
        <img
          src={CloudSvg}
          alt='Cloud'
          style={{ width: "100%", height: "auto", opacity: 0.9 }}
        />
      </div>
    </>
  );
};
