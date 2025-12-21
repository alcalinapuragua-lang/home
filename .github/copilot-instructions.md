# Copilot / Agent Instructions — Alcalina Pura (Simulador Purific)

Purpose
- Quickly orient AI coding agents to this small React + Vite SPA so they can make safe, correct changes.

Quick start (dev)
- Install: `npm install`
- Add env: set `GEMINI_API_KEY` in `.env.local` (used by `vite.config.ts`).
- Run dev server: `npm run dev` (Vite serves on port 3000, host 0.0.0.0 by default).

Project overview (big picture)
- Single-page React app built with Vite. Entry points: `index.tsx` -> mounts `App.tsx`.
- `App.tsx` holds the canonical application state (purifiers, refills, role, login) and persists it to `localStorage` under keys `purifiers` and `refills`.
- UI is split into small presentational/controlled components under `components/`:
  - `Simulator.tsx`: consumer-facing calculator logic (heavy useMemo for calculations).
  - `ManagerDashboard.tsx`: CRUD for `purifiers` and `refills`; receives setters from `App.tsx`.
  - `Login.tsx`: simple admin password check (password is hardcoded: `Parati1997`).

Key files to inspect for any change
- `App.tsx` — application state, localStorage persistence, routing between Manager/Client flows.
- `types.ts` — canonical `Purifier`, `Refill`, and `UserRole` shapes. Update here when changing data shapes.
- `components/*` — UI and behavior. Follow the existing pattern of receiving state + setters from `App.tsx`.
- `vite.config.ts` — defines alias `@` => repo root, and maps `GEMINI_API_KEY` into `process.env` via `define`.
- `index.html` — loads Tailwind CSS via CDN and uses an importmap that can affect module resolution during testing/preview.

Patterns & conventions (project-specific)
- State lifting: keep application state in `App.tsx`. Components expect props and, when applicable, React dispatcher setters (e.g. `setPurifiers: React.Dispatch<...>`).
- Persistence: `purifiers` and `refills` are saved to `localStorage` inside `App.tsx` `useEffect` hooks — keep key names consistent.
- Data shape changes: always update `types.ts` first, then update all components that rely on those types.
- Admin flow: manager access gating uses a simple password in `components/Login.tsx`; be cautious when modifying authentication logic (it's intentionally minimal and insecure).
- Styling: components use Tailwind utility classes. `index.html` includes Tailwind via CDN (`<script src="https://cdn.tailwindcss.com"></script>`). Do not assume a Tailwind build step.

Tooling / scripts
- `npm run dev` — start Vite dev server (uses `index.html` importmap by default).
- `npm run build` and `npm run preview` — standard Vite build/preview commands.

External integrations and gotchas
- Environment: `vite.config.ts` expects `GEMINI_API_KEY` and maps it to `process.env.GEMINI_API_KEY`. Ensure `.env.local` exists when running locally.
- Module resolution: `index.html` includes an importmap pointing some React imports to `https://esm.sh`. The project also lists `react` and `react-dom` in `package.json`. For reliable local development, prefer `npm install` and the local `node_modules` resolution — but be aware the importmap can override behavior in the browser during prototype testing.

Testing & CI
- No test framework or CI config is present in the repository. Keep changes small and run the app locally to validate UI flows.

Small change checklist for agents
1. Update `types.ts` before changing component props.
2. Update `App.tsx` state initialization (it reads defaults from `localStorage`), and migrate or seed default values there if needed.
3. If adding env variables, also add mapping in `vite.config.ts` under `define`.
4. Run `npm run dev` and validate the Manager and Simulator flows, and the localStorage persistence.
5. When touching authentication, flag that the login uses a hardcoded password in `components/Login.tsx`.

Notes and security
- The admin password is hardcoded (`Parati1997`) in `components/Login.tsx` — treat as insecure test-only behavior. Avoid committing secrets.

If something here is ambiguous or you want me to include usage examples for a specific change (e.g., adding a new field to `Purifier`), tell me which file to modify and I'll update the doc and propose a small patch.
