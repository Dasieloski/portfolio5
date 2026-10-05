import Link from "next/link";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/site";
import StageArt from "./scene/StageArt";

/** Left: the pitch. Right: the layer stack (WebGL aligns itself to .hero-stage; the SVG is the fallback). */
export default function Hero({ lang, hero }: { lang: Locale; hero: Dictionary["hero"] }) {
  return (
    <section className="hero" aria-labelledby="top">
      <div className="hero-copy">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 id="top" className="hero-title">
          <span>{hero.line1}</span>
          <span className="hl-alt">{hero.line2}</span>
        </h1>
        <p className="lede">{hero.lede}</p>
        <div className="hero-actions">
          <Link href={`/${lang}#contact`} className="btn btn-solid">
            {hero.primary}
          </Link>
          <Link href={`/${lang}#work`} className="link-arrow">
            {hero.secondary} ↓
          </Link>
        </div>
      </div>
      <div className="stage hero-stage" data-stage="hero">
        <StageArt />
      </div>
    </section>
  );
}
