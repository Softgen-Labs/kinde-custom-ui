import {
  type WorkflowSettings,
  WorkflowTrigger,
  createKindeAPI,
  type onUserTokenGeneratedEvent,
} from "@kinde/infrastructure";

// This workflow stores the last login connection in Kinde user properties
// for long-term persistence beyond token lifetime
export const workflowSettings: WorkflowSettings = {
  id: "store_login_connection_property",
  name: "Store Login Connection as User Property",
  trigger: WorkflowTrigger.UserTokenGeneration,
  bindings: {
    "kinde.localization": {},
    "kinde.env": {},
    url: {},
  },
};

export default async function (event: onUserTokenGeneratedEvent) {
  try {
    console.log("=== Store Login Connection Property Workflow ===");

    const connectionId = event.context.auth.connectionId;
    const userId = event.context.user.id;
    const isExistingSession = event.context.auth.isExistingSession;

    console.log(`User: ${userId}, Connection: ${connectionId}, Existing Session: ${isExistingSession}`);

    if (!connectionId || !userId) {
      console.warn("Missing connectionId or userId");
      return;
    }

    // Only update on new sessions (not on token refresh)
    if (isExistingSession) {
      console.log("Existing session - skipping property update");
      return;
    }

    // Update user properties
    try {
      const kindeAPI = await createKindeAPI(event);

      console.log("Attempting to update user properties...");

      const propertiesToUpdate = {
        last_login_connection: connectionId
      };

      await kindeAPI.patch({
        endpoint: `users/${userId}/properties`,
        params: { properties: propertiesToUpdate } as any,
      });

      console.log(
        `✓ Successfully updated ${Object.keys(propertiesToUpdate).length} properties for user ${userId}`
      );
      console.log(`Connection: ${connectionId}`);
    } catch (apiError: any) {
      console.error("Failed to update user properties");
      console.error("Error message:", apiError?.message);
      // Don't throw - allow authentication to continue
    }

  } catch (error) {
    console.error("Error in Store Login Connection Property workflow:", error);
    // Don't throw - allow authentication to continue
  }
}
