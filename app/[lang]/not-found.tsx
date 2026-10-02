import Link from "next/link";
import { getDictionary } from "@/content";
import { DEFAULT_LOCALE } from "@/lib/site";

export default function NotFound() {
  // Reason: not-found receives no params; the default locale is a safe, indexable-neutral choice.
  const t = getDictionary(DEFAULT_LOCALE).notFound;
  return (
    <main id="main" className="case">
      <h1 className="case-title">{t.title}</h1>
      <p className="lede">{t.text}</p>
      <Link href={`/${DEFAULT_LOCALE}`} className="btn btn-solid">
        {t.back}
      </Link>
    </main>
  );
}
