import type { Dictionary } from "@/content/types";
import CardSlot from "./card/CardSlot";
import WordScrub from "./motion/WordScrub";

type Props = { intro: Dictionary["intro"]; profile: Dictionary["path"]["profile"]; role: string; cardName: string; since: string };

/** Transparent on purpose: the 3D card lands in the slot on the left while the statement fills in. */
export default function Intro({ intro, profile, role, cardName, since }: Props) {
  return (
    <section id="about" className="intro" aria-labelledby="intro-title">
      <div className="wrap intro-grid">
        <CardSlot place="intro" rx={0.12} ry={0.42} rz={-0.1} role={role} name={cardName} since={since} />
        <div className="intro-copy">
          <h2 id="intro-title" className="label intro-kicker">
            <span className="mono">01</span> {intro.kicker}
          </h2>
          <WordScrub text={intro.statement} emphasis={intro.emphasis} className="intro-statement" />
        </div>
        <dl className="facts-strip">
          {profile.rows.map((r) => (
            <div key={r.k}>
              <dt className="label">{r.k}</dt>
              <dd>{r.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
