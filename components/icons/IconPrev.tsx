// Types
import type { JSX } from "react";
import type { IconType } from "@/types/icon.types";

export default function IconPrev({ size = 20, color = "#161b25" }: IconType): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6 12H18M6 12L11 7M6 12L11 17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
