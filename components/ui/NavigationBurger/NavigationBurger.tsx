'use client';

// Hooks & Types
import { useState, type JSX, type ReactNode } from "react";

// Styles
import styles from "./NavigationBurger.module.css";

// Components
import IconMenuButton from "@/components/icons/IconMenuButton";

export default function NavigationBurger({children}:{children: ReactNode}): JSX.Element {
  const [menuIsActive, setMenuIsActive] = useState(false);

  function handleMenu() {
    setMenuIsActive(!menuIsActive);
  }

  return (
    <div className={styles.container} onMouseLeave={() => setMenuIsActive(false)}>
      <div className={styles.menuButton} onClick={handleMenu}>
        <IconMenuButton />
      </div>

      <div className={`${styles.navigation} ${menuIsActive ? styles.isActive : ''}`}>
        {children}
      </div>
    </div>
  )
}
