# Mahfuz Chowdhury: portfolio

Personal site for recruiters and engineers. It shows experience, projects with real product videos, architecture diagrams and live models, an open-source contribution, engineering write-ups, and a one-click CV download.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-checks, then outputs to dist/
```

## Where things live

| What | Where |
|---|---|
| All page copy (roles, projects, skills, links) | `src/data.ts` |
| Write-ups, opened at `#notes-<id>` | `src/notes.ts` |
| Architecture diagrams (640 × 340 coordinates) | `src/diagrams.ts` |
| Hero terminal output | `src/components/Terminal.tsx` |
| Hero glass readouts | `src/components/Hero.tsx` |
| Live project models | `src/components/demos/` |
| Product videos and posters | `public/media/` |
| CV download | `public/Mahfuz_Chowdhury_CV.pdf` |
| Link preview image (1200 × 630) | `public/og.png` |
| Styles | `src/styles.css` |

Videos and demos only play while on screen, and show a still for visitors who prefer reduced motion.

## Deploy

Static files only, no secrets. On Vercel: framework preset Vite, build `npm run build`, output `dist`.

After the first deploy:

1. In `index.html`, change `og:image` and `twitter:image` from `/og.png` to the full address, e.g. `https://your-domain/og.png`. LinkedIn and Slack need an absolute URL to show the preview.
2. In the Vercel project, open **Analytics** and turn it on. CV downloads are tracked as the custom event `CV download`, with where the click came from (`hero`, `nav` or `contact`).

## Stack

React 19, TypeScript and Vite, with plain CSS. Fonts are Geist and Geist Mono from Google Fonts. Analytics is Vercel Analytics.
