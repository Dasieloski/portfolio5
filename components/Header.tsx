import type { Dictionary } from "@/content/types";
import type { Locale } from "@/lib/site";
import Nav from "./Nav";

export default function Header({ lang, nav }: { lang: Locale; nav: Dictionary["nav"] }) {
  return <Nav lang={lang} nav={nav} />;
}
