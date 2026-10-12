import Link from "next/link";
import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/site";
import Dial from "./dial/Dial";
import Magnetic from "./motion/Magnetic";
import Roll from "./Roll";

type Props = { lang: Locale; hero: Dictionary["hero"] };

export default function Hero({ lang, hero }: Props) {
  const i = (n: number) => ({ "--i": n }) as CSSProperties;
  return (
    <section className="hero" aria-labelledby="top">
      <Dial variant="hero" />
      <div className="hero-in">
        <p className="hero-role mono" style={i(0)}>
          {hero.role}
        </p>
        <h1 id="top" className="hero-title" style={i(1)}>
          <span className="sr">{`Dasiel Torres. ${hero.role}. `}</span>
          <span className="line">{hero.line1}</span>
          <span className="line">{hero.line2}</span>
        </h1>
        <p className="hero-lede" style={i(2)}>
          {hero.lede}
        </p>
        <div className="hero-cta" style={i(3)}>
          <Magnetic strength={0.18}>
            <Link className="btn btn-solid" href={`/${lang}#work`}>
              <Roll>{hero.secondary}</Roll>
              <span className="btn-ico" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <path d="M6 1.5v9M2.5 7 6 10.5 9.5 7" />
                </svg>
              </span>
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
