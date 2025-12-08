export const MobileBlocker = () => {
  return (
    <div className='mobile-blocker'>
      <div className='content'>
        <h1>Please view on a laptop</h1>
        <p>This experience is optimized for larger screens.</p>
        <div className='icon'>💻</div>
      </div>
      <style>{`
        .mobile-blocker {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: #2D2D2D;
          color: #EB5937;
          z-index: 9999;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 2rem;
        }
        
        .mobile-blocker .content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .mobile-blocker h1 {
          font-size: 2rem;
          margin: 0;
          color: #EB5937;
          text-transform: uppercase;
          font-weight: 900;
        }

        .mobile-blocker p {
          color: #fff;
          font-size: 1.2rem;
        }

        .mobile-blocker .icon {
          font-size: 4rem;
          margin-top: 1rem;
        }

        /* Show on screens smaller than 1024px (Tablets and Mobiles) */
        @media (max-width: 1023px) {
          .mobile-blocker {
            display: flex;
          }
          /* Hide the main app content when blocker is visible to prevent scrolling */
          body {
            overflow: hidden;
          }
        }
      `}</style>
    </div>
  );
};
