# Personal Portfolio Client

A production-style Angular frontend for a developer portfolio, built to consume a public API and present profile + project content in a clean, resilient UI.

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

## Why I Built It This Way
- `standalone` components: keeps module overhead low and is aligned with modern Angular patterns.
- dedicated services for data access: keeps components focused on UI state and template logic.
- RxJS streams (`projects$`, `profile$`, `project$`) + `AsyncPipe`: avoids manual subscription cleanup and keeps data flow declarative.
- route param + `switchMap` in project details: ensures the page reacts correctly if slug changes.
- explicit error flags in each feature: allows user-friendly fallbacks instead of broken UI when backend is unavailable.
- shared model package: keeps typing consistent between clients and reduces duplicated interfaces.

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
Configured in `projects/web-client/src/environments/environment.ts`:
- `apiUrl`: `http://localhost:3000/api/v1/public`
- `baseUrl`: `http://localhost:3000/`

Expected endpoints:
- `GET /projects`
- `GET /projects/:slug`
- `GET /profile`

## Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm start
   ```
3. Open:
   - `http://localhost:4200`

## Test
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
- `projects/shared/src/lib/models.ts`

## Summary for Review
This client is intentionally structured to separate concerns (routing, data fetching, view rendering), keep type safety across app boundaries, and provide resilient user-facing states for real API conditions.
