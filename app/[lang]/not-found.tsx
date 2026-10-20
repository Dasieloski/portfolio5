import Link from "next/link";
import { getDictionary } from "@/content";
import { DEFAULT_LOCALE } from "@/lib/site";
import Director from "@/components/cinema/Director";

export default function NotFound() {
  // Reason: not-found receives no params; the default locale is a safe, indexable-neutral choice.
  const t = getDictionary(DEFAULT_LOCALE).notFound;
  return (
    <main id="main" className="nf">
      <p className="mono">404</p>
      <h1 className="display">{t.title}</h1>
      <p className="nf-text">{t.text}</p>
      <Link href={`/${DEFAULT_LOCALE}`} className="btn btn-solid">
        {t.back}
      </Link>
      <Director />
    </main>
  );
}
