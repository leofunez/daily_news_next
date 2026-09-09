---
name: react-nextjs-standards
description: Architecture rules and component patterns for the Daily News Next.js App Router project, covering Server/Client Component boundaries, Redux Toolkit state, centralized API usage, and CSS Modules integration.
---

# React Skills for Daily News Project

## Project-Specific React Patterns

### Component Structure
- Use **Server Components** by default (Next.js App Router)
- Client Components only when needed (`"use client"` directive)
- Components organized in:
  - `components/layout/` - Header, Footer, StaticPage
  - `components/ui/` - Reusable UI components
  - `components/icons/` - Custom SVG icons
  - `components/sections/` - Page sections (Featured, GridList, etc.)

### TypeScript Integration
- All components use TypeScript (`.tsx` extension)
- Import types from `@/types/` directory
- Define component props interfaces in the same file or shared types

### Data Fetching
- **Never fetch directly in components**
- Use centralized API in `@/api/fetchWebApi.ts`
- Server Components fetch data directly via async/await
- Client Components receive data as props

### State Management
- Redux Toolkit for global state (favorites, etc.)
- Redux hooks from `redux/hooks.ts` (`useAppDispatch`, `useAppSelector`)
- Local state with `useState`/`useReducer` only when necessary

### Constants & Configuration
- **No magic strings** - import from `@/constants/index.ts`
- API base URL, endpoints, config values centralized

### Styling
- CSS Modules only (`*.module.css`)
- Import styles: `import styles from './Component.module.css'`
- Use `styles.className` in JSX
- Class names in camelCase (e.g., `menuButton`, `isActiveContainer`)

### Component Naming Conventions
- PascalCase for component files and exports
- Descriptive names matching directory structure
- Icons prefixed with `Icon` (e.g., `IconMenuButton`, `IconSearch`)

### Performance Patterns
- Use `next/image` for images
- Leverage Next.js caching (Server Components)
- Memoize expensive computations with `useMemo`/`useCallback`

### Error Handling
- Use try/catch in async Server Components
- Return error UI or throw for error boundaries
- Client Components: use React Error Boundaries

### Accessibility
- Semantic HTML elements
- Proper ARIA attributes
- Keyboard navigation support
- Alt text for images

### Common Patterns in This Codebase

```tsx
// Server Component with data fetching
import { fetchPosts } from '@/api/fetchWebApi';
import { Post } from '@/types/post.types';

export default async function PostsList() {
  const posts = await fetchPosts();
  return <GridList posts={posts} />;
}

// Client Component with Redux
"use client";
import { useAppSelector } from '@/redux/hooks';
import { selectFavorites } from '@/redux/slices/favoritesSlice';

export function FavoritesButton({ postId }: { postId: number }) {
  const favorites = useAppSelector(selectFavorites);
  const isFavorite = favorites.includes(postId);
  // ...
}
```

## Key Files to Reference
- `app/layout.tsx` - Root layout
- `components/layout/Header/Header.tsx` - Header example
- `components/ui/PostAction/PostAction.tsx` - Client component with Redux
- `api/fetchWebApi.ts` - Centralized API
- `constants/index.ts` - Application constants
