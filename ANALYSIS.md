Project analysis — Auth + entrypoint

Summary
- This document documents and analyzes the frontend authentication code and the backend entrypoint found in the workspace.
- Focus: `AuthProvider` flow, API wrappers (cookie vs token), routing guards, token usage, and the Spring Boot `ClinicApplication` entrypoint.

Frontend — overview
- Two distinct auth styles coexist:
  - Cookie-based flow (HttpOnly cookies) implemented via `fetch` calls in `frontend/src/auth/auth.api.js` (uses `credentials: 'include'`). The `AuthProvider` uses `fetchMeApi()` from this module to restore sessions.
  - Token-based flow (bearer token) implemented via `axios` in `frontend/src/api/axiosInstance.js` and `frontend/src/api/authApi.js`. Tokens are stored in localStorage via `tokenUtils.js`.
- Both flows are supported but not fully unified. This makes behavior and security assumptions inconsistent across code paths.

Per-file documentation & analysis

- `frontend/src/auth/authContext.jsx`
  - Purpose: `AuthProvider` centralizes `user`, `selectedRole`, `loading`, and exposes signup/login/logout helpers.
  - Behavior: On mount it calls `fetchMeApi()` to restore session; sets `user` when successful and navigates to role dashboard via `getDashboardPath`.
  - Notes: Designed primarily for cookie-based session restore; `persistUser` assumes API returns a `user` object. If tokens are required, `persistUser` should also call `setToken()`.
  - Risk: If backend returns token instead of relying on cookies, current code doesn't persist token automatically.

- `frontend/src/auth/auth.api.js`
  - Purpose: cookie-friendly `fetch` helpers for signup, login, fetch-me and logout.
  - Behavior: Uses `credentials: 'include'` so the browser sends/receives HttpOnly cookies. Good for security when backend sets cookie with `HttpOnly` and `Secure` flags.
  - Notes: Endpoints include `/auth/doctor/login`, `/auth/staff/login`, `/auth/admin/login` and `/auth/me`.

- `frontend/src/api/authApi.js`
  - Purpose: `axios` wrapper returning `response.data` for token-based login/profile calls.
  - Behavior: Works with `axiosInstance` which attaches `Authorization` header from `tokenUtils.getToken()`.
  - Notes: This module expects token usage; does not set cookies.

- `frontend/src/api/axiosInstance.js`
  - Purpose: Central axios instance using `VITE_API_BASE_URL` and interceptors.
  - Behavior: Adds `Authorization: Bearer <token>` if `tokenUtils.getToken()` returns a token. On 401 it clears token and redirects to `/login`.
  - Risk: Storing tokens in localStorage is vulnerable to XSS. If you need long-lived sessions, prefer cookie HttpOnly or use short-lived tokens + refresh tokens with secure storage pattern.

- `frontend/src/auth/auth.routes.js`
  - Purpose: `getDashboardPath(role)` maps `doctor`/`staff`/`admin` roles to dashboards.
  - Notes: Simple and clear.

- `frontend/src/auth/auth.storage.js`
  - Purpose: Saves `pulsecare_selected_role` in localStorage.
  - Notes: Fine for non-sensitive UI preferences.

- `frontend/src/hooks/useAuth.js`
  - Purpose: Hook to access `AuthContext` and fail fast if used outside provider.

- `frontend/src/routes/*` (AppRoutes, PublicOnlyRoute, ProtectedRoutes, RoleRoute)
  - Purpose: Route declarations and guards that use `useAuth()` to decide navigation.
  - Behavior: `PublicOnlyRoute` redirects authed users to dashboard. `ProtectedRoutes` and `RoleRoute` guard access and redirect to `/role-select` or `/unauthorized`.
  - Notes: Guards correctly check `loading` to avoid rendering during restore.

- `frontend/src/utils/tokenUtils.js`
  - Purpose: Simple localStorage helpers: `setToken`, `getToken`, `clearToken`.
  - Risk: localStorage storage means JS can read tokens; avoid if backend supports HttpOnly cookie sessions.

Backend entrypoint
- `clinic-backend/src/main/java/com/clinic/ClinicApplication.java`
  - A standard Spring Boot application main class with `@SpringBootApplication`. Nothing to change here; it's the typical entrypoint.

Key findings and recommendations

1) Choose a single auth strategy and unify
- Either adopt cookie-based sessions end-to-end (recommended for web apps using HttpOnly cookies), or adopt token-based bearer auth consistently.
- If cookie-based: remove/limit token usage and ensure `AuthProvider` handles restore and logout exclusively via cookie APIs.
- If token-based: modify `persistUser` to call `tokenUtils.setToken()` when backend returns a token and ensure `auth.api.js` is updated to not assume `credentials: 'include'` where unnecessary.

2) Improve security for token-based flow
- If tokens must be used, avoid storing access tokens in localStorage for long-lived tokens. Use short-lived access tokens + refresh tokens stored in a secure, httpOnly cookie if possible.
- Add centralized error handling and refresh logic in `axiosInstance` (e.g., refresh token on 401 once, then retry request).

3) Consistent API surface
- Consolidate API clients into a single folder with clear names: `api/cookieAuth.js` and `api/tokenAuth.js` or a single client that adapts by config.
- Keep endpoint names consistent between `auth.api.js` (cookie) and `authApi.js` (axios), or add adapter functions.

4) UX & routing
- Ensure `AppRoutes` uses `ProtectedRoutes` (or `RoleRoute`) for all private dashboards. Currently admin routes are direct; wrap them with role-protected guards.
- Add an `/unauthorized` page to explain access issues (guards redirect there already).

5) Tests & type-safety
- Add unit tests for `getDashboardPath()` and route guards.
- Consider adding TypeScript or PropTypes to components to catch API-contract mismatches early.

6) Environment and configuration
- Document required env vars: `VITE_API_BASE_URL` for frontend. Confirm backend CORS settings when using cookie-based sessions (CORS must allow credentials and sameSite/cookie configuration must match).

Quick actions I can take (choose one)
- Convert `AuthProvider` to a token-first flow (persist token via `tokenUtils.setToken`).
- Convert code to cookie-only flow: remove token usage, update `axiosInstance` usage, and ensure cookies are used everywhere.
- Wrap `AppRoutes` admin/doctor/staff routes with `ProtectedRoutes` or `RoleRoute`.

Commands — run frontend dev
```bash
cd frontend
npm install
npm run dev
```

If you want, I can now: implement one of the quick actions above, add unit tests for the auth flow, or create a migration plan to unify the auth approach. Which would you like next?