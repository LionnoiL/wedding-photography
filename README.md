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
├── img/            # images (optimized at build time)
└── public/         # static assets copied as-is
```

- **Sections** live in `src/partials/` and are injected into `index.html`:
  header, hero, about, benefits, portfolio, feedbacks, faq, contacts, footer,
  plus the `loader` and `modal` components.
- **Styles** go in `src/css/`.
- **Images** go in `src/img/` — the build optimizes them automatically.

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
