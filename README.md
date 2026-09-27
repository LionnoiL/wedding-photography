# Wedding Photography

🇬🇧 English · [🇺🇦 Українська](./README.uk.md)

A responsive landing page for a wedding photographer. Team educational project
built during the GoIT course.

**Live demo:** https://LionnoiL.github.io/wedding-photography/

## Tech stack

- [Vite](https://vitejs.dev/) — build tool and dev server
- Vanilla HTML / CSS / JavaScript (ES modules)
- [modern-normalize](https://github.com/sindresorhus/modern-normalize) — CSS reset
- [vite-plugin-html-inject](https://www.npmjs.com/package/vite-plugin-html-inject)
  — splits the page into HTML partials
- [postcss-sort-media-queries](https://www.npmjs.com/package/postcss-sort-media-queries)
  — mobile-first media query sorting
- [Swiper](https://swiperjs.com/) — feedbacks slider
- [accordion-js](https://github.com/michu2k/Accordion) — FAQ accordion
- [axios](https://axios-http.com/) — API requests
- [iziToast](https://izitoast.marcelodolza.com/) — toast notifications

## Features

- **Fully responsive, mobile-first** layout across three breakpoints.
- **Feedbacks slider** (Swiper) with keyboard control and accessibility labels;
  data is fetched from the API.
- **FAQ accordion** (accordion-js) with animated height transitions.
- **Contact form** with client-side validation, API submission (axios) and
  toast feedback (iziToast).
- **Modal window**, **scroll-to-top button** and a page **loader**.

## Performance & optimizations

- **Non-render-blocking fonts** — Google Fonts are loaded with
  `rel="preload" as="style"` + an `onload` swap and a `<noscript>` fallback, so
  they no longer block the first paint.
- **Optimized LCP** — the hero background (the LCP element) is preloaded with
  `fetchpriority="high"`. One `<link>` fires per breakpoint × pixel density, with
  `media` conditions that mirror `hero.css`, so the browser downloads exactly one
  image — no double fetch.
- **Retina images** — hero and content images ship `1x`/`2x` WebP variants.
- **Lazy, non-blocking Swiper CSS** — the slider's stylesheets are imported
  dynamically only after the feedbacks data arrives, keeping them off the
  critical path.
- **Code splitting** — third-party JS is bundled into a separate `vendor` chunk
  via Vite's `manualChunks`.
- Result: **~98 mobile Performance** in Lighthouse on the production build.

## Getting started

1. Install an LTS version of [Node.js](https://nodejs.org/en/).
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server (with hot reload):
   ```bash
   npm run dev
   ```
   Open http://localhost:5173 — the page reloads automatically on save.

## Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the development server                 |
| `npm run build`   | Build the production bundle into `dist/`     |
| `npm run preview` | Preview the production build locally         |

## Project structure

```
src/
├── index.html      # entry point, imports the partials
├── main.js         # JavaScript entry point
├── partials/       # section markup (injected into index.html)
├── css/            # styles
├── img/            # images bundled & hashed by Vite
└── public/         # static assets served as-is (favicon, hero images)
```

- **Sections** live in `src/partials/` and are injected into `index.html`:
  header, hero, about, benefits, portfolio, feedbacks, faq, contacts, footer,
  plus the `loader`, `modal` and `scroll-up` components.
- **Styles** go in `src/css/`.
- **Images** go in `src/img/` (bundled and hashed by Vite). Hero background
  images live in `src/public/img/hero/` so their URLs stay stable and can be
  referenced by `<link rel="preload">` in `index.html`.

## Responsive breakpoints

Mobile-first layout with three breakpoints:

- **320px** — mobile
- **768px** — tablet
- **1440px** — desktop

## Workflow

- Tasks are tracked as GitHub Issues on the
  [project board](https://github.com/users/LionnoiL/projects/2) — one issue per
  section/component.
- Take an issue, create a branch, open a Pull Request and link it to the issue.
- On merge into `main`, GitHub Actions (`.github/workflows/deploy.yml`) lints,
  builds and deploys the project to the `gh-pages` branch.

## Deployment

Deployment is automatic. Every push to `main` triggers the GitHub Action that
builds the project and publishes it to GitHub Pages. If the live page is blank,
check the browser console for 404s on CSS/JS — usually caused by a wrong
`--base` flag in the `build` script (must match the repository name).

## Team

GoIT course team project. See the contributors on the repository's
[Contributors](https://github.com/LionnoiL/wedding-photography/graphs/contributors)
page.
