# Personal Portfolio Client

A production-style Angular frontend for a developer portfolio, built to consume a public API and present profile + project content in a clean, resilient UI.

## Quick Start (Run First)

Prerequisite:
- Start the backend server first (`portfolio-task/server`) before running `web-client` or `admin-client`.
- Both clients depend on API endpoints from the running server.
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run `web-client`:
   ```bash
   npm run start-web
   ```
3. Open:
   - `http://localhost:4200`
4. Run `admin-client` in a second terminal:
   ```bash
   npm run start-admin
   ```
5. Open:
   - `http://localhost:4201`

Important:
- Port `4201` for `admin-client` is mandatory in this project because the npm script is intentionally configured that way (`ng serve admin-client --port 4201`).
- Do not change this port in local runs; this setup is used to avoid conflict patterns during client/backend integration and CORS behavior testing.

Admin login (current seed user):
- Email: `admin@portfolio.com`
- Password: `admin@123456`

## Mentor Note
This README is written to explain not only what I built, but why I made these implementation choices.

## Project Goal
Build a portfolio web client that:
- fetches published profile and projects from backend APIs
- presents featured work on the homepage
- supports a projects listing + project details page
- handles loading, empty, and error states clearly

## What I Built
- Angular 21 standalone app with route-based pages:
  - `/home`
  - `/projects`
  - `/projects/:slug`
  - `/about`
- Shared domain models in `projects/shared` (`Profile`, `Project`, etc.)
- HTTP services for API communication:
  - `ProfileService`
  - `ProjectsService`
- Dynamic rendering of:
  - featured projects on Home
  - full projects list on Projects page
  - full project details by slug
  - profile data on Home and About pages
- Admin client for authenticated content management (profile and projects)
- Shared package used across clients to keep contracts consistent

## Why I Built It This Way
- `standalone` components: keeps module overhead low and is aligned with modern Angular patterns.
- dedicated services for data access: keeps components focused on UI state and template logic.
- RxJS streams (`projects$`, `profile$`, `project$`) + `AsyncPipe`: avoids manual subscription cleanup and keeps data flow declarative.
- route param + `switchMap` in project details: ensures the page reacts correctly if slug changes.
- explicit error flags in each feature: allows user-friendly fallbacks instead of broken UI when backend is unavailable.
- shared model package: keeps typing consistent between clients and reduces duplicated interfaces.
- split web/admin clients: separates public browsing concerns from dashboard management concerns.

## Behavior and UX States Implemented
- loading states while requests are pending
- empty states when no published content exists
- error states when API requests fail
- fallback visuals/text when optional fields are missing (e.g., no project cover image)

## Tech Stack
- Angular 21
- TypeScript
- RxJS
- Angular Router
- Angular HttpClient
- Vitest (configured via Angular test command)

## API Assumptions

### web-client
Configured in `projects/web-client/src/environments/environment.ts`:
- `apiUrl`: `http://localhost:3000/api/v1/public`
- `baseUrl`: `http://localhost:3000/`

Expected endpoints:
- `GET /projects`
- `GET /projects/:slug`
- `GET /profile`

Headers:
- `Content-Type: application/json` (default for JSON requests)
- No `Authorization` header required for public endpoints

### admin-client
Configured in `projects/admin-client/src/environments/environment.ts`:
- `apiUrl`: `http://localhost:3000/api/v1/private/`
- `apiAuthUrl`: `http://localhost:3000/api/v1/auth`
- `baseUrl`: `http://localhost:3000/`
- `tokenKey`: `admin_token`

Expected endpoints:
- `POST /auth/login`
- `GET /private/projects`
- `GET /private/projects/:slug`
- `POST /private/projects`
- `PATCH /private/projects/:slug`
- `DELETE /private/projects/:slug`
- `GET /private/profile`
- `PATCH /private/profile`

Headers:
- `Content-Type: application/json` for JSON requests
- `Authorization: Bearer <accessToken>` for private endpoints after login
- For file upload (`FormData`) requests, browser sets `Content-Type` automatically`r`n`r`n## Test
```bash
npm test
```

## Current Gaps / Next Improvements
- add integration tests for service + template error branches
- add environment files for staging/production deployment
- add skeleton loaders for better perceived performance
- add route guards or analytics hooks if required by product scope

## Repository Structure (Relevant Parts)
- `projects/web-client/src/app/features/home`
- `projects/web-client/src/app/features/projects`
- `projects/web-client/src/app/features/about`
- `projects/web-client/src/app/services`
- `projects/admin-client/src/app/features`
- `projects/shared/src/lib/models.ts`

## Summary for Review
I built this as a monorepo Angular portfolio system with two clients and a shared model package:
- `web-client` for public portfolio presentation
- `admin-client` for managing portfolio content
- `shared` for strict and reusable types between both apps

What I focused on:
- separation of concerns (routing, data layer, UI)
- resilient UI behavior for real API failures
- maintainable and scalable structure instead of one-off page code
- explicit environment-based API configuration

Why this matters:
- it demonstrates production-ready frontend patterns (typed contracts, stream-based state, error handling)
- it is easier to extend with authentication, role-based actions, and deployment environments
- it reflects deliberate engineering choices, not only visual implementation



