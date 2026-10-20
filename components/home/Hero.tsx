import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/types";
import Magnetic from "../motion/Magnetic";
import Roll from "../Roll";

/**
 * Opening shot: the tokens burst out and settle into a pile you can push around; the statement arrives word by
 * word once the counter lifts. Name and role sit in the bottom bar with the one action.
 */
export default function Hero({ t }: { t: Dictionary["hero"] }) {
  const words = t.statement.split(" ");
  return (
    <section className="hero" data-scene="hero" aria-labelledby="hero-title">
      <div className="hero-in">
        <h1 id="hero-title" className="hero-statement">
          <span className="sr">{`${t.name}. ${t.role}. `}</span>
          {words.map((w, i) => (
            <span key={i}>
              <span className="w" style={{ "--i": i } as CSSProperties}>
                <span>{w}</span>
              </span>{" "}
            </span>
          ))}
        </h1>
        <div className="hero-bar">
          <p className="hero-id">
            <span className="hero-name">{t.name}</span>
            <span className="hero-role">{t.role}</span>
          </p>
          <p className="hero-status">
            <i className="live" aria-hidden="true" />
            {t.status}
          </p>
          <Magnetic strength={0.2}>
            <a className="btn btn-solid" href="#work">
              <Roll text={t.primary} />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                <path d="M6 1.5v9M2.5 7 6 10.5 9.5 7" />
              </svg>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
