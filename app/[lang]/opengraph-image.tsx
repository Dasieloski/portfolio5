import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getDictionary } from "@/content";
import { LOCALES, isLocale } from "@/lib/site";

export const alt = "Dasiel Torres - Full-Stack Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

/** The ledger scene as a flat drawing: columns of tokens in white, black and champagne gold. */
function ledgerSvg() {
  const heights = [7, 11, 15, 10, 6];
  const tone = (s: number, k: number) => ((s * 5 + k) % 9 === 4 ? "#c9a56a" : (s + k) % 2 === 0 ? "#f1f0ec" : "#2a2a2e");
  const parts: string[] = [];
  heights.forEach((h, s) => {
    const cx = 60 + s * 92;
    for (let k = 0; k < h; k++) {
      const y = 520 - k * 30;
      const fill = tone(s, k);
      parts.push(
        `<rect x="${cx - 38}" y="${y - 12}" width="76" height="24" fill="${fill}" opacity="0.92"/>`,
        `<ellipse cx="${cx}" cy="${y + 12}" rx="38" ry="11" fill="${fill}"/>`,
        `<ellipse cx="${cx}" cy="${y - 12}" rx="38" ry="11" fill="${fill}" stroke="rgba(0,0,0,0.35)"/>`,
      );
    }
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="560" viewBox="0 0 480 560">${parts.join("")}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = isLocale(lang) ? getDictionary(lang) : null;
  // Reason: the logo is inlined as a data URI so the image renders without any network fetch.
  const logo = `data:image/svg+xml;base64,${readFileSync(join(process.cwd(), "public/logo-dt-oscuro.svg")).toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0a0a0b", color: "#f2f1ed", padding: 64, fontFamily: "Helvetica, Arial, sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 660 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={52} height={52} alt="" />
            Dasiel Torres
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, letterSpacing: 2, textTransform: "uppercase", color: "#c9a56a", marginBottom: 20 }}>
              Full-Stack Engineer, Payments
            </div>
            <div style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.02, letterSpacing: -3 }}>{t?.meta.ogTagline ?? ""}</div>
          </div>
          <div style={{ fontSize: 24, color: "#a3a3a8" }}>React · Next.js · Node.js · NestJS · PostgreSQL</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ledgerSvg()} width={440} height={513} alt="" style={{ marginLeft: "auto", alignSelf: "flex-end" }} />
      </div>
    ),
    size,
  );
}
