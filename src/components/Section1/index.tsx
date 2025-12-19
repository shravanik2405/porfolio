import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";
import frame1 from "../../assets/frame1.png";
import frame2 from "../../assets/frame2.png";
import birds from "../../assets/birds.png";
import { theme } from "../../theme";

const images = [frame1, frame2];

export const Section1 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={styles.section}
      style={{
        background: theme.gradients.splitBackground(
          theme.colors.primary,
          theme.colors.secondary
        ),
      }}>
      <img src={birds} alt='Birds' className={styles.birdsImage} />

      <div className={styles.container}>
        <div className={styles.textContainer}>
          <motion.h1
            className={styles.firstName}
            style={{ color: theme.colors.secondary }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}>
            <motion.span
              style={{
                display: "inline-block",
                transformOrigin: "bottom right",
              }}
              initial={{ rotate: 20 }}
              animate={{ rotate: 0, y: [0, -20, 0] }}
              transition={{
                rotate: { delay: 2, duration: 0.5, type: "spring" },
                y: { delay: 2, duration: 0.5, times: [0, 0.5, 1] },
              }}>
              S
            </motion.span>
            hravani
          </motion.h1>
          <motion.h1
            className={styles.lastName}
            style={{ color: theme.colors.primary }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}>
            <motion.span
              style={{
                display: "inline-block",
                transformOrigin: "bottom right",
              }}
              initial={{ rotate: 20 }}
              animate={{ rotate: 0, y: [0, -20, 0] }}
              transition={{
                rotate: { delay: 2.2, duration: 0.5, type: "spring" },
                y: { delay: 2.2, duration: 0.5, times: [0, 0.5, 1] },
              }}>
              K
            </motion.span>
            hatri
          </motion.h1>
        </div>

        <div className={styles.imageWrapper}>
          <svg
            width='536'
            height='410'
            viewBox='0 0 536 410'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={styles.svg}>
            <g className={styles.orbitSystem}>
              <circle cx='268' cy='250' r='140' fill='url(#auraGradient)' />
              <g className={styles.arcGroup}>
                <g className={`${styles.planet} ${styles.planet1}`}>
                  <svg
                    x='-32'
                    y='-31'
                    width='64'
                    height='62'
                    viewBox='0 0 64 62'
                    fill='none'
                    style={{ overflow: "visible" }}>
                    <rect
                      x='2'
                      y='2'
                      width='60'
                      height='58'
                      rx='29'
                      fill='#292926'
                    />
                    <rect
                      x='2'
                      y='2'
                      width='60'
                      height='58'
                      rx='29'
                      stroke='#292926'
                      strokeWidth='4'
                    />
                    <path
                      d='M21.2092 43.0102L18.8027 16H45.2587L42.8523 42.9956L32.0089 46'
                      fill='#E44D26'
                    />
                    <path
                      d='M32.0312 43.7029V18.2168H42.8455L40.7819 41.2601'
                      fill='#F16529'
                    />
                    <path
                      d='M23.7178 21.5195H32.0309V24.8302H27.3493L27.6555 28.221H32.0309V31.5244H24.622L23.7178 21.5195ZM24.7678 33.187H28.0931L28.3264 35.8341L32.0309 36.8258V40.2823L25.2345 38.3863'
                      fill='#EBEBEB'
                    />
                    <path
                      d='M40.3156 21.5195H32.0171V24.8302H40.0093L40.3156 21.5195ZM39.7103 28.221H32.0171V31.5317H36.1007L35.7142 35.8341L32.0171 36.8258V40.2677L38.7988 38.3863'
                      fill='white'
                    />
                  </svg>
                </g>
                <circle
                  className={`${styles.planet} ${styles.planet2}`}
                  r='4'
                  fill='#292926'
                />
                <g className={`${styles.planet} ${styles.planet3}`}>
                  <svg
                    x='-32'
                    y='-32'
                    width='64'
                    height='64'
                    viewBox='0 0 64 64'
                    fill='none'
                    style={{ overflow: "visible" }}>
                    <rect
                      x='2'
                      y='2'
                      width='60'
                      height='60'
                      rx='30'
                      fill='#292926'
                    />
                    <rect
                      x='2'
                      y='2'
                      width='60'
                      height='60'
                      rx='30'
                      stroke='#292926'
                      strokeWidth='4'
                    />
                    <path
                      d='M32.3448 35.1153C33.9272 35.1153 35.21 33.8325 35.21 32.25C35.21 30.6676 33.9272 29.3848 32.3448 29.3848C30.7623 29.3848 29.4795 30.6676 29.4795 32.25C29.4795 33.8325 30.7623 35.1153 32.3448 35.1153Z'
                      fill='#61DAFB'
                    />
                    <path
                      d='M32.3473 38.1215C40.8385 38.1215 47.722 35.4933 47.722 32.2512C47.722 29.0091 40.8385 26.3809 32.3473 26.3809C23.8561 26.3809 16.9727 29.0091 16.9727 32.2512C16.9727 35.4933 23.8561 38.1215 32.3473 38.1215Z'
                      stroke='#61DAFB'
                      strokeWidth='1.625'
                    />
                    <path
                      d='M27.2613 35.1852C31.5069 42.5387 37.2248 47.1859 40.0325 45.5648C42.8402 43.9438 41.6746 36.6684 37.429 29.3148C33.1834 21.9613 27.4656 17.3141 24.6579 18.9352C21.8501 20.5562 23.0157 27.8316 27.2613 35.1852Z'
                      stroke='#61DAFB'
                      strokeWidth='1.625'
                    />
                    <path
                      d='M27.2602 29.3137C23.0146 36.6672 21.849 43.9426 24.6567 45.5637C27.4645 47.1847 33.1823 42.5376 37.4279 35.184C41.6735 27.8304 42.8391 20.555 40.0314 18.934C37.2237 17.3129 31.5058 21.9601 27.2602 29.3137Z'
                      stroke='#61DAFB'
                      strokeWidth='1.625'
                    />
                  </svg>
                </g>
                <circle
                  className={`${styles.planet} ${styles.planet4}`}
                  r='5'
                  fill='#292926'
                />
                <g className={`${styles.planet} ${styles.planet5}`}>
                  <svg
                    x='-32'
                    y='-32'
                    width='64'
                    height='64'
                    viewBox='0 0 64 64'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    style={{ overflow: "visible" }}>
                    <rect
                      x='2'
                      y='2'
                      width='60'
                      height='60'
                      rx='30'
                      fill='#292926'
                    />
                    <rect
                      x='2'
                      y='2'
                      width='60'
                      height='60'
                      rx='30'
                      stroke='#292926'
                      strokeWidth='4'
                    />
                    <path
                      d='M16.001 16H48.0788V48.0778H16.001V16Z'
                      fill='#017ACB'
                    />
                    <path
                      d='M31.4025 27.8791H32.9413V30.5355H28.7812V42.3542L28.6709 42.3843C28.5205 42.4244 26.5407 42.4244 26.1147 42.3792L25.7739 42.3492V30.5355H21.6138V27.8791L22.932 27.864C23.6537 27.854 25.5082 27.854 27.052 27.864C28.5957 27.8741 30.5505 27.8791 31.4025 27.8791ZM43.146 41.1011C42.5346 41.7477 41.878 42.1086 40.7853 42.4043C40.3092 42.5346 40.229 42.5396 39.1564 42.5346C38.0838 42.5296 37.9986 42.5296 37.4773 42.3943C36.129 42.0484 35.0414 41.3718 34.2996 40.4145C34.0891 40.1438 33.7432 39.5825 33.7432 39.5123C33.7432 39.4922 33.7933 39.4471 33.8585 39.4171C33.9237 39.387 34.059 39.3018 34.1693 39.2366C34.2795 39.1715 34.48 39.0512 34.6153 38.981C34.7507 38.9108 35.1416 38.6803 35.4824 38.4748C35.8233 38.2693 36.134 38.1039 36.1691 38.1039C36.2042 38.1039 36.2694 38.174 36.3195 38.2593C36.6202 38.7655 37.3219 39.4121 37.8181 39.6326C38.1239 39.7629 38.8005 39.9083 39.1263 39.9083C39.427 39.9083 39.9784 39.7779 40.2741 39.6426C40.5898 39.4973 40.7502 39.3519 40.9407 39.0612C41.071 38.8557 41.086 38.8006 41.081 38.4096C41.081 38.0487 41.061 37.9485 40.9607 37.7831C40.6801 37.322 40.2991 37.0814 38.7554 36.3997C37.1615 35.693 36.4448 35.272 35.8634 34.7056C35.4323 34.2846 35.3471 34.1693 35.0765 33.6431C34.7256 32.9664 34.6805 32.7459 34.6755 31.7384C34.6705 31.0317 34.6855 30.8012 34.7607 30.5606C34.8659 30.1997 35.2068 29.503 35.3622 29.3276C35.6829 28.9517 35.7982 28.8364 35.7982 28.8364C36.7054 28.0896 37.768 27.7187 38.7855 27.6836C38.9007 27.6836 39.2817 27.7036 39.6375 27.7287C40.66 27.8139 41.3567 28.0645 42.0283 28.6008C42.5346 29.0018 43.3014 29.9441 43.2262 30.0694C43.1761 30.1446 41.1763 31.4778 41.046 31.5179C40.9658 31.543 40.9106 31.5129 40.8004 31.3826C40.1187 30.5656 39.843 30.3902 39.1814 30.3501C38.7103 30.32 38.4597 30.3751 38.1439 30.5856C37.8131 30.8062 37.6527 31.142 37.6527 31.6081C37.6577 32.2898 37.9184 32.6105 38.8807 33.0867C39.5022 33.3924 40.0335 33.6431 40.0736 33.6431C40.1337 33.6431 41.4219 34.2846 41.7577 34.4851C43.3215 35.4023 43.958 36.3446 44.1234 37.9685C44.2437 39.1915 43.8979 40.3092 43.146 41.1011Z'
                      fill='white'
                    />
                  </svg>
                </g>
                <circle
                  className={`${styles.planet} ${styles.planet6}`}
                  r='3'
                  fill='#292926'
                />
                <g className={`${styles.planet} ${styles.planet7}`}>
                  <svg
                    x='-32'
                    y='-32'
                    width='64'
                    height='64'
                    viewBox='0 0 64 64'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    style={{ overflow: "visible" }}>
                    <rect
                      x='2'
                      y='2'
                      width='60'
                      height='60'
                      rx='30'
                      fill='#292926'
                    />
                    <rect
                      x='2'
                      y='2'
                      width='60'
                      height='60'
                      rx='30'
                      stroke='#292926'
                      strokeWidth='4'
                    />
                    <path
                      d='M47.7832 49.8854L24.5823 20H20.2109V40.7771H23.708V24.4411L45.0381 52C46.0005 51.3558 46.9175 50.649 47.7832 49.8854Z'
                      fill='url(#paint0_linear_next)'
                    />
                    <path
                      d='M41.2846 20H37.8203V40.7858H41.2846V20Z'
                      fill='url(#paint1_linear_next)'
                    />
                    <defs>
                      <linearGradient
                        id='paint0_linear_next'
                        x1='36.0889'
                        y1='38.0432'
                        x2='46.3375'
                        y2='50.7456'
                        gradientUnits='userSpaceOnUse'>
                        <stop stopColor='white' />
                        <stop offset='1' stopColor='white' stopOpacity='0' />
                      </linearGradient>
                      <linearGradient
                        id='paint1_linear_next'
                        x1='39.5525'
                        y1='20'
                        x2='39.4945'
                        y2='35.2646'
                        gradientUnits='userSpaceOnUse'>
                        <stop stopColor='white' />
                        <stop offset='1' stopColor='white' stopOpacity='0' />
                      </linearGradient>
                    </defs>
                  </svg>
                </g>
                <circle
                  className={`${styles.planet} ${styles.planet8}`}
                  r='4'
                  fill='#292926'
                />
                <g className={`${styles.planet} ${styles.planet9}`}>
                  <svg
                    x='-32'
                    y='-32'
                    width='64'
                    height='64'
                    viewBox='0 0 64 64'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    style={{ overflow: "visible" }}>
                    <rect
                      x='2'
                      y='2'
                      width='60'
                      height='60'
                      rx='30'
                      fill='#292926'
                    />
                    <rect
                      x='2'
                      y='2'
                      width='60'
                      height='60'
                      rx='30'
                      stroke='#292926'
                      strokeWidth='4'
                    />
                    <g style={{ transform: "translate(4px, 5px)" }}>
                      <path
                        d='M27.3901 24.2696C27.5801 23.9926 27.7871 23.9576 27.9551 23.9576C28.1231 23.9576 28.4021 23.9926 28.5921 24.2696C30.0821 26.2996 32.5421 30.3446 34.3571 33.3296C35.5411 35.2746 36.4501 36.7696 36.6371 36.9596C37.3371 37.6736 38.2971 37.2286 38.8551 36.4186C39.4041 35.6216 39.5561 35.0616 39.5561 34.4646C39.5561 34.0576 31.5981 19.3776 30.7971 18.1556C30.0271 16.9806 29.7751 16.6836 28.4571 16.6836H27.4691C26.1541 16.6836 25.9641 16.9806 25.1931 18.1556C24.3921 19.3776 16.4331 34.0576 16.4331 34.4636C16.4331 35.0616 16.5861 35.6216 17.1361 36.4186C17.6941 37.2286 18.6541 37.6736 19.3541 36.9586C19.5401 36.7686 20.4491 35.2746 21.6331 33.3286C23.4481 30.3446 25.9001 26.2996 27.3911 24.2686L27.3901 24.2696Z'
                        fill='white'
                      />
                    </g>
                  </svg>
                </g>
                <circle
                  className={`${styles.planet} ${styles.planet10}`}
                  r='4'
                  fill='#EC4E20'
                />
              </g>
            </g>
            <defs>
              <radialGradient
                id='auraGradient'
                cx='0'
                cy='0'
                r='1'
                gradientUnits='userSpaceOnUse'
                gradientTransform='translate(268 250) rotate(90) scale(140)'>
                <stop stopColor='#fca5a5' stopOpacity='0.4' />
                <stop offset='0.6' stopColor='#fca5a5' stopOpacity='0.1' />
                <stop offset='1' stopColor='#fca5a5' stopOpacity='0' />
              </radialGradient>
            </defs>
          </svg>
          <img
            src={images[currentImageIndex]}
            alt='Girl Reading'
            className={styles.girlImage}
          />
        </div>
      </div>
    </section>
  );
};
