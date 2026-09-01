// Types
import type { JSX } from "react";
import type { IconType } from "@/types/icon.types";

export default function IconTrending({ size = 24, color = "#161b25" }: IconType): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.5 7.5L13 15l-4-4-6 6M16 7h4.95v5"/>
    </svg>
  )
}
