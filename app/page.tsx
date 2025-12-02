import { Root } from "../kindeSrc/root";
import { DefaultLayout } from "../kindeSrc/layouts/default";
import { Widget } from "../kindeSrc/components/widget";
import type { KindePageEvent } from "@kinde/infrastructure";

// Mock event data for development
const mockEvent: KindePageEvent = {
  context: {
    widget: {
      content: {
        page_title: "Welcome to Kinde",
        heading: "Sign in to your account",
        description: "Enter your credentials to access your account",
        logo_alt: "Kinde Logo",
      },
    },
  },
  request: {
    locale: {
      isRtl: false,
      lang: "en",
    },
    authUrlParams: {
      orgCode: "org_mock",
      state: "mock-state",
      clientId: "mock-client-id",
      redirectUri: "http://localhost:3000",
    },
    route: {
      path: "auth",
      context: "sign_in",
      flow: "login",
    },
  },
};

export default function Page() {
  return (
    <Root context={mockEvent.context} request={mockEvent.request}>
      <DefaultLayout>
        <Widget
          heading={mockEvent.context.widget.content.heading}
          description={mockEvent.context.widget.content.description}
        />
      </DefaultLayout>
    </Root>
  );
}
