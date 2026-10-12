import Image from "next/image";
import type { Dictionary } from "@/content/types";

export default function Footer({ footer }: { footer: Dictionary["footer"] }) {
  return (
    <footer className="footer dark">
      <div className="wrap footer-row">
        <span className="mono footer-id">
          <Image src="/logo-dt-oscuro.svg" alt="" width={20} height={20} unoptimized />
          {footer.rights}
        </span>
        <a href="#top" className="mono ulink">
          {footer.top}
        </a>
      </div>
    </footer>
  );
}
