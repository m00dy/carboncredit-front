# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (default: http://localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # ESLint (Next.js core-web-vitals + typescript configs)
pnpm test         # Vitest (single run)
```

## Architecture

This is a **Next.js 16 App Router** frontend for a carbon credit community link aggregator (Hacker News-style). It uses React 19, TypeScript, Tailwind CSS 4, and communicates with a separate Go/REST backend.

### Data flow

All backend communication goes through **`src/lib/api.ts`** — the single API client. Every call uses `apiFetch<T>()`, a thin wrapper around `fetch` that prepends the API base URL (`NEXT_PUBLIC_API_URL`, default `http://localhost:8080`), sets JSON headers, extracts error messages from error responses, and types the JSON response. Authenticated calls pass a Bearer token via `authHeaders()`.

**`src/lib/types.ts`** defines the domain types: `User`, `Post`, `Comment` (recursive with `children`), `UserProfile`, `AuthResponse`, `VoteResponse`, etc.

### Auth

**`src/components/AuthProvider.tsx`** is a React context provider that holds `user`, `token`, and `isLoading`. On mount it rehydrates from `localStorage` keys `cc_token` and `cc_user`. The `login()` / `logout()` callbacks persist to localStorage and update state. All client components consume this via the `useAuth()` hook.

### Rendering strategy (mixed)

| Route | Rendering | Notes |
|---|---|---|
| `/` (home) | Server | ISR `revalidate: 60` |
| `/new` | Server | ISR `revalidate: 30` |
| `/submit` | Client | Redirects unauthenticated users to `/login` |
| `/login`, `/register` | Client | Form components with client-side validation |
| `/post/[id]` | Client | Fetches post + comments, client-side comment/reply forms |
| `/post/[id]/layout` | Server | `generateMetadata` for OG tags |
| `/user/[username]` | Server | Profile + post list |
| `/sitemap.xml` | Server | ISR `revalidate: 300`, fetches entries from API |

### Theming

Design tokens are CSS custom properties defined in `src/app/globals.css` (`:root` for light, `[data-theme="dark"]` for dark). Tokens include `--green`, `--ink`, `--ink-secondary`, `--ink-muted`, `--surface`, `--surface-card`, `--border`. The `ThemeSwitcher` component toggles the `data-theme` attribute on `<html>` and persists the choice to `localStorage`.

Utility classes: `.btn-green` (pill button), `.btn-ghost`, `.card`, `.vote-btn`.

### Component patterns

- **VoteButton** (`src/components/VoteButton.tsx`): Upvote toggle with optimistic UI — updates score immediately, reverts on API error. Redirects to `/login` if unauthenticated.
- **CommentNode** (`src/components/CommentNode.tsx`): Recursive — renders a comment, then maps over `comment.children` rendering nested `CommentNode`s with `depth + 1` and progressive left border colors.
- **PostItem** (`src/components/PostItem.tsx`): Link posts (opens URL in new tab) vs text posts (links to `/post/[id]`). Shows domain badge, score, author, time, comment count.
- Forms (`LoginForm`, `RegisterForm`, `SubmitForm`): Self-contained client components with local error/loading state. On success they call `useAuth().login()` and `router.push()`.

### Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8080` | Backend API base URL |
| `NEXT_PUBLIC_SITE_URL` | `https://carboncredit.io` | Used for sitemap and metadata |
