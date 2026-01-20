import React from "react";

const styles: {
  container: React.CSSProperties;
  contentWrapper: React.CSSProperties;
  gradientDesktop: React.CSSProperties;
  svgPattern: React.CSSProperties;
  svgTopLeft: React.CSSProperties;
  svgBottomRight: React.CSSProperties;
  logo: React.CSSProperties;
  logoContainer: React.CSSProperties;
  staticText: React.CSSProperties;
} = {
  container: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  contentWrapper: {
    position: "relative",
    zIndex: 10,
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
    backgroundImage: "radial-gradient(90% 50% at 50% -20%, rgba(93, 208, 220, 1), rgba(248, 255, 254, 1))",
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
  svgTopLeft: {
    position: "fixed",
    left: "-120px",
    top: "-120px",
    zIndex: 3,
    color: "rgba(93, 208, 220, 0.6)",
    width: "455px",
    height: "455px",
    pointerEvents: "none",
    userSelect: "none",
  },
  svgBottomRight: {
    position: "fixed",
    bottom: "-120px",
    right: "-120px",
    zIndex: 3,
    color: "rgba(93, 208, 220, 0.6)",
    width: "455px",
    height: "455px",
    pointerEvents: "none",
    userSelect: "none",
  },
};

const DecorativePattern: React.FC<{ idPrefix: string; style?: React.CSSProperties; className?: string }>
  = ({ idPrefix, style, className }) => {
    const maskId = `mask_${idPrefix}`;
    return (
      <svg
        width="755"
        height="755"
        viewBox="0 0 755 755"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={style}
        className={className}
        aria-hidden="true"
      >
        <mask id={maskId} style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="755" height="755">
          <path d="M754.966 0H0V755H754.966V0Z" fill="currentColor"></path>
        </mask>
        <g mask={`url(#${maskId})`}>
          <path d="M524.314 590.076C547.86 589.662 570.58 598.654 587.503 614.986L607.422 634.284L497.188 748.3L381.743 636.673L380.305 635.283L378.915 636.721L267.292 752.172L153.284 641.935L172.525 622.016L172.526 622.015C188.853 605.096 211.276 595.391 234.827 594.977L234.826 594.976L524.313 590.076H524.314Z" stroke="currentColor" strokeWidth="6"></path>
          <path d="M132.979 172.538H132.979C149.633 188.61 159.297 210.59 159.99 233.739L160.017 234.842L164.917 524.341V524.342C165.331 547.888 156.339 570.608 140.011 587.531L120.709 607.454L6.63867 497.214L118.262 381.764L119.651 380.327L118.214 378.936L2.82715 267.309L113.061 153.294L132.979 172.538Z" stroke="currentColor" strokeWidth="6"></path>
          <path d="M601.686 113.064L582.444 132.984L582.443 132.985C566.372 149.64 544.393 159.305 521.245 159.998L520.142 160.024L230.656 164.925H230.654C207.109 165.339 184.389 156.345 167.466 140.014L147.547 120.715L257.78 6.63867L373.227 118.267L374.664 119.656L376.055 118.22L487.676 2.82715L601.686 113.064Z" stroke="currentColor" strokeWidth="6"></path>
          <path d="M748.259 257.784L636.64 373.236L635.249 374.674L636.688 376.064L752.131 487.689L641.901 601.704L621.983 582.463L621.982 582.462C605.328 566.389 595.664 544.41 594.972 521.261L594.945 520.158L590.045 230.659V230.657C589.631 207.112 598.621 184.391 614.951 167.468L614.952 167.469L634.251 147.546L748.259 257.784Z" stroke="currentColor" strokeWidth="6"></path>
        </g>
      </svg>
    );
  };

export const DefaultLayout = (props: { children: React.ReactNode }) => {
  return (
    <div style={styles.container}>
      <style>
        {`
          .md-only { display: none; }
          @media (min-width: 768px) { .md-only { display: block; } }
      ` }
      </style>

      {/* Desktop gradient */}
      <div style={styles.gradientDesktop} className="md-only"></div>

      {/* SVG grid pattern */}
      <svg style={styles.svgPattern} className="md-only" aria-hidden="true">
        <defs>
          <pattern id="hero" width="80" height="80" x="50%" y="-1" patternUnits="userSpaceOnUse">
            <path d="M.5 200V.5H200" fill="none" stroke="rgba(20, 184, 166, 0.3)" strokeWidth="1"></path>
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero)"></rect>
      </svg>

      {/* Decorative patterns (top-left and bottom-right) - reuse same markup with unique IDs */}
      <DecorativePattern idPrefix="top" style={styles.svgTopLeft} className="md-only" />
      <DecorativePattern idPrefix="bottom" style={styles.svgBottomRight} className="md-only" />

      {/* Content wrapper */}
      <div style={styles.contentWrapper}>
        {props.children}
      </div>
    </div>
  );
};
