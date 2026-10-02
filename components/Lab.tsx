import type { Dictionary } from "@/content/types";
import { Arrow } from "./Arrow";

export default function Lab({ lab }: { lab: Dictionary["lab"] }) {
  return (
    <section id="lab" className="sheet lab" aria-labelledby="lab-title">
      <header>
        <h2 id="lab-title" className="h2">
          {lab.title}
        </h2>
        <p className="section-intro">{lab.intro}</p>
      </header>
      <ul>
        {lab.items.map((i) => (
          <li key={i.name}>
            <span className="label">{i.period}</span>
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
