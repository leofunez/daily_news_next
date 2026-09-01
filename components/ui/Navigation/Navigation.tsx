"use client";

// Hooks
import { usePathname } from "next/navigation";

// Types
import type { JSX } from "react";
import type { MenuType } from "@/types/menu.types";

// Styles
import styles from "./Navigation.module.css";

// Components
import Link from "next/link";

// Constants
import { MAIN_URL } from "@/constants";

export default function Navigation({ isSmall, items }: { isSmall?: boolean, items: MenuType[] }): JSX.Element {
  const pathname = usePathname();

  return (
    <nav className={styles.menu}>
      {items.map((item: MenuType) => {
        const pathForHref = item.url.replace(`${MAIN_URL}`, "").replace("/category/", "");
        const pathToValidate = pathForHref.replaceAll("/", "");
        const pathNameWord = pathname?.split('/')?.[1];
        const isActive = pathToValidate === pathNameWord;

        return (
          <Link
            key={item.title}
            className={`
              ${styles.menuItem} ${isActive ? styles.isActive : ''}
              ${isSmall ? styles.isSmall : ''}
            `}
            href={pathForHref}
          >
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
