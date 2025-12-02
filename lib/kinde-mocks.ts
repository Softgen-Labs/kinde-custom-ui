// Mock implementations for Kinde infrastructure functions
// These are used in development when running outside of Kinde's server runtime

import React from "react";

export function getKindeCSRF(): string {
  return "mock-csrf-token";
}

export function getKindeRequiredCSS(): null {
  return null;
}

export function getKindeRequiredJS(): null {
  return null;
}

export function getSVGFaviconUrl(): string {
  return "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🔐</text></svg>";
}

export function getKindeWidget(): React.ReactElement {
  return React.createElement(
    "div",
    {
      style: {
        padding: "2rem",
        border: "2px dashed #ccc",
        borderRadius: "0.5rem",
        textAlign: "center" as const,
        color: "#666",
        backgroundColor: "#f9f9f9",
      },
    },
    React.createElement(
      "p",
      { style: { margin: 0, fontSize: "0.9rem" } },
      "[Kinde Widget Mock]"
    ),
    React.createElement(
      "p",
      { style: { margin: "0.5rem 0 0", fontSize: "0.8rem", color: "#999" } },
      "In production!, this will be replaced with the actual Kinde auth widget"
    )
  );
}
