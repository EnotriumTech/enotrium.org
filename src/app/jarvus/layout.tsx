import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Agents",
};

export default function JarvusLayout({ children }: { children: ReactNode }) {
  return children;
}
