"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/site";
import LangSwitch from "./LangSwitch";

type Props = { lang: Locale; links: { href: string; label: string }[]; cta: { href: string; label: string }; langLabel: string; menuLabel: string };

/** Floating pill. The ring beside the name fills as you scroll (native scroll-driven animation, static where unsupported). */
export default function Nav({ lang, links, cta, langLabel, menuLabel }: Props) {
  const [open, setOpen] = useState(false);
  const first = useRef<HTMLAnchorElement>(null);
  const burger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burger.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const home = `/${lang}`;
  return (
    <>
      <header className="nav" data-open={open}>
        <Link href={home} className="nav-mark" aria-label="Dasiel Torres" onClick={() => setOpen(false)}>
          <Image src="/logo-dt-oscuro.svg" alt="" width={24} height={24} className="nav-logo" unoptimized />
          Dasiel Torres
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-end">
          <LangSwitch current={lang} label={langLabel} />
          <Link href={cta.href} className="nav-cta">
            {cta.label}
          </Link>
          <button ref={burger} type="button" className="nav-burger" aria-expanded={open} aria-controls="menu" aria-label={menuLabel} onClick={() => setOpen((o) => !o)}>
            <i />
            <i />
          </button>
        </div>
      </header>
      <div id="menu" className="menu" data-open={open} inert={!open}>
        {[...links, cta].map((l, i) => (
          <Link key={l.href} href={l.href} ref={i === 0 ? first : undefined} style={{ "--i": i } as React.CSSProperties} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
}
