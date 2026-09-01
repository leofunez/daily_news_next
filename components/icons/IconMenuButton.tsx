// Type
import type { JSX } from "react";
import type { IconType } from "@/types/icon.types";

export default function IconMenuButton({ size = 20, color = "#161b25" }: IconType): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.25 5.25H20.75V6.75H3.25V5.25ZM3.25 11.25H20.75V12.75H3.25V11.25ZM3.25 17.25H20.75V18.75H3.25V17.25Z" fill={color}></path>
    </svg>
  )
}
