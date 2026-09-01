// Styles
import Link from "next/link";
import styles from "./Logo.module.css";

// Constants
import { APP_TITLE } from "@/constants";

export default function Logo({ size = 'large' }:{ size: 'small' | 'mid' | 'large' }) {
  return (
    <Link href="/" className={styles.container}>
      <p className={`${styles.text} ${styles[size]}`}>
        {APP_TITLE}
      </p>
    </Link>
  )
}
