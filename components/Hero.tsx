import Link from "next/link";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/site";
import HeroTitle from "./HeroTitle";

type Props = { lang: Locale; hero: Dictionary["hero"]; layers: Dictionary["stack"]["layers"] };

export default function Hero({ lang, hero, layers }: Props) {
  return (
    <section className="hero" aria-labelledby="top">
      <p className="eyebrow">{hero.eyebrow}</p>
      <div id="top">
        <HeroTitle line1={hero.line1} line2={hero.line2} />
      </div>

      <div className="hero-grid">
        <p className="lede">{hero.lede}</p>
        <div className="hero-actions">
          <Link href={`/${lang}#contact`} className="btn btn-solid">
            {hero.primary}
          </Link>
          <Link href={`/${lang}#work`} className="btn btn-line">
            {hero.secondary}
          </Link>
        </div>
      </div>

      <div className="hero-foot">
        <p className="now">
          <span className="now-dot" aria-hidden="true" />
          <span className="mono">{hero.nowLabel}</span> {hero.now}
        </p>
        <div className="layers-strip">
          <span className="mono">{hero.layersLabel}</span>
          <ul>
            {layers.map((l) => (
              <li key={l.id}>
                <Link href={`/${lang}#layer-${l.id}`}>{l.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
