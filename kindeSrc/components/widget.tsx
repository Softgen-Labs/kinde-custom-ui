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
    minWidth: "400px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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
            // Parse cookies
            const cookies = document.cookie.split(';').reduce((acc, cookie) => {
              const [key, value] = cookie.trim().split('=');
              if (key) acc[key] = decodeURIComponent(value);
              return acc;
            }, {});

            console.log('Last login method:', cookies['last_login_method'] || 'Not found');

            if (cookies['last_login_method']) {
              const lastLoginMethod = cookies['last_login_method'].toLowerCase();

              const addLabelToButton = (button) => {
                if (!button.querySelector('.last-used-label')) {
                  button.classList.add('last-login-method');
                  button.style.position = 'relative';

                  const label = document.createElement('div');
                  label.className = 'last-used-label';
                  label.textContent = 'Last used';
                  label.style.cssText = 'position: absolute; top: -16px; right: 0; font-size: 10px; font-weight: 600; color: ${kindeVariables.buttonPrimaryBackgroundColor};';
                  // label.style.cssText = 'position: absolute; top: -8px; right: -8px; font-size: 11px; font-weight: 500; color: ${kindeVariables.buttonPrimaryBackgroundColor}; background: white; padding: 2px 5px; border-radius: ${kindeVariables.buttonSecondaryBorderRadius}; border: 1px solid ${kindeVariables.buttonPrimaryBackgroundColor};';

                  button.appendChild(label);
                }
              };

              const updateButtons = () => {
                if (lastLoginMethod !== 'email') {
                  const buttons = document.querySelectorAll('button');
                  buttons.forEach(button => {
                    const buttonText = button.textContent?.toLowerCase() || '';
                    if (buttonText.includes(lastLoginMethod)) {
                      addLabelToButton(button);
                    }
                  });
                }
              };

              setTimeout(updateButtons, 500);
            }
          })();
        `}} />}
      <main style={styles.loginForm} className="login-form">
        <div style={styles.logoWrapper}>
          <img style={styles.logo} src={getLogoUrl()} />
        </div>
        <div style={{ padding: "3rem" }}>
          <h2 style={styles.heading}>{props.heading}</h2>
          <p style={styles.description}>{props.description}</p>
          {getKindeWidget()}
        </div>
      </main>
    </>
  );
};
