import type { CSSProperties } from "react";

/**
 * Letters that roll up one by one on hover or focus of the closest link or button. Screen readers get the plain
 * text; the animated letters are hidden from them.
 */
export default function Roll({ text }: { text: string }) {
  return (
    <span className="roll">
      <span className="sr">{text}</span>
      <span className="roll-in" aria-hidden="true">
        {Array.from(text).map((ch, i) => {
          const c = ch === " " ? " " : ch;
          return (
            <span key={i} className="roll-ch" data-ch={c} style={{ "--i": i } as CSSProperties}>
              {c}
            </span>
          );
        })}
      </span>
    </span>
  );
}
