# Dasiel Torres — portfolio

Next.js 16 (App Router) · React 19 · TypeScript. Extra runtime deps: `three` (the 3D layer stack, loaded lazily and only when WebGL is available and motion is allowed) and `lenis` (inertial scroll on mouse devices). Everything else is CSS and SVG.

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
- `components/scene/` — the WebGL stack. It aligns itself to any `[data-stage]` element, so layout (desktop/mobile) stays in CSS; `StageArt` is the SVG fallback.
- `components/visuals/` — interactive project illustrations (payment flow, availability, stock, schema).
- `components/` — page sections. `app/globals.css` (tokens, chrome, hero) and `app/sections.css` (sections).

## Editing content

- Add a case study: push a `CaseStudy` into `work.cases` in **both** dictionaries. Routes, sitemap and hreflang update on their own. Extra sections (challenges, results, learnings) are just more `{ title, body }` entries.
- Add a language: add the code to `LOCALES` in `lib/site.ts` (and `OG_LOCALE`), create `content/<code>.ts`, register it in `content/index.ts`.
- LinkedIn: set `CONTACT.linkedin` in `lib/site.ts`; it appears in Contact and in the Person schema.
