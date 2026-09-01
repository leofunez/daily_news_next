"use client";

// Hooks
import { useRouter, useSearchParams } from "next/navigation";

// Types
import type { JSX } from "react";

// Styles
import styles from "./SearchForm.module.css";

// Constants
import { SEARCH_PLACEHOLDER } from "@/constants";
import IconSearch from "@/components/icons/IconSearch";

export default function Search(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the value form the URL to avoid to empty the input on reloading
  const currentSeachQuery = searchParams.get('s') || "";

  function handleSearch(formData: FormData) {
    const searchQuery = formData.get("search")?.toString().trim();

    if (searchQuery) {
      router.push(`/search?s=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/');
    }
  }

  return (
    <div className={styles.container}>
      <form action={handleSearch} className={styles.form} role="search">
        <input
          type="search"
          name="search"
          placeholder={SEARCH_PLACEHOLDER}
          defaultValue={currentSeachQuery}
          className={styles.input}
          required
        />

        <button type="submit" className={styles.submit}>
          <IconSearch size={18} />
        </button>
      </form>
    </div>
  )
}
