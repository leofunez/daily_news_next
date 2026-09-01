// API
import fetchWebApi from "@/api/fetchWebApi";

// Styles
import styles from "./Header.module.css";

// Types
import type { JSX } from "react";

// Helpers
import getFormattedDateTimeWithWeather from "@/helpers/dateTimeWeather";

// Constants
import { LOGIN, SUBSCRIBE } from "@/constants";

// Components
import Link from "next/link";
import Logo from "@/components/ui/Logo/Logo";
import IconSearch from "@/components/icons/IconSearch";
import Navigation from "@/components/ui/Navigation/Navigation";
import NavigationBurger from "@/components/ui/NavigationBurger/NavigationBurger";
import NavigationBar from "@/components/ui/NavigationBar/NavigationBar";

export default async function Header(): Promise<JSX.Element> {
  const menuItems = await fetchWebApi.getHeaderMenu();
  const dateTimeWeather = await getFormattedDateTimeWithWeather();

  return (
    <header className={styles.container}>
      {/* Top */}
      <div className={styles.headerTop}>
        <div className={`wrapper ${styles.topWrapper}`}>
          {/* Time */}
          <p className={styles.dateTime}>
            {dateTimeWeather}
          </p>
          {/* .Time */}

          {/* Actions */}
          <div className={styles.actions}>
            <Link href={'/'}>
              {SUBSCRIBE}
            </Link>
            <Link href={'/'}>
              {LOGIN}
            </Link>
          </div>
          {/* .Actions */}
        </div>
      </div>
      {/* .Top */}

      <div className="wrapper">
        {/* Middle */}
        <div className={styles.headerMiddle}>
          <Logo size="large" />
        </div>
        {/* .Middle */}

        {/* Bottom */}
        <div className={styles.headerBottom}>
          <NavigationBurger>
            <NavigationBar />
          </NavigationBurger>

          {/* Menu */}
          <div className={styles.middleMenu}>
            <Navigation items={menuItems} />
          </div>
          {/* .Menu */}

          <Link href='/search' className={styles.search}>
            <IconSearch size={18} />
          </Link>
        </div>
        {/* .Bottom */}
      </div>
    </header>
  )
}
