---
name: typescript-strict-standards
description: Enforces TypeScript type safety and domain type contracts for the Daily News project, including WordPress API response mapping (PostResponseType vs PostType), Redux Toolkit typed hooks, and strict type assertion rules.
---

# TypeScript Skills for Daily News Project

## Type Organization

### Directory Structure
```
types/
├── index.ts           # Barrel export (if used)
├── post.types.ts      # Post-related types
├── author.types.ts    # Author types
├── tag.types.ts       # Tag types
├── page.types.ts      # Page types
├── menu.types.ts      # Navigation menu types
├── icon.types.ts      # Icon component props
└── social.types.ts    # Social media types
```

### Import Convention
```ts
// Preferred: direct imports from type files
import { Post } from '@/types/post.types';
import { Author } from '@/types/author.types';

// Or barrel export if configured
import { Post, Author } from '@/types';
```

## Type Definitions

### WordPress API Types
- Match WP REST API v2 response structure
- Use `interface` for object shapes
- Include only needed fields
- Handle optional fields with `?`

```ts
// types/post.types.ts
export interface Post {
  id: number;
  date: string;
  date_gmt: string;
  guid: { rendered: string };
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'draft' | 'private';
  type: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string; protected: boolean };
  excerpt: { rendered: string; protected: boolean };
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: Record<string, unknown>;
  categories: number[];
  tags: number[];
  _links: Record<string, Array<{ href: string }>>;
}
```

### Component Props Types
- Define inline for simple components
- Extract to types file if reused

```ts
// In component file
interface PostCardProps {
  post: Post;
  variant?: 'default' | 'compact';
  showAuthor?: boolean;
}
```

### Utility Types
```ts
// Common patterns
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// API response wrapper
interface ApiResponse<T> {
  data: T;
  headers: Headers;
  status: number;
}
```

## TypeScript Configuration

### tsconfig.json Key Settings
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Strict Mode Enabled
- `strict: true` - all strict checks
- No `any` types (use `unknown` instead)
- Explicit return types for public APIs

## Type Safety Patterns

### API Fetching
```ts
// api/fetchWebApi.ts
async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(`${API_URL}/posts`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json() as Promise<Post[]>;
}
```

### Redux Typing
```ts
// redux/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### Event Handlers
```ts
// Proper typing for events
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  event.preventDefault();
  // ...
};

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value;
  // ...
};
```

### Async Server Components
```ts
// Explicit return types for async components
async function getPosts(): Promise<Post[]> {
  const data = await fetchPosts();
  return data;
}

export default async function PostsPage() {
  const posts = await getPosts();
  return <GridList posts={posts} />;
}
```

## Common Patterns in This Codebase

### Post Shaping/Transformation
```ts
// helpers/postsShaper.ts
import { Post } from '@/types/post.types';

export function shapePost(rawPost: RawPost): Post {
  return {
    id: rawPost.id,
    title: rawPost.title.rendered,
    content: rawPost.content.rendered,
    excerpt: rawPost.excerpt.rendered,
    date: rawPost.date,
    author: rawPost.author,
    featuredMedia: rawPost.featured_media,
    categories: rawPost.categories,
    tags: rawPost.tags,
    slug: rawPost.slug,
    link: rawPost.link,
  };
}
```

### Type Guards
```ts
// Type narrowing for WP data
function isPublishedPost(post: Post): post is Post & { status: 'publish' } {
  return post.status === 'publish';
}
```

### Generic Components
```ts
// Reusable list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
```

## What to Avoid
- ❌ `any` type (use `unknown` or proper types)
- ❌ Inline types for reusable domain entities
- ❌ Type assertions without validation (`as Type`)
- ❌ Non-null assertions (`!`) without checks
- ❌ Mutating typed objects (use immutable patterns)
- ❌ Ignoring strict null checks

## Key Files to Reference
- `types/post.types.ts` - Core domain type
- `api/fetchWebApi.ts` - Typed API functions
- `redux/store.ts` - Redux typing setup
- `helpers/postsShaper.ts` - Type transformation
- `tsconfig.json` - Compiler configuration
