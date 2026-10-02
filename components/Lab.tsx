import type { Dictionary } from "@/content/types";
import { Arrow } from "./Arrow";

export default function Lab({ lab }: { lab: Dictionary["lab"] }) {
  return (
    <section id="lab" className="section" aria-labelledby="lab-title">
      <header className="section-head">
        <h2 id="lab-title" className="display reveal">
          {lab.title}
        </h2>
        <p className="section-intro">{lab.intro}</p>
      </header>
      <ul className="lab">
        {lab.items.map((i) => (
          <li key={i.name}>
            <span className="mono">{i.period}</span>
            <h3>
              {i.href ? (
                <a href={i.href} target="_blank" rel="noopener noreferrer">
                  {i.name} <Arrow />
                </a>
              ) : (
                i.name
              )}
            </h3>
            <p>{i.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
