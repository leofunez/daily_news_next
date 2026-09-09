# The Daily News

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-CA4245?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![WordPress](https://img.shields.io/badge/WordPress-Headless-21759B?logo=wordpress&logoColor=white)](https://dev-today-news.pantheonsite.io/)

A news site built with **Next.js and Server-Side Rendering (SSR)** on top of the **WordPress Headless API**. WordPress (hosted on [Pantheon](https://dev-today-news.pantheonsite.io/)) acts purely as the CMS — all content (posts, categories, tags, pages, menus) is consumed at request time through the WP REST API and rendered by Next.js Server Components.

## Features

- Home page with breaking news, featured stories, horizontal lists, grids, and most-popular sections
- Category, post detail, and tag archive routes driven by WordPress content
- Live search (`/search?s=...`) against the WP API
- Favorites powered by Redux Toolkit with server lookup by post IDs
- Static info pages (Contact, Privacy Policy, Terms of Service, Terms of Sale)
- Custom styled 404 (`app/not-found.tsx`) wired into every dynamic route

## Tech Stack

| Technology      | Version | Purpose                                  |
| --------------- | ------- | ---------------------------------------- |
| Next.js         | 16.3.3  | App Router, SSR, Turbopack               |
| React           | 19.2.8  | UI + Server/Client Components            |
| TypeScript      | 5       | Strict typing (`strict: true`)           |
| Redux Toolkit   | 2.12.0  | Global state (favorites)                 |
| react-redux     | 9.3.0   | Store bindings + typed hooks             |
| CSS Modules     | —       | Scoped component styling (camelCase)     |
| next/font       | —       | Roboto, Roboto Condensed, Prata, Merriweather, Literata |
| ESLint          | 9       | Linting (`eslint-config-next`)           |

## Headless WordPress API

| Item          | Value                                                        |
| ------------- | ------------------------------------------------------------ |
| CMS / backend | WordPress on Pantheon — https://dev-today-news.pantheonsite.io/ |
| REST base URL | `https://dev-today-news.pantheonsite.io/wp-json/wp/v2/`      |
| Local proxy   | `/api/:path*` → WP REST (see `rewrites()` in `next.config.ts`) |

Endpoints consumed (centralized in `api/fetchWebApi.ts`):

| Endpoint                        | Used for                              |
| ------------------------------- | ------------------------------------- |
| `GET /posts`                    | Home lists, related posts (`_embed`)  |
| `GET /posts?slug=`              | Post detail                           |
| `GET /posts?search=`            | Search results                        |
| `GET /posts?categories=`        | Category archives                     |
| `GET /posts?tag=`               | Tag archives                          |
| `GET /categories?slug=`         | Category resolution                   |
| `GET /tags?slug=`               | Tag resolution                        |
| `GET /pages?slug=`              | Static info pages (`_embed`)          |
| `GET /menu-header`              | Header navigation                     |
| `GET /menu-footer`              | Footer / burger-menu page links       |

Remote images are allow-listed in `next.config.ts`:

```ts
images: {
  domains: ['dev-today-news.pantheonsite.io', 'secure.gravatar.com'],
}
```

## Routes

| Route                  | Source                          | Rendering              |
| ---------------------- | ------------------------------- | ---------------------- |
| `/`                    | `app/page.tsx`                  | SSR, parallel WP calls |
| `/[category]`          | `app/[category]/page.tsx`       | Dynamic, `notFound()` on unknown slug |
| `/[category]/[slug]`   | `app/[category]/[slug]/page.tsx`| Dynamic, `notFound()` on unknown slug |
| `/tag/[slug]`          | `app/tag/[slug]/page.tsx`       | Dynamic, `notFound()` on unknown slug |
| `/search?s=...`        | `app/search/page.tsx`           | Dynamic search results |
| `/favorites`           | `app/favorites/page.tsx`        | Client + Redux Toolkit |
| `/contact-us`          | `app/(static-pages)/contact-us` | Static form page       |
| `/privacy-policy`, `/terms-of-service`, `/terms-of-sale` | `app/(static-pages)/*` | WP page content via `StaticPage` |

Unknown URLs render the custom 404 page (`app/not-found.tsx`).

## Project Structure

```text
├── app/                  # Next.js App Router pages, layouts, not-found
├── api/
│   └── fetchWebApi.ts    # All centralized WordPress REST requests
├── components/
│   ├── icons/            # Custom SVG icon components
│   ├── layout/           # Header, Footer, StaticPage
│   ├── sections/         # Featured, GridList, RelatedPosts, ...
│   └── ui/               # Reusable UI components (CSS Modules)
├── constants/
│   └── index.ts          # Centralized strings and config (no magic strings)
├── types/                # Shared TypeScript interfaces (WP shapes, props)
├── redux/                # Store, typed hooks, slices, WP API layer
├── helpers/              # Fetch/shape/format utilities
└── public/               # Static assets
```

## Getting Started

Requirements: **Node.js >= 20.9** and `pnpm`.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Scripts

| Command      | Action                        |
| ------------ | ----------------------------- |
| `pnpm dev`   | Start the dev server (Turbopack) |
| `pnpm build` | Production build              |
| `pnpm start` | Run the production build      |
| `pnpm lint`  | Run ESLint                    |

## Deploy on Vercel

The easiest way to deploy is the [Vercel Platform](https://vercel.com/new) from the creators of Next.js. See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.

## Credits

Built with Next.js and ❤ by [Leonardo Funez](https://leofunez.dev). Content served headlessly by WordPress on Pantheon.

## Preview

Home page: breaking-news ticker, featured stories, post grids, Most Popular rail, and footer.

<img src="public/daily_news_home.jpg" alt="The Daily News home page" width="720">
