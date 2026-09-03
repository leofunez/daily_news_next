// Types
import type { Metadata } from "next";
import type { ReactNode } from "react";

// Provider
import { Providers } from "@/redux/providers";

// Fonts
import { Roboto, Roboto_Condensed, Prata, Merriweather, Literata } from "next/font/google";

// Styles
import "./globals.css";

// Components
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

// Constants
import { APP_TITLE, APP_DESCRIPTION } from "@/constants";

const robotoFont = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const robotoCondensedFont = Roboto_Condensed({
  variable: "--font-roboto-condensed",
  subsets: ["latin"],
});

const prataFont = Prata({
  variable: "--font-prata",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const merriweatherFont = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  display: "swap",
});

const literataFont = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.png",
      apple: "/favicon.png",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`
      ${robotoFont.variable}
      ${robotoCondensedFont.variable}
      ${prataFont.variable}
      ${merriweatherFont.variable}
      ${literataFont.variable}
    `}>
      <body>
        <Providers>
          <Header />
            {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
