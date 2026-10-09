import type { Dictionary } from "@/content/types";
import { Arrow } from "./Arrow";
import AxisPlay from "./visuals/AxisPlay";

// A solved-looking partial board, purely decorative (the real generator lives in the Sudoku project).
const BOARD = "53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79";

function SudokuPlate() {
  return (
    <div className="sudoku" aria-hidden="true">
      {Array.from(BOARD).map((c, i) => (
        <span key={i} data-box={(Math.floor(i / 27) * 3 + Math.floor((i % 9) / 3)) % 2} style={{ ["--d" as string]: `${(i % 9) * 60 + Math.floor(i / 9) * 60}ms` }}>
          {c === "." ? "" : c}
        </span>
      ))}
    </div>
  );
}

export default function Lab({ lab, vis }: { lab: Dictionary["lab"]; vis: Dictionary["vis"] }) {
  return (
    <section id="lab" className="section lab-sec solid" aria-labelledby="lab-title">
      <header className="section-head">
        <h2 id="lab-title" className="display">
          {lab.title}
        </h2>
        <p className="section-intro">{lab.intro}</p>
      </header>
      <ul className="lab">
        {lab.items.map((i, k) => (
          <li key={i.name}>
            <div className="lab-plate">{k === 0 ? <SudokuPlate /> : <AxisPlay t={vis.axes} />}</div>
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
