// Types
import type { JSX } from "react";
import type { IconType } from "@/types/icon.types";

export default function IconNext({ size = 20, color = "#161b25" }: IconType): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
