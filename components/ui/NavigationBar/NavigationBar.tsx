// API
import fetchWebApi from "@/api/fetchWebApi";

// Types
import type { JSX } from "react";
import type { MenuType } from "@/types/menu.types";

// Styles
import styles from "./NavigationBar.module.css";

// Components
import Link from "next/link";
import IconSocial from "@/components/icons/IconSocial";
import { MAIN_URL } from "@/constants";

export default async function NavigationBar(): Promise<JSX.Element> {
  const menuItems = await fetchWebApi.getAllCategories();
  const pagesItems = await fetchWebApi.getFooterMenu();

  return (
    <div className={styles.container}>
      <div className={styles.menuCategories}>
        {menuItems.map((item: MenuType) => (
          <Link key={item.id} href={item.slug ? `/${item.slug}` : '/'} className={styles.menuItem}>
            {item.name}
          </Link>
        ))}
      </div>

      <div className={styles.menuPages}>
        {pagesItems.map((item: MenuType) => (
          <Link key={item.title} href={item.url.replace(MAIN_URL, '')} className={styles.menuItem}>
            {item.title}
          </Link>
        ))}
      </div>

      <div className={styles.socialIcons}>
        <a href="https://www.facebook.com" title="Facebook" target="_blank">
          <IconSocial name="Facebook" size={20} />
        </a>
        <a href="https://www.x.com" title="X" target="_blank">
          <IconSocial name="Twitter" size={20} />
        </a>
        <a href="https://www.instagram.com" title="Instagram" target="_blank">
          <IconSocial name="Instagram" size={20} />
        </a>
        <a href="https://www.linkedin.com" title="LinkedIn" target="_blank">
          <IconSocial name="LinkedIn" size={16} />
        </a>
        <a href="https://www.youtube.com" title="YouTube" target="_blank">
          <IconSocial name="YouTube" size={20} />
        </a>
      </div>
    </div>
  )
}
