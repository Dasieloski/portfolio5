# Dasiel Torres — portfolio

Next.js 16 (App Router) · React 19 · TypeScript · `three` (one 3D card, lazy-loaded) · `gsap` + ScrollTrigger (scroll sequences).

Direction: white editorial canvas, black ink, one green; Fraunces (display) + Archivo (text) + Geist Mono (indices). Rhythm: open white type → black band → white case spreads → exploded 3D diagram → timeline → open white finale → black wordmark.

### The 3D card
- `components/card/` — `CardStage` (fixed canvas, loads Three.js when the browser is idle), `cardScene.ts` (scene, damped flight between slots), `shaders.ts` (iridescent foil + guilloche seal, custom GLSL), `cardTexture.ts` (artwork drawn on 2D canvases).
- Any element with `data-card` (`CardSlot`) is a slot: the card lands in its box and tilts to `data-rx/ry/rz`. Layout stays in CSS.
- Progressive enhancement: each slot contains a CSS-drawn card. No WebGL, `prefers-reduced-motion` or Save-Data keeps that one; nothing else depends on WebGL.
- Headlines use `mix-blend-mode: difference` over a real backdrop layer (`.page-backdrop`). Don't add `z-index`/`transform`/`will-change` to their ancestors: that isolates them and kills the blend.
- Scroll motion: `WordScrub`, `Anatomy` (sticky slab stack) and `Timeline` use GSAP ScrollTrigger and are inert under reduced motion.
## Run

```bash
npm install
npm run dev
```

## Structure

- `app/[lang]/` — localized routes (`/en`, `/es`), case studies at `/[lang]/work/[slug]`, per-locale Open Graph image.
- `proxy.ts` — redirects `/` and non-localized paths using `Accept-Language` (default: `en`).
- `content/` — all copy. `en.ts` and `es.ts` implement the `Dictionary` type; TypeScript flags any missing key.
- `lib/site.ts` — locales, base URL, contact links, hreflang helpers.
- `components/visuals/` — one animation per product (card request, card app, gateway, top-up, stock, schema).
- `components/` — page sections. `app/globals.css` (tokens, chrome), `hero.css`, `home.css` (intro, work, anatomy, path, contact, footer), `sections.css` (lab, case study), `visuals.css` / `products.css` (the animations).

## Editing content

- Add a case study: push a `CaseStudy` into `work.cases` in **both** dictionaries. Routes, sitemap and hreflang update on their own. Extra sections (challenges, results, learnings) are just more `{ title, body }` entries.
- Add a language: add the code to `LOCALES` in `lib/site.ts` (and `OG_LOCALE`), create `content/<code>.ts`, register it in `content/index.ts`.
- LinkedIn: set `CONTACT.linkedin` in `lib/site.ts`; it appears in Contact and in the Person schema.
