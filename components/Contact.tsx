import type { Dictionary } from "@/content/types";
import { CONTACT } from "@/lib/site";
import CopyEmail from "./CopyEmail";
import Dial from "./dial/Dial";
import Magnetic from "./motion/Magnetic";

const Arrow = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
    <path d="M2 10 10 2M10 2H4M10 2v6" />
  </svg>
);

/** The close: the dial comes back, its hand at twelve, and the way to reach me. */
export default function Contact({ contact }: { contact: Dictionary["contact"] }) {
  const links = [
    { label: "GitHub", href: CONTACT.github },
    ...(CONTACT.linkedin ? [{ label: "LinkedIn", href: CONTACT.linkedin }] : []),
    { label: "WhatsApp", href: CONTACT.whatsapp },
    { label: contact.cvEn, href: CONTACT.cvEn },
    { label: contact.cvEs, href: CONTACT.cvEs },
  ];

  return (
    <section id="contact" className="contact dark sheet" aria-labelledby="contact-title">
      <Dial variant="finale" />
      <div className="wrap contact-in">
        <h2 id="contact-title" className="contact-title">
          {contact.title}
        </h2>
        <p className="lede">{contact.text}</p>
        <div className="contact-mail">
          <Magnetic strength={0.1}>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </Magnetic>
          <CopyEmail email={CONTACT.email} copy={contact.copy} copied={contact.copied} />
        </div>
        <p className="contact-where mono">
          {contact.availability}. {contact.location}.
        </p>
        <ul className="contact-links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="ulink">
                {l.label} <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
