# Academic Abodes

This is a frontend-only Next.js 16 app scaffolded from the Google Stitch static mockups for the Academic Abodes student housing platform.

## What is included

- Next.js 16 App Router with TypeScript
- Tailwind CSS configured with design tokens from `academic_abodes/DESIGN.md`
- Shared components for buttons, inputs, chips, cards, and top/bottom navigation
- Typed mock data in `src/types` and `src/lib/data`
- Local placeholder images in `public/images`
- Converted routes for the six mockup screens

## Routes

- `/login` — login screen
- `/signup` — signup screen
- `/dashboard` — student dashboard
- `/search` — property search and listing page
- `/properties/[id]` — property detail page
- `/landlord` — landlord dashboard

## Notes for backend integration

- The app currently uses static mock data in `src/lib/data`
- Replace mock imports with real API calls in the page components
- Example integration points:
  - `src/lib/data/properties.ts`
  - `src/lib/data/dashboard.ts`
- No backend or auth routes are implemented in this project

## Run locally

```bash
cd AFIT_STARTUP
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Helpful files

- `tailwind.config.ts` — design tokens from the source design system
- `src/app/layout.tsx` — global app shell and font imports
- `src/components` — shared UI components
- `src/app` — page routes and screen implementations
