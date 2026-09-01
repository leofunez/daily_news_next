// Types
import type { JSX } from "react";
import type { IconType } from "@/types/icon.types";

export default function IconQute({ size = 20, color = "#161b25" }: IconType): JSX.Element {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 10.4142L2.70711 14.7071L1.29289 13.2929L5 9.58579V9L1 9V2H7V10.4142Z" fill={color}/>
      <path d="M9 9L13 9V9.58579L9.29289 13.2929L10.7071 14.7071L15 10.4142L15 2H9L9 9Z" fill={color}/>
    </svg>
  )
}
