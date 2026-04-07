# microfrontend-shell

The container application for a React microfrontend ecosystem. Handles auth bootstrapping, renders the shared Header and Sidebar, and lazy-loads remote MFE apps via Webpack Module Federation.

## Prerequisites

- `mfe-dashboard` running at `http://localhost:3001`
- `mfe-job-search` running at `http://localhost:3002`
- Go backend running at `http://localhost:8080`
- All MFEs must be running before starting the shell

## Getting started

```bash
pnpm install
pnpm start   # dev server on port 3000
```

## Stack

- React 18, TypeScript, React Router v7
- Zustand, @tanstack/react-query, Axios
- Tailwind v4, Webpack Module Federation
- Webpack (config via @bka-stuff/mfe-utils)

## Notes

- Shared UI, auth, and user state come from `@bka-stuff/mfe-utils` (imported by branch)
- To add a new MFE: register the remote in `webpack.config.ts`, add a route in `src/utils/routeUtils.ts`, and declare the module in `src/types/remotes.d.ts`
