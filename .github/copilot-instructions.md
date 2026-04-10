# velvetradio

## Purpose
Web radio application with show, host, episode, and venue management. Includes a public-facing schedule/shows listing and authenticated CRUD for content managers.

## Tech Stack
- **Backend**: Laravel **11** (not 12 — do not upgrade), PHP 8.2+, Sanctum (session)
- **Frontend**: React 18, TypeScript, Inertia.js 2, Tailwind CSS 4, Radix UI, Headless UI, Vite
- **Testing**: PHPUnit 11 (`php artisan test`)
- **Storage**: MySQL, optional Redis
- **SSR Ports**: 13719 (production), 13718 (test)

## Architecture

### Controllers (`app/Http/Controllers/`)
- `ShowController` — CRUD for radio shows (authenticated)
- `VenueController` — CRUD for venues (authenticated)
- `DashboardController` — admin dashboard
- `SitemapController` — sitemap generation
- `Api/` — API endpoints
- `Auth/` — Breeze auth

### Models (`app/Models/`)
- `Show` — radio show (has one Host, has many Episodes)
- `Host` — belongs to a Show
- `Episode` — belongs to a Show
- `Venue` — event venue
- `User`

### Routes (`routes/web.php`)
**Important**: The shows and hosts list routes use **inline `DB::` queries with joins and aggregates** — this is an intentional pattern in this project for read-only aggregates, not a bug.

```php
// Public — DB:: join pattern (intentional)
GET /        → welcome page
GET /shows   → DB join: shows + hosts + episode COUNT
GET /hosts   → DB join: hosts + shows (active only)
GET /venues  → public venue listing

// Authenticated
POST/GET/PUT/DELETE /shows/{show}   (auth, verified)
POST/GET/PUT/DELETE /venues/{venue} (auth, verified)
```

### Frontend (`resources/js/`)
- Pages: `pages/` (kebab-case)
- Components: `components/`
- Layouts: `layouts/`
- Hooks: `hooks/`
- SSR entry: `ssr.tsx`

## Key Patterns
- **Laravel 11** — do not reference Laravel 12 APIs or upgrade without explicit instruction.
- `DB::` raw queries in `routes/web.php` for shows/hosts listing are intentional — do not refactor to Eloquent without instruction.
- SSR process runs on specific ports (13719 prod, 13718 test) — check `manage-ssr.sh` equivalent scripts when deploying.
- Shows are only listed when `active = true`.

## Build & Test
```bash
php artisan test
npm run build:ssr
npm run types
npm run lint
./vendor/bin/pint
```

## Notable Files
- `deploy-production.sh` — production deploy (includes SSR restart on port 13719)
- `SitemapController.php` — generates show/host/venue sitemap
