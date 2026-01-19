"use server";

import React from "react";
import { getKindeWidget, getLogoUrl, getKindeNonce } from "@kinde/infrastructure";
import { kindeVariables } from "../styles/styles";


const styles: {
  loginForm: React.CSSProperties;
  heading: React.CSSProperties;
  description: React.CSSProperties;
  logoWrapper: React.CSSProperties;
  logo: React.CSSProperties;
} = {
  loginForm: {
    // minWidth: "400px",
    // margin: "0 auto",
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: kindeVariables.buttonSecondaryBorderRadius,
    border: "1px solid rgba(0, 0, 0, 0.08)",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
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
    marginTop: "3rem"
  },
  logo: {
    width: "120px",
  },
};

export const Widget = (props: { heading: string; description: string; flow?: string }) => {
  const nonce = getKindeNonce();

  return (
    <>
      <style>
        {`
          @media (max-width: 767px) {
            .login-form {
              border: none !important;
              box-shadow: none !important;

              .widget-container {
                padding-top: 3rem !important;
                padding-bottom: 3rem !important;
                padding-left: 0 !important;
                padding-right: 0 !important;
              }
            }
          }
          .last-login-method {
            border-color: ${kindeVariables.buttonPrimaryBackgroundColor} !important;
            border-width: 2px !important;
          }
        `}
      </style>

        {props.flow === 'login' && <script nonce={nonce} dangerouslySetInnerHTML={{__html: `
          (function() {
            // Check localStorage availability
            if (typeof localStorage === 'undefined') {
              console.warn('localStorage is not available');
              return;
            }

            const STORAGE_KEY = 'kinde_last_connection_id';

            // Add label to button function
            const addLabelToButton = (button) => {
              if (!button.querySelector('.last-used-label')) {
                button.classList.add('last-login-method');
                button.style.position = 'relative';

                const label = document.createElement('div');
                label.className = 'last-used-label';
                label.textContent = 'Last used';
                label.style.cssText = 'position: absolute; top: -16px; right: 0; font-size: 10px; font-weight: 600; color: ${kindeVariables.buttonPrimaryBackgroundColor};';

                button.appendChild(label);
              }
            };

            // Show badge on last used button
            const showLastUsedBadge = () => {
              const lastConnectionId = localStorage.getItem(STORAGE_KEY);
              console.log('Last connection ID:', lastConnectionId || 'Not found');

              if (lastConnectionId) {
                const buttons = document.querySelectorAll('button[name="p_connection_id"]');
                buttons.forEach(button => {
                  if (button.value === lastConnectionId) {
                    addLabelToButton(button);
                  }
                });
              }
            };

            // Track clicks on connection buttons
            const trackConnectionClicks = () => {
              document.addEventListener('click', (e) => {
                const target = e.target.closest('button[name="p_connection_id"]');
                if (target && target.value) {
                  console.log('Storing connection ID:', target.value);
                  localStorage.setItem(STORAGE_KEY, target.value);
                }
              }, true); // Use capture phase to catch click before navigation
            };

            // Clear saved value on Continue button click
            const clearOnContinue = () => {
              document.addEventListener('click', (e) => {
                const target = e.target.closest('button.kinde-button-variant-primary[type="submit"]');
                if (target) {
                  console.log('Clearing saved connection ID');
                  localStorage.removeItem(STORAGE_KEY);
                }
              }, true);
            };

            // Initialize
            setTimeout(() => {
              showLastUsedBadge();
              trackConnectionClicks();
              clearOnContinue();
            }, 500);
          })();
        `}} />}
      <main style={styles.loginForm} className="login-form">
        <div style={styles.logoWrapper}>
          <img style={styles.logo} src={getLogoUrl()} />
        </div>
        <div style={{ padding: "3rem" }} className="widget-container">
          <h2 style={styles.heading}>{props.heading}</h2>
          <p style={styles.description}>{props.description}</p>
          {getKindeWidget()}
        </div>
      </main>
    </>
  );
};
