"use client";

import { useEffect } from "react";
import Script from "next/script";

// Reason: the measurement ID is public by design; the fallback avoids a Vercel step. Local dev never reports.
const GA_ID = process.env.NODE_ENV === "production" ? (process.env.NEXT_PUBLIC_GA_ID ?? "G-C008X2SEHL") : undefined;

type Gtag = (command: "event", name: string, params: Record<string, string>) => void;

/** Maps a clicked link to one custom event, or null when it is not worth tracking. */
function classify(a: HTMLAnchorElement): [string, Record<string, string>] | null {
  const href = a.getAttribute("href") ?? "";
  if (href.startsWith("mailto:")) return ["contact_click", { method: "email" }];
  if (/\.pdf$/i.test(href)) return ["cv_download", { language: /Espanol/i.test(href) ? "es" : "en" }];
  const caseSlug = href.match(/\/work\/([^/#?]+)/)?.[1];
  if (caseSlug) return ["case_study_click", { slug: caseSlug }];
  if (a.hostname.endsWith("github.com")) return ["contact_click", { method: "github" }];
  if (a.hostname.endsWith("linkedin.com")) return ["contact_click", { method: "linkedin" }];
  if (a.hostname === "wa.me") return ["contact_click", { method: "whatsapp" }];
  return null;
}

/** GA4 loader plus delegated click events. Renders nothing outside production. */
export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (!gtag || !target) return;
      // Reason: one delegated listener counts each click once, however many components render links.
      if (target.closest("[data-track='copy_email']")) return gtag("event", "contact_click", { method: "copy_email" });
      const a = target.closest("a");
      const hit = a && classify(a);
      if (hit) gtag("event", hit[0], hit[1]);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
