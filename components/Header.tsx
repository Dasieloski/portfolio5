import Link from "next/link";
import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/site";
import LangSwitch from "./LangSwitch";

type Props = { lang: Locale; nav: Dictionary["nav"] };

/** Fixed bar on top (blend-mode keeps it legible over light and dark sections) + thumb-zone bar on phones. */
export default function Header({ lang, nav }: Props) {
  const home = `/${lang}`;
  const items = [
    { href: `${home}#work`, label: nav.work },
    { href: `${home}#stack`, label: nav.stack },
    { href: `${home}#path`, label: nav.path },
    { href: `${home}#lab`, label: nav.lab },
  ];

  return (
    <>
      <header className="bar">
        <Link href={home} className="bar-mark" aria-label="Dasiel Torres">
          Dasiel Torres
        </Link>
        <nav className="bar-nav" aria-label="Primary">
          {items.map((i) => (
            <Link key={i.href} href={i.href}>
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="bar-end">
          <LangSwitch current={lang} label={nav.langLabel} />
          <Link href={`${home}#contact`} className="bar-cta">
            {nav.hire}
          </Link>
        </div>
      </header>

      <nav className="dock" aria-label="Quick">
        {items.slice(0, 3).map((i) => (
          <Link key={i.href} href={i.href}>
            {i.label}
          </Link>
        ))}
        <Link href={`${home}#contact`} className="dock-cta">
          {nav.hire}
        </Link>
      </nav>
    </>
  );
}
