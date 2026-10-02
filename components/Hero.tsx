import Link from "next/link";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/site";
import HeroTitle from "./HeroTitle";
import Magnetic from "./Magnetic";
import StageArt from "./scene/StageArt";

type Props = { lang: Locale; hero: Dictionary["hero"]; layers: Dictionary["stack"]["layers"]; hint: string };

export default function Hero({ lang, hero, layers, hint }: Props) {
  return (
    <section className="hero" aria-labelledby="top">
      <div className="hero-grid-bg" aria-hidden="true">
        <i className="mono" style={{ left: "var(--gutter)", top: "5.5rem" }}>X 000 · Y 000</i>
        <i className="mono" style={{ right: "var(--gutter)", top: "5.5rem" }}>N 23.11° · W 82.36°</i>
      </div>

      <p className="eyebrow">{hero.eyebrow}</p>

      {/* The WebGL stack aligns itself to this box (see components/scene). The SVG is the fallback. */}
      <div className="stage hero-stage" data-stage="hero">
        <StageArt />
      </div>

      <div className="hero-copy">
        <div id="top">
          <HeroTitle line1={hero.line1} line2={hero.line2} />
        </div>
        <div className="hero-row">
          <p className="lede">{hero.lede}</p>
          <div className="hero-actions">
            <Magnetic>
              <Link href={`/${lang}#contact`} className="btn btn-solid">
                {hero.primary}
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href={`/${lang}#work`} className="btn btn-line">
                {hero.secondary}
              </Link>
            </Magnetic>
          </div>
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
        <span className="mono scroll-hint">{hint} ↓</span>
      </div>
    </section>
  );
}
