import type { Dictionary } from "@/content/types";
import { CONTACT } from "@/lib/site";
import { Arrow } from "./Arrow";
import CardSlot from "./card/CardSlot";
import CopyEmail from "./CopyEmail";
import Magnetic from "./motion/Magnetic";

type Props = {
  contact: Dictionary["contact"];
  /** When given, the 3D card lands beside the closing line (home page only). */
  card?: { role: string; name: string; since: string };
};

export default function Contact({ contact, card }: Props) {
  const links = [
    { label: "GitHub", href: CONTACT.github },
    ...(CONTACT.linkedin ? [{ label: "LinkedIn", href: CONTACT.linkedin }] : []),
    { label: "WhatsApp", href: CONTACT.whatsapp },
    { label: contact.cvEn, href: CONTACT.cvEn },
    { label: contact.cvEs, href: CONTACT.cvEs },
  ];

  return (
    <section id="contact" className={`contact${card ? " has-card" : ""}`} aria-labelledby="contact-title">
      {card && <CardSlot place="end" rx={0.14} ry={Math.PI - 0.38} rz={-0.08} role={card.role} name={card.name} since={card.since} />}
      <div className="wrap contact-in">
        <p className="mono contact-status">
          <span className="dot" aria-hidden="true" /> {contact.availability} · {contact.location}
        </p>
        <h2 id="contact-title" className="contact-title">
          {contact.title}
        </h2>
        <p className="contact-text">{contact.text}</p>
        <div className="contact-mail-wrap">
          <Magnetic strength={0.12}>
            <a className="contact-mail" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
          </Magnetic>
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
      </div>
    </section>
  );
}
