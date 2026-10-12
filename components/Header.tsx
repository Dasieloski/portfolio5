import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/site";
import Nav from "./Nav";

export default function Header({ lang, nav }: { lang: Locale; nav: Dictionary["nav"] }) {
  const home = `/${lang}`;
  return (
    <Nav
      lang={lang}
      links={[
        { href: `${home}#work`, label: nav.work },
        { href: `${home}#stack`, label: nav.stack },
        { href: `${home}#path`, label: nav.path },
      ]}
      cta={{ href: `${home}#contact`, label: nav.contact }}
      langLabel={nav.langLabel}
      menuLabel={nav.menu}
    />
  );
}
