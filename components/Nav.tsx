"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/types";
import { CONTACT, type Locale } from "@/lib/site";
import LangSwitch from "./LangSwitch";
import Roll from "./Roll";

type Props = { lang: Locale; nav: Dictionary["nav"] };

/**
 * Brand on the left, quiet controls on the right: language, CV, the one contact action and a menu that opens the chapters
 * full screen. The current chapter is marked from `html[data-chapter]` (set by the Director) in pure CSS.
 */
export default function Nav({ lang, nav }: Props) {
  const [open, setOpen] = useState(false);
  const first = useRef<HTMLAnchorElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const home = `/${lang}`;
  const chapters = [
    { id: "work", label: nav.work },
    { id: "layers", label: nav.layers },
    { id: "record", label: nav.record },
    { id: "contact", label: nav.contact },
  ];
  const cv = lang === "es" ? CONTACT.cvEs : CONTACT.cvEn;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => first.current?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="nav" data-open={open}>
        <Link href={home} className="nav-mark" aria-label={nav.home} onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-dt-oscuro.svg" alt="" width={28} height={28} />
          <span>Dasiel Torres</span>
        </Link>
        <div className="nav-end">
          <LangSwitch current={lang} label={nav.langLabel} />
          <a className="nav-link nav-cv" href={cv} download>
            <Roll text={nav.cv} />
          </a>
          <Link href={`${home}#contact`} className="btn btn-sm nav-talk" onClick={() => setOpen(false)}>
            <Roll text={nav.contact} />
          </Link>
          <button
            ref={toggle}
            type="button"
            className="nav-menu"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((o) => !o)}
          >
            <Roll text={open ? nav.close : nav.menu} />
            <span className="menu-lines" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>
      <div id="menu" className="menu" data-open={open} inert={!open}>
        <nav aria-label="Menu">
          {chapters.map((c, i) => (
            <Link
              key={c.id}
              href={`${home}#${c.id}`}
              ref={i === 0 ? first : undefined}
              data-ch={c.id}
              style={{ "--i": i } as React.CSSProperties}
              onClick={() => setOpen(false)}
            >
              <Roll text={c.label} />
            </Link>
          ))}
        </nav>
        <div className="menu-foot">
          <a href={cv} download className="ulink">
            {nav.cv} (PDF)
          </a>
          <a href={`mailto:${CONTACT.email}`} className="ulink">
            {CONTACT.email}
          </a>
        </div>
      </div>
    </>
  );
}
