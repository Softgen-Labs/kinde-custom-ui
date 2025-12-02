import React from "react";

const styles: {
  container: React.CSSProperties;
  sidePanel: React.CSSProperties;
  gradientDesktop: React.CSSProperties;
  gradientMobile: React.CSSProperties;
  svgPattern: React.CSSProperties;
  logo: React.CSSProperties;
  logoContainer: React.CSSProperties;
  staticText: React.CSSProperties;
} = {
  container: {
    display: "flex",
    height: "100vh",
  },
  sidePanel: {
    position: "relative",
    borderRadius: "1rem",
    flex: "0 0 50%",
    margin: "0.5rem",
    overflow: "hidden",
    backgroundColor: "#051d22",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    position: "relative",
    zIndex: 10,
    color: "#ffffff",
  },
  logoContainer: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
  },
  staticText: {
    color: "#ffffff",
    fontSize: "2.25rem",
    fontWeight: 500,
    textAlign: "center",
    fontFamily: 'geist, "geist Fallback", system-ui, -apple-system, sans-serif',
    marginTop: "1.5rem",
    whiteSpace: "nowrap",
  },
  gradientDesktop: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    backgroundImage: "radial-gradient(90% 50% at 50% -20%, rgba(20, 184, 166, 0.35), rgba(5, 29, 34, 1))",
  },
  gradientMobile: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    backgroundImage: "radial-gradient(90% 50% at 50% -35%, rgba(20, 184, 166, 0.4), rgba(5, 29, 34, 1))",
    display: "none",
  },
  svgPattern: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 2,
    height: "100%",
    width: "100%",
    maskImage: "radial-gradient(75% 70% at top center, white, transparent)",
    WebkitMaskImage: "radial-gradient(75% 70% at top center, white, transparent)",
  },
};

export const DefaultLayout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .side-panel-responsive {
            display: none !important;
          }
        }

        @keyframes textRotate {
          0% { opacity: 1; }
          30% { opacity: 1; }
          33% { opacity: 0; }
          100% { opacity: 0; }
        }

        .rotating-text-container {
          position: relative;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .rotating-text {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          animation: textRotate 30s infinite;
          text-align: center;
        }

        .rotating-text:nth-child(1) {
          animation-delay: 0s;
        }

        .rotating-text:nth-child(2) {
          animation-delay: 10s;
        }

        .rotating-text:nth-child(3) {
          animation-delay: 20s;
        }
      `}</style>
      <div style={styles.container}>
        {props.children}
        <div style={styles.sidePanel} className="side-panel-responsive">
        {/* Desktop gradient - visible on screens >= 768px */}
        <div style={styles.gradientDesktop}></div>

        {/* Mobile gradient - visible on screens < 768px */}
        <div style={styles.gradientMobile}></div>

        {/* SVG grid pattern */}
        <svg
          style={styles.svgPattern}
          aria-hidden="true"
        >
          <defs>
            <pattern id="hero" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse">
              <path d="M.5 200V.5H200" fill="none" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="1"></path>
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero)"></rect>
        </svg>

        {/* Logo and rotating text */}
        <div style={styles.logoContainer}>
          <svg
            style={styles.logo}
            width="109"
            height="109"
            viewBox="0 0 109 109"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1503_289)">
              <path
                d="M21.7227 92.6837L24.7012 89.6003C27.1119 87.1022 30.4224 85.6697 33.8988 85.6086L75.6942 84.9011C79.1706 84.8399 82.5247 86.1676 85.0228 88.5784L88.1062 91.5656L71.7898 108.441L54.9144 92.1246L38.598 109L21.7227 92.6837Z"
                fill="currentColor"
              />
              <path
                d="M16.3164 21.7231L19.3997 24.7017C21.8978 27.1124 23.3303 30.4229 23.3915 33.8993L24.099 75.6947C24.1601 79.1711 22.8324 82.5252 20.4217 85.0233L17.4344 88.1067L0.550284 71.7903L16.8667 54.9149L0 38.5985L16.3164 21.7231Z"
                fill="currentColor"
              />
              <path
                d="M87.2781 16.3164L84.2995 19.3997C81.8888 21.8978 78.5783 23.3303 75.1019 23.3915L33.3065 24.099C29.8301 24.1601 26.476 22.8324 23.9779 20.4217L20.8945 17.4344L37.2109 0.550284L54.0863 16.8667L70.4027 0L87.2781 16.3164Z"
                fill="currentColor"
              />
              <path
                d="M92.6831 87.2768L89.5997 84.2983C87.1016 81.8875 85.6691 78.5771 85.608 75.1007L84.9005 33.3053C84.8393 29.8289 86.167 26.4748 88.5778 23.9767L91.565 20.8933L108.44 37.2097L92.124 54.0851L108.999 70.4014L92.6831 87.2768Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_1503_289">
                <rect width="109" height="109" fill="currentColor" />
              </clipPath>
            </defs>
          </svg>
          <div className="rotating-text-container" style={{ marginTop: "1.5rem" }}>
            <div className="rotating-text" style={styles.staticText}>
              Your AI App & Website Builder
            </div>
            <div className="rotating-text" style={styles.staticText}>
              Built to stay in flow with you
            </div>
            <div className="rotating-text" style={styles.staticText}>
              Priced to be on your side
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};
