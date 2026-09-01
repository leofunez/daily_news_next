## 1. Project Overview & Tech Stack

* **Framework:** Next.js (App Router) with TypeScript
* **Backend / API:** WordPress Headless hosted on Pantheon.io
  * **Base REST API URL:** `https://dev-today-news.pantheonsite.io/wp-json/wp/v2/`
* **Styling:** CSS Modules
* **State & Data Fetching:** Server Components + custom fetch utilities

---

## 2. Essential Commands
Always use these specific commands. Do not guess or use alternative flags.


| Action | Command |
| :--- | :--- |
| **Install Dependencies** | `pnpm install` |
| **Start Dev Server** | `pnpm dev` |
| **Run Build** | `pnpm build` |
| **Run Start** | `pnpm start` |
| **Run Linter** | `pnpm lint` |

---

## 3. Directory Structure & Key Conventions

```text
├── app/                     # Contains all Next.js App Router pages and layouts.
├── api/
│   └── fetchWebApi.ts       # All centralized API fetching methods
├── components/
│   ├── icons/               # Custom SVG icon components
│   ├── layout/              # Header, Footer, StatiPages, etc.
│   └── ui/                  # Reusable UI components
├── constants/
│   └── index.ts             # Exported application constants
├── types/
│   └── index.ts             # All shared TypeScript interfaces and types
└── app/                     # Next.js App Router pages and layouts
```

---

## 4. Coding Standards & Architectural Rules
### Code Hygiene & Magic Strings
- **No Magic Strings:** Never hardcode URLs, storage keys, configuration values, or repeating string literals directly in components or logic.
- Always import and use centralized constants exported from `@/constants/index.ts`.

### Data Fetching & Types
- **API Centralization:** All WordPress REST API requests must be implemented inside `@/api/fetchWebApi.ts`.
- **TypeScript Types:** Keep type definitions organized inside the `@/types` directory. Do not define inline types or interfaces within component files if they are reused or represent domain entities.

### Styling & CSS Modules
- Use CSS Modules (`*.module.css`) for component styling.
- Class Names / Selectors: Use camelCase for all CSS class selectors (e.g., `.menuButton`, `.isActiveContainer`, `.navigationWrapper`).
- Access class names via the imported `styles` object: `styles.menuButton`.

---

## 5. Agent Operational Guardrails
When modifying or generating code in this repository, you MUST strictly adhere to the following rules:
- **NO GIT COMMIT OR PUSH:** Do not attempt to run `git commit`, `git push`, or alter remote repository state. The developer handles all version control manually.
- **NO FILE DELETION:** Do not delete existing files, refactor files out of existence, or clear file contents unless explicitly instructed by the user.
- **ASK BEFORE CRITICAL CHANGES:** Always prompt and ask for permission before executing major structural refactors, installing new package dependencies, changing core routing, or modifying global layout files (`layout.tsx`, `globals.css`).

---

## 6. Boundaries & Strict Constraints
- **Do NOT modify:** Anything inside the `/.next` directory.
- **Secrets:** Never hardcode API keys, database URLs, or credentials. Always reference them via `process.env` if needed.
- **Packages:** Do not install new npm dependencies without explicit user confirmation.
