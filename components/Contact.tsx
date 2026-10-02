import type { Dictionary } from "@/content/types";
import { CONTACT } from "@/lib/site";
import { Arrow } from "./Arrow";
import CopyEmail from "./CopyEmail";
import Magnetic from "./Magnetic";
import StageArt from "./scene/StageArt";

export default function Contact({ contact, stage = true }: { contact: Dictionary["contact"]; stage?: boolean }) {
  const links = [
    { label: "GitHub", href: CONTACT.github },
    ...(CONTACT.linkedin ? [{ label: "LinkedIn", href: CONTACT.linkedin }] : []),
    { label: "WhatsApp", href: CONTACT.whatsapp },
    { label: contact.cv, href: CONTACT.cv },
  ];

  return (
    <section id="contact" className="section section-dark contact" aria-labelledby="contact-title">
      {stage && (
        <div className="stage contact-stage" data-stage="contact" aria-hidden="true">
          <StageArt />
        </div>
      )}
      <p className="mono contact-status">
        <span className="now-dot" aria-hidden="true" /> {contact.availability} · {contact.location}
      </p>
      <h2 id="contact-title" className="display display-xl">
        {contact.title}
      </h2>
      <div className="contact-grid">
        <p className="section-intro">{contact.text}</p>
        <div>
          <Magnetic strength={0.12}>
            <a className="contact-mail" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
          </Magnetic>
          <CopyEmail email={CONTACT.email} copy={contact.copy} copied={contact.copied} />
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
      </div>
    </section>
  );
}
