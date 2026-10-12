import type { Dictionary } from "@/content/types";

export default function Footer({ footer }: { footer: Dictionary["footer"] }) {
  return (
    <footer className="footer dark">
      <div className="wrap footer-row">
        <span className="mono">{footer.rights}</span>
        <a href="#top" className="mono ulink">
          {footer.top}
        </a>
      </div>
    </footer>
  );
}
