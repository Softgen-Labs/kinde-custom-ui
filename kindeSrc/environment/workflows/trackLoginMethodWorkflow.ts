import {
  idTokenCustomClaims,
  type WorkflowSettings,
  WorkflowTrigger,
  type onUserTokenGeneratedEvent,
} from "@kinde/infrastructure";

// This workflow adds the connectionId to tokens
// The client can then map it to friendly names like "google", "email", etc.
export const workflowSettings: WorkflowSettings = {
  id: "add_login_method_to_token",
  name: "Add Login Method to Token",
  trigger: WorkflowTrigger.UserTokenGeneration,
  bindings: {
    "kinde.idToken": {},
    "kinde.localization": {},
  },
};

/**
 * Simple approach: Add connectionId to token as-is
 * Client-side will maintain a mapping or cache of connectionId -> friendly name
 */
export default async function (event: onUserTokenGeneratedEvent) {
  try {
    console.log("=== Add Login Method to Token Workflow ===");

    const connectionId = event.context.auth.connectionId;
    const userId = event.context.user.id;

    console.log(`User: ${userId}, Connection: ${connectionId}`);

    if (!connectionId) {
      console.warn("No connectionId found");
      return;
    }

    const idToken = idTokenCustomClaims<{
      login_connection: string;
    }>();
    idToken.login_connection = connectionId;

    console.log(`✓ Added login_connection to tokens: ${connectionId}`);

  } catch (error) {
    console.error("Error in workflow:", error);
    // Don't throw - allow authentication to proceed
  }
}
