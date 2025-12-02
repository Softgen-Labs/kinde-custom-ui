"use server";

import React from "react";
import { getKindeWidget, getLogoUrl } from "@kinde/infrastructure";

const styles: {
  loginForm: React.CSSProperties;
  heading: React.CSSProperties;
  description: React.CSSProperties;
  logoWrapper: React.CSSProperties;
  logo: React.CSSProperties;
} = {
  loginForm: {
    minWidth: "400px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  heading: {
    fontWeight: "500",
    fontSize: "24px",
  },
  description: {
    marginBottom: "1.5rem",
  },
  logoWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "0.5rem",
  },
  logo: {
    width: "120px",
  },
};

export const Widget = (props: { heading: string; description: string }) => {
  return (
    <main style={styles.loginForm}>
      <div style={styles.logoWrapper}>
          <img style={styles.logo} src={getLogoUrl()} />
        </div>
      <div style={{ padding: "2rem" }}>
        <h2 style={styles.heading}>{props.heading}</h2>
        <p style={styles.description}>{props.description}</p>
        {getKindeWidget()}
      </div>
    </main>
  );
};
