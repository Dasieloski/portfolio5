import type { Dictionary } from "@/content/types";

export default function Footer({ footer }: { footer: Dictionary["footer"] }) {
  return (
    <footer className="footer">
      <span className="label">{footer.rights}</span>
      <a href="#top" className="label">
        {footer.top} ↑
      </a>
    </footer>
  );
}
