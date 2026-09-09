---
name: css-modules-guidelines
description: Enforces CSS Modules standards for the Daily News project, including camelCase class naming, mobile-first responsive design, spacing tokens, and component layout patterns.
---

# CSS Skills for Daily News Project

## CSS Modules Convention

### File Naming
- `ComponentName.module.css` for each component
- Co-located with component file

### Class Naming
- **camelCase only** (e.g., `.menuButton`, `.isActiveContainer`, `.navigationWrapper`)
- No kebab-case, no BEM
- Descriptive, semantic names

### Usage in Components
```tsx
import styles from './Component.module.css';

<div className={styles.container}>
  <button className={styles.menuButton}>Menu</button>
</div>
```

### Composition
- Use `composes` for shared styles within same file
- Avoid `@extend` - prefer composition
- Global styles only in `app/globals.css`

## Layout Patterns

### Flexbox (Preferred)
```css
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.row {
  display: flex;
  justify-content: space-between;
  alignItems: center;
}
```

### Grid
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
```

## Responsive Design
- Mobile-first approach
- Use CSS custom properties for breakpoints
- Media queries in component modules

```css
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

## Spacing & Sizing
- Use `rem` for spacing, typography
- Consistent spacing scale (0.25rem, 0.5rem, 1rem, 1.5rem, 2rem)
- Avoid magic numbers - use CSS variables if needed

## Colors & Theming
- CSS custom properties in `app/globals.css`
- Semantic color names (not `blue`, `red`)
- Support for light/dark if implemented

```css
:root {
  --color-primary: #0066cc;
  --color-text: #1a1a1a;
  --color-background: #ffffff;
  --spacing-unit: 1rem;
}
```

## Typography
- System font stack preferred
- Consistent line heights
- Fluid typography with `clamp()` if needed

## Component-Specific Patterns

### Buttons
```css
.button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.2s;
  cursor: pointer;
  border: none;
}

.primary {
  background-color: var(--color-primary);
  color: white;
}

.secondary {
  background-color: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
}
```

### Cards/Containers
```css
.card {
  padding: 1.5rem;
  borde-radius: 8px;
  boxShadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: var(--color-surface);
}
```

### Icons
- SVG components in `components/icons/`
- Size controlled via CSS (width/height or font-size)
- `currentColor` for color inheritance

## Animations & Transitions
- Subtle transitions (150-300ms)
- `transition: property duration easing`
- Reduced motion support

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Common Patterns in This Codebase

### Header Layout
```css
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.navList {
  display: flex;
  gap: 2rem;
  list-style: none;
}
```

### Grid Lists (Posts)
```css
.gridList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

### Post Cards
```css
.postCard {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.postImage {
  width: 100%;
  aspect-ratio: 16/9;
  objectFit: cover;
  border-radius: 8px 8px 0 0;
}

.postContent {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
```

## What to Avoid
- ❌ Inline styles (except dynamic values)
- ❌ Global class names without scoping
- ❌ `!important` (except overrides)
- ❌ Deep nesting (>3 levels)
- ❌ Hardcoded colors/spacing
- ❌ CSS-in-JS libraries

## Key Files to Reference
- `app/globals.css` - Global styles, CSS variables
- `components/layout/Header/Header.module.css` - Header styling
- `components/sections/GridList/GridList.module.css` - Grid layout
- `components/ui/Button/Button.module.css` - Button patterns (if exists)
