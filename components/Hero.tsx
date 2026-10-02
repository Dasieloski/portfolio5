import Link from "next/link";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/site";

/**
 * One idea: a blue disc that grows until it becomes the next section (see .hero in globals.css).
 * The text stays small and quiet around it.
 */
export default function Hero({ lang, hero }: { lang: Locale; hero: Dictionary["hero"] }) {
  return (
    <section className="hero" aria-labelledby="top">
      <div className="hero-sticky">
        <div className="hero-disc" aria-hidden="true" />
        <div className="hero-text">
          <p className="label">{hero.eyebrow}</p>
          <h1 id="top" className="hero-title">
            {hero.line1} <span>{hero.line2}</span>
          </h1>
          <p className="lede">{hero.lede}</p>
          <div className="hero-actions">
            <Link href={`/${lang}#contact`} className="btn btn-blue">
              {hero.primary}
            </Link>
            <Link href={`/${lang}#work`} className="link-arrow">
              {hero.secondary} ↓
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
