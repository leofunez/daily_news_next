// API
import fetchWebApi from "@/api/fetchWebApi";

// Types
import type { JSX } from "react";

// Styles
import styles from "./Footer.module.css";

// Components
import Logo from "@/components/ui/Logo/Logo";
import Divider from "@/components/ui/Divider/Divider";
import IconSocial from "@/components/icons/IconSocial";

// Constants
import Navigation from "@/components/ui/Navigation/Navigation";

export default async function Footer(): Promise<JSX.Element> {
  const menuItems = await fetchWebApi.getHeaderMenu();
  const pagesItems = await fetchWebApi.getFooterMenu();

  return (
    <>
      <footer className={styles.container}>
        <Divider />
        <div className={`wrapper ${styles.wrapper}`}>

          <Logo size="mid" />

          {/* Navigations */}
          <div className={styles.navigations}>
            <div className={styles.navigationsMain}>
              <Navigation items={menuItems} />
            </div>

            <Navigation items={pagesItems} isSmall={true} />
          </div>
          {/* .Navigations */}

          <div className={styles.social}>
            <a href="https://www.facebook.com" title="Facebook" target="_blank">
              <IconSocial name='Facebook' size={24} />
            </a>
            <a href="https://www.x.com" title="X" target="_blank">
              <IconSocial name='Twitter' size={30} />
            </a>
            <a href="https://www.instagram.com" title="Instagram" target="_blank">
              <IconSocial name='Instagram' size={30} />
            </a>
            <a href="https://www.linkedin.com" title="LinkedIn" target="_blank">
              <IconSocial name='LinkedIn' size={24} />
            </a>
            <a href="https://www.youtube.com" title="YouTube" target="_blank">
              <IconSocial name='YouTube' size={30} />
            </a>
          </div>

          <p className={styles.copy}>
            Built on <a href="https://nextjs.org/" target="_blank">Next.js</a> with ❤ by <a target="_blank" href="https://leofunez.dev">Leonardo Funez</a>
          </p>
        </div>
      </footer>
    </>
  )

}
