import type { Dictionary } from "@/content/types";
import WordScrub from "./motion/WordScrub";

/** The first sheet over the hero: one sentence about what I do, then the plain facts. */
export default function Statement({ intro, profile }: { intro: Dictionary["intro"]; profile: Dictionary["path"]["profile"] }) {
  return (
    <section id="about" className="statement light sheet sheet-first" aria-label={intro.kicker}>
      <div className="wrap">
        <WordScrub text={intro.statement} emphasis={intro.emphasis} className="statement-text" />
        <dl className="facts rv">
          {profile.rows.map((r) => (
            <div key={r.k}>
              <dt className="mono">{r.k}</dt>
              <dd>{r.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
