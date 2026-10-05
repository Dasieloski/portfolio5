import type { Dictionary } from "@/content/types";
import { CONTACT } from "@/lib/site";
import { Arrow } from "./Arrow";
import CopyEmail from "./CopyEmail";

export default function Contact({ contact }: { contact: Dictionary["contact"] }) {
  const links = [
    { label: "GitHub", href: CONTACT.github },
    ...(CONTACT.linkedin ? [{ label: "LinkedIn", href: CONTACT.linkedin }] : []),
    { label: "WhatsApp", href: CONTACT.whatsapp },
    { label: contact.cvEn, href: CONTACT.cvEn },
    { label: contact.cvEs, href: CONTACT.cvEs },
  ];

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <p className="mono contact-status">
        <span className="dot" aria-hidden="true" /> {contact.availability} · {contact.location}
      </p>
      <h2 id="contact-title" className="contact-title">
        {contact.title}
      </h2>
      <div className="contact-mail-wrap">
        <a className="contact-mail" href={`mailto:${CONTACT.email}`}>
          {CONTACT.email}
        </a>
        <CopyEmail email={CONTACT.email} copy={contact.copy} copied={contact.copied} />
      </div>
      <ul className="contact-links">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} <Arrow />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
