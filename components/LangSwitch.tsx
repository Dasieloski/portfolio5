"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/site";

export default function LangSwitch({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname() ?? `/${current}`;
  // Reason: swap only the leading locale segment so the visitor stays on the same page.
  const rest = pathname.replace(/^\/[^/]+/, "");

  return (
    <div className="lang" role="group" aria-label={label}>
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={`/${l}${rest}`}
          hrefLang={l}
          lang={l}
          aria-current={l === current ? "true" : undefined}
          scroll={false}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
