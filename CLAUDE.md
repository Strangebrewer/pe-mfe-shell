# pe-mfe-shell — Claude Context

## What This Is

The host shell. Owns the top-level layout (header, sidebar), bootstraps auth on page load, and orchestrates all six remote MFEs via Webpack Module Federation. Port: 3000.

---

## Auth Model

Auth state lives in `useUserStore` (Zustand) from `@bka-stuff/pe-mfe-utils`. Because pe-mfe-utils is a shared singleton in the Module Federation config, all remotes read the same store instance — no prop drilling or event bus needed.

**Bootstrap flow (`Shell.tsx`):**
1. Check localStorage for access/refresh tokens
2. If tokens exist, call `GET /me` to hydrate user state
3. If tokens absent or `/me` fails, clear tokens and user state
4. Set `isReady = true` after a minimum 500ms delay (`MINIMUM_LOAD_DELAY` in `src/utils/constants.ts`)

**Login** (`LoginModal.tsx`): submits credentials → `POST /login` → receives `{ user, accessToken, refreshToken }` → `authClient.setTokens()` → `setUser()`.

**Logout** (`Header.tsx`): `POST /logout` → `authClient.logout()` → `clearUser()`.

Token refresh is handled automatically by axios interceptors wired via `createAuthClient()` from pe-mfe-utils. The shell's `axiosAuth` uses `AUTH_URL` as its base — the same go-auth service handles both user API calls and token refresh.

---

## Routing

Defined in `src/utils/routeUtils.ts`, rendered in `src/BaseRouter.tsx`.

| Route | MFE | Protected |
|---|---|---|
| `/` | redirect → `/dashboard` | — |
| `/dashboard/*` | pe-mfe-dashboard | No |
| `/job-search/*` | pe-mfe-job-search | Yes |
| `/budget/*` | pe-mfe-budget | Yes |
| `/home-maintenance/*` | pe-mfe-home-maintenance | Yes |
| `/projects/*` | pe-mfe-project-mgr | Yes |
| `/recipes/*` | pe-mfe-recipes | Yes |

Protected routes use `<RequireAuth redirectUrl='/dashboard' />` from pe-mfe-utils.

**Loading strategy**: the first navigation to a route uses `lazyWithMinDelay()` (adds 500ms so the Suspense fallback is visible). Subsequent navigations use plain `React.lazy()`. `bootRoutePath` tracks which route the user first landed on to distinguish the two cases.

---

## Module Federation

Shell is the host. Each MFE is a remote loaded from the URL in its env var.

```
pe_mfe_budget           → MFE_BUDGET_URL/remoteEntry.js
pe_mfe_dashboard        → MFE_DASHBOARD_URL/remoteEntry.js
pe_mfe_job_search       → MFE_JOB_SEARCH_URL/remoteEntry.js
pe_mfe_home_maintenance → MFE_HOME_MAINTENANCE/remoteEntry.js
pe_mfe_project_mgr      → MFE_PROJECT_MGR/remoteEntry.js
pe_mfe_recipes          → MFE_RECIPES/remoteEntry.js
```

Remotes are consumed via `React.lazy(() => import('pe-mfe-<name>/App'))`. Each remote must default-export a React component.

Shared dependencies are configured via `defaultShared` from pe-mfe-utils. Never set `eager: true` on react or react-dom — it breaks Module Federation initialization.

---

## Sidebar

`src/components/Sidebar.tsx` reads `user` from `useUserStore`. The dashboard icon is always visible. All other nav links (job-search, budget, home-maintenance, recipes, projects) are conditionally rendered only when `user` is set.

---

## env vars

- `AUTH_URL` — go-auth base URL (default: `http://localhost:8080`)
- `MFE_BUDGET_URL` — budget MFE (default: `http://localhost:3001`)
- `MFE_DASHBOARD_URL` — dashboard MFE (default: `http://localhost:3002`)
- `MFE_JOB_SEARCH_URL` — job search MFE (default: `http://localhost:3003`)
- `MFE_HOME_MAINTENANCE` — home maintenance MFE (default: `http://localhost:3004`)
- `MFE_PROJECT_MGR` — project manager MFE (default: `http://localhost:3005`)
- `MFE_RECIPES` — recipes MFE (default: `http://localhost:3006`)

All injected at build time via webpack `DefinePlugin`. Must be set as GitHub Environment vars to take effect in CI builds.

---

## Local Dev

`pnpm dev` from this directory starts all seven apps concurrently (shell + all six MFEs) via `concurrently`.

---

## Tailwind
Uses `tw:` prefix (`tw:flex`, `tw:text-sm`, etc.) — required by the MFE Tailwind config.

## pe-mfe-utils
`@bka-stuff/pe-mfe-utils` is installed via `github:` URL (public tarball). Never use `pnpm link` or workspace overrides — breaks CI.
