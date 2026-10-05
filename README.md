# Dasiel Torres — portfolio

Next.js 16 (App Router) · React 19 · TypeScript. No runtime dependencies beyond Next and React: everything visual is CSS and SVG.

Direction: Swiss editorial — bone paper, black ink, one green; Fraunces (display) + Archivo (everything else).
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
- `components/` — page sections. `app/globals.css` (tokens, chrome), `hero.css`, `sections.css`, `visuals.css` / `products.css` (the animations).

## Editing content

- Add a case study: push a `CaseStudy` into `work.cases` in **both** dictionaries. Routes, sitemap and hreflang update on their own. Extra sections (challenges, results, learnings) are just more `{ title, body }` entries.
- Add a language: add the code to `LOCALES` in `lib/site.ts` (and `OG_LOCALE`), create `content/<code>.ts`, register it in `content/index.ts`.
- LinkedIn: set `CONTACT.linkedin` in `lib/site.ts`; it appears in Contact and in the Person schema.
