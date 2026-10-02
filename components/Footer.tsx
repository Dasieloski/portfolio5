import type { Dictionary } from "@/content/types";

export default function Footer({ footer }: { footer: Dictionary["footer"] }) {
  return (
    <footer className="footer">
      <span className="mono">{footer.rights}</span>
      <a href="#top" className="mono">
        {footer.top} ↑
      </a>
    </footer>
  );
}
