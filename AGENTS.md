# AGENTS.md

E-commerce monorepo: `frontend/` (React 19 + Vite + TypeScript + Tailwind) and `backend/` (Spring Boot 3.2.5, Java 17, Maven, MySQL). Two independent dev servers; no root build orchestration.

## Source of truth & workflow
- `docs/PROJECT_SPEC.md` is the Single Source of Truth; `docs/IMPLEMENTATION_TASKLIST.md` breaks it into 17 ordered use cases with acceptance criteria.
- Implement one use case fully before moving on. Do not add features absent from the spec or alter the defined architecture, DB, or API.
- Work happens on per-use-case branches named `UC##` (current: `UC08`); commit messages follow the `UC-XX` / `USECASE-XX` style.

## Commands
Frontend (`frontend/`):
- `npm run dev` — dev server on :5173
- `npm run typecheck` — `tsc --noEmit` (the verification step)
- `npm run build` — `tsc && vite build`
- No lint script and no tests.

Backend (`backend/`):
- `mvn spring-boot:run` — API on :8080, Swagger at `/swagger-ui.html`
- `mvn clean install` — build/verify
- No test sources exist (`src/test` absent).

## Gotchas
- Backend routes are at root (`/auth`, `/products`, `/cart`), NOT under `/api`. `frontend/.env.example` wrongly sets `VITE_API_BASE_URL=http://localhost:8080/api`; `src/services/apiClient.ts` correctly defaults to `http://localhost:8080`. Do not add an `/api` prefix.
- Backend `.env` / `.env.example` are NOT loaded by Spring Boot (no spring-dotenv dependency); real config lives in `backend/src/main/resources/application.properties`. Frontend `.env` IS loaded by Vite.
- MySQL is expected at `localhost:3306` with `createDatabaseIfNotExist=true`; tables are auto-created (`ddl-auto=update`). `SampleDataInitializer` seeds products and a review user `reviewer@aladin.com` / `password` on startup when the DB is empty.
- Public endpoints: `/auth/register`, `/auth/login`, `/products/**`, and swagger. Everything else (e.g. `/cart`) requires a JWT.
- Auth: token stored in `localStorage` key `token`, sent as `Authorization: Bearer`. The frontend 401 interceptor clears it and redirects to `/login`.
- CORS only allows origins `http://localhost:5173` and `http://localhost:3000`.
- UI is Tailwind-styled with an "Aladin" theme (`primary` colors in `tailwind.config.js`). During use-case implementation, code changes are annotated with `// NEW` markers.
