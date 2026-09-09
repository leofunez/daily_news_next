// React
import { Suspense } from "react";

// Types
import type { JSX } from "react";

// Components
import Link from "next/link";
import SearchForm from "@/components/ui/SearchForm/SearchForm";
import SectionTitle from "@/components/ui/SectionTitle/SectionTitle";

// Constants
import { HOME, SEARCH, NOT_FOUND, NOT_FOUND_TEXT } from "@/constants";

export default function NotFound(): JSX.Element {
  return (
    <main>
      <div className="wrapper page-wrapper">
        <div className="not-found-container">
          <SectionTitle text={NOT_FOUND} />

          <p className="not-found-message">
            {NOT_FOUND_TEXT}
          </p>

          <div className="buttons">
            <Link href="/" className="button">
              <span className="icon">←</span>
              Back to {HOME}
            </Link>
            <Link href="/search" className="button secondary">
              {SEARCH} Articles
            </Link>
          </div>

          <div className="not-found-search">
            <Suspense>
              <SearchForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
