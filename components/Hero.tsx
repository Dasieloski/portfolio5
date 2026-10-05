import Link from "next/link";
import { Fragment, type CSSProperties } from "react";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/site";

type Props = { lang: Locale; hero: Dictionary["hero"]; status: string };

/** The headline is set per line: each line's size is derived from its length so it always fills the width and never overflows. */
export default function Hero({ lang, hero, status }: Props) {
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
      <div className="hero-disc" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="hero-side">
          <p className="label hero-eyebrow">{hero.eyebrow}</p>
          <p className="hero-lede">{hero.lede}</p>
        </div>

        <h1 id="top" className="hero-title">
          {rows.map((r) => (
            <Fragment key={r.t}>
              <span className={`hero-line${r.em ? " is-em" : ""}${r.indent ? " is-indent" : ""}`} style={{ "--n": r.n } as CSSProperties}>
                {r.t}
              </span>{" "}
            </Fragment>
          ))}
        </h1>

        <div className="hero-bar label">
          <span className="hero-status">
            <i className="dot" aria-hidden="true" /> {status}
          </span>
          <Link className="btn btn-solid" href={`/${lang}#contact`}>
            {hero.primary}
          </Link>
          <Link className="hero-more" href={`/${lang}#work`}>
            {hero.secondary} ↓
          </Link>
        </div>
      </div>
    </section>
  );
}
