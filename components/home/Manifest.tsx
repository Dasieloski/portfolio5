import type { Dictionary } from "@/content/types";

/**
 * The turn of the story. While this tall section scrolls, the pile drops token by token into ledger columns and the
 * three lines arrive one at a time (the Director sets `data-step`). Without JS it is simply three lines and a
 * sentence.
 */
export default function Manifest({ t }: { t: Dictionary["manifest"] }) {
  return (
    <section className="manifest" data-scene="manifest" data-step="0" aria-label={t.lines.join(" ")}>
      <div className="manifest-frame">
        <p className="manifest-lines" aria-hidden="true">
          {t.lines.map((l, i) => (
            <span key={l} className="m-line" data-i={i}>
              {l}
            </span>
          ))}
        </p>
        <p className="manifest-body">{t.body}</p>
      </div>
    </section>
  );
}
