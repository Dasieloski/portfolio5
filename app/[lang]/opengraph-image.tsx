import { ImageResponse } from "next/og";
import { getDictionary } from "@/content";
import { LOCALES, isLocale } from "@/lib/site";

export const alt = "Dasiel Torres — Full-Stack Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const tagline = isLocale(lang) ? getDictionary(lang).meta.ogTagline : "";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#efebe2",
          color: "#14120f",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase", color: "#2433f5" }}>
          Full-Stack Software Engineer
        </div>
        <div style={{ fontSize: 116, fontWeight: 600, lineHeight: 1.02, letterSpacing: -4 }}>{tagline}</div>
        <div style={{ fontSize: 36 }}>Dasiel Torres</div>
      </div>
    ),
    size,
  );
}
