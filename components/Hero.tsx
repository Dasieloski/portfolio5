import Link from "next/link";
import { Fragment, type CSSProperties } from "react";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/site";
import CardSlot from "./card/CardSlot";
import Magnetic from "./motion/Magnetic";
import Roll from "./Roll";

type Props = { lang: Locale; hero: Dictionary["hero"]; status: string; cardName: string; since: string };

/** The headline is set per line: each line's size is derived from its length so it always fills the width and never overflows. */
export default function Hero({ lang, hero, status, cardName, since }: Props) {
  const plain = hero.line1.split(" ");
  // Reason: a long closing line (e.g. "de punta a punta.") is broken at its middle word so every line can stay large.
  const words = hero.line2.split(" ");
  const half = Math.ceil(words.length / 2);
  const closing = hero.line2.length > 12 && words.length > 2 ? [words.slice(0, half).join(" "), words.slice(half).join(" ")] : [hero.line2];
  const rows = [
    ...plain.map((t, i) => ({ t, em: false, indent: i % 2 === 1, n: t.length + (i % 2 === 1 ? 2 : 0) })),
    ...closing.map((t) => ({ t, em: true, indent: false, n: t.length })),
  ];

  return (
    <section className="hero" aria-labelledby="top">
      <CardSlot place="hero" rx={0.2} ry={-0.5} rz={0.1} role={hero.role} name={cardName} since={since} />
      <div className="wrap hero-grid">
        <div className="hero-top">
          <p className="label hero-eyebrow">{hero.eyebrow}</p>
          <p className="label hero-status">
            <i className="dot" aria-hidden="true" /> {status}
          </p>
        </div>

        <h1 id="top" className="hero-title">
          <span className="sr">{`Dasiel Torres — ${hero.role}. ${hero.line1} ${hero.line2}`}</span>
          {rows.map((r, i) => (
            <Fragment key={r.t}>
              <span
                aria-hidden="true"
                className={`hero-line${r.em ? " is-em" : ""}${r.indent ? " is-indent" : ""}`}
                style={{ "--n": r.n, "--i": i } as CSSProperties}
              >
                {r.t}
              </span>{" "}
            </Fragment>
          ))}
        </h1>

        <div className="hero-bar">
          <p className="hero-lede">{hero.lede}</p>
          <div className="hero-actions">
            <Magnetic>
              <Link className="btn btn-solid" href={`/${lang}#contact`}>
                <Roll>{hero.primary}</Roll>
              </Link>
            </Magnetic>
            <Link className="hero-more label" href={`/${lang}#work`}>
              {hero.secondary} <span aria-hidden="true">↓</span>
            </Link>
          </div>
          <p className="hero-scroll mono" aria-hidden="true">
            <i /> {hero.scroll}
          </p>
        </div>
      </div>
    </section>
  );
}
