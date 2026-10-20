# Dasiel Torres — portfolio

Next.js 16 (App Router) · React 19 · TypeScript · `gsap` + ScrollTrigger for scroll sequences. The only WebGL is one hand-written fragment shader (no 3D library).

Direction: a precision instrument. Cold graphite and silver, one signal colour (vermilion) used only where something is "live". Instrument Sans + Geist Mono. Dark sheets (hero, work, close) alternate with light ones (profile, practice, path); each sheet slides over the previous one.

### Pieces
- `components/dial/` - the engine-turned dial. `shader.ts` (GLSL: concentric ridges lit by a conic highlight, minute track, a hand tied to scroll), `scene.ts` (raw WebGL2, renders only while something changes, stops when the hero is covered), `Dial.tsx` (lazy mount, CSS twin `.dial-fb` as the fallback for no WebGL / Save-Data; reduced motion gets a still frame).
- `components/Chapter.tsx` + `components/diagrams/Diagram.tsx` + `content/diagrams.ts` - each project as a schematic of the rule it must hold, advanced step by step by scroll (ScrollTrigger) or by the rail buttons. Structure is language neutral; the words only restate what the case studies already say. There are no product screenshots in the repo, so nothing pretends to be product UI. Add a real screenshot by placing it next to the plate in `Chapter`.
- `components/Practice.tsx` (accordion), `Path.tsx` (ledger), `Contact.tsx` (dial returns), `Nav.tsx` (floating pill, scroll ring, full-screen menu on mobile).
- CSS: `base.css` (tokens, buttons, nav), `hero.css`, `sections.css`, `diagrams.css`, `case.css`.

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

## Editing content

- Add a case study: push a `CaseStudy` into `work.cases` in **both** dictionaries. Routes, sitemap and hreflang update on their own. Extra sections (challenges, results, learnings) are just more `{ title, body }` entries. Its schematic lives in `content/diagrams.ts` (structure in `DIAGRAMS`, words in the `en` / `es` tables).
- Add a language: add the code to `LOCALES` in `lib/site.ts` (and `OG_LOCALE`), create `content/<code>.ts`, register it in `content/index.ts`.
- LinkedIn: `CONTACT.linkedin` in `lib/site.ts`; it appears in Contact and in the Person schema (`sameAs`).
- Analytics: GA4 (`G-C008X2SEHL`, override with `NEXT_PUBLIC_GA_ID`); only loads in production. `components/Analytics.tsx` sends `contact_click` (method), `cv_download` (language) and `case_study_click` (slug). Do not also add these in GTM.
