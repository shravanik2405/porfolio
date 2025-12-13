export const MobileBlocker = () => {
  return (
    <div className='mobile-blocker'>
      <style>{`
        .mobile-blocker {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #000000;
          z-index: 9999;
          align-items: center;
          justify-content: center;
        }

        .mobile-blocker-text {
          color: #ffffff;
          font-size: 24px;
          font-weight: 500;
          text-align: center;
        }

        /* Show only on mobile-sized screens; keep tablets & larger unchanged */
        @media (max-width: 767px) {
          .mobile-blocker {
            display: flex;
          }
          /* Hide the main app content when blocker is visible to prevent scrolling */
          body {
            overflow: hidden;
          }
        }
      `}</style>
      <div className='mobile-blocker-text'>Coming Soon</div>
    </div>
  );
};
