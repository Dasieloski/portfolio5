# Dasiel Torres - portfolio

Next.js 16 (App Router) · React 19 · TypeScript · Three.js (imperative, no React Three Fiber) with bloom.

Direction: **product cinema.** One dark stage and ~60 glossy tokens (ceramic white, lacquered black, signal orange) with real physics: they collide, the cursor pushes them and they spring back. As you scroll they rearrange into each part of the story. One accent colour (`#ff5a1f`) for the action, the rule each product must hold and the work I did. Geist + Geist Mono. Reference: the craft and restraint of lusion.co, not its layout.

The story, scene by scene:
1. **Counter** - a short opening counter (max ~1.5 s, skipped with reduced motion) while Three.js loads; then the tokens burst out into a pile.
2. **Hero** - the statement arrives word by word; the pile reacts to the cursor.
3. **Manifest** - tied to the scroll, the pile drops token by token into ledger columns while "Every payment is a promise. It has to arrive. Exactly once." lights up.
4. **Work** - each product is a formation: a portal a stream passes through (gateway), a phone filling up (top-ups), a card with its chip (card issuing), two balances with tokens arcing between them (transfers), a bag (e-commerce).
5. **Layers / Record** - calm beats: the stage goes dark and the reading is undisturbed.
6. **Contact** - the tokens orbit "Let's talk".

### Pieces
- `components/cinema/` - `engine.ts` (renderer, studio lights, lathe-turned token, instanced mesh, physics step, cursor push and torch light, bloom; reduced motion settles the physics off screen and draws only the result), `formations.ts` (one function per formation: target position, orientation, colour), `store.ts` (the current shot), `Director.tsx` (reads `[data-scene]` elements, writes the shot from the scroll, marks the nav chapter, reveals `[data-rv]`), `Cinema.tsx` (fixed canvas in the layout + opening counter).
- `content/stage.ts` - per product: the layers it touched (chips) and its formation.
- `components/home/` - `Hero`, `Manifest`, `Work`, `Capabilities`, `Record`, `Contact`. `components/Roll.tsx` - letters that roll on hover/focus (screen readers get the plain text).
- CSS: `base.css` (tokens, type, pills, nav, menu, counter, grain), `home.css`, `case.css`.

Layering: the canvas is opaque and fixed at z-index 0; every section is transparent and sits above it. Without WebGL the page is the same dark page with all content.

## Run

```bash
npm install
npm run dev
```

## Structure

- `app/[lang]/` - localized routes (`/en`, `/es`), case studies at `/[lang]/work/[slug]`, per-locale Open Graph image.
- `proxy.ts` - redirects `/` and non-localized paths using `Accept-Language` (default: `en`).
- `content/` - all copy. `en.ts` and `es.ts` implement the `Dictionary` type; case studies live in `cases.en.ts` / `cases.es.ts`. TypeScript flags any missing key.
- `lib/site.ts` - locales, base URL, contact links, hreflang helpers. `lib/seo.ts` - Person / WebSite JSON-LD.
- `public/` - CVs (PDF and DOCX, English and Spanish), `llms.txt`, icons.

## Editing content

- Add a case study: push a `CaseStudy` into **both** `cases.en.ts` and `cases.es.ts`, and add its entry to `CASE_STAGE` in `content/stage.ts` (layers touched and formation). Routes, sitemap and hreflang update on their own. `tier: "main"` makes it a scene on the home page; `"earlier"` lists it under "Also built".
- Add a language: add the code to `LOCALES` in `lib/site.ts` (and `OG_LOCALE`), create `content/<code>.ts`, register it in `content/index.ts`.
- LinkedIn: `CONTACT.linkedin` in `lib/site.ts`; it appears in Contact and in the Person schema (`sameAs`).
- Analytics: GA4 (`G-C008X2SEHL`, override with `NEXT_PUBLIC_GA_ID`); only loads in production. `components/Analytics.tsx` sends `contact_click` (method), `cv_download` (language) and `case_study_click` (slug). Do not also add these in GTM.
