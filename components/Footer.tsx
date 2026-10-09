import type { Dictionary } from "@/content/types";

export default function Footer({ footer }: { footer: Dictionary["footer"] }) {
  return (
    <footer className="footer solid">
      <div className="footer-row">
        <span className="mono">{footer.rights}</span>
        <a href="#top" className="mono">
          {footer.top} ↑
        </a>
      </div>
      <p className="footer-mark" aria-hidden="true">
        Dasiel Torres
      </p>
    </footer>
  );
}
