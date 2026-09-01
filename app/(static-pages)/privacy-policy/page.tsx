// Types
import type { JSX } from "react";

// Components
import StaticPage from "@/components/layout/StaticPage/StaticPage";

export default async function PrivacyPolicy(): Promise<JSX.Element> {
  return (
    <StaticPage slug="privacy-policy" />
  )
}
