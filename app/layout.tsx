import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kinde Custom UI",
  description: "Custom authentication UI for Kinde",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
