import type { Dictionary } from "@/content/types";
import { CONTACT } from "@/lib/site";
import CopyEmail from "../CopyEmail";
import Magnetic from "../motion/Magnetic";
import { Arrow } from "../Arrow";

type Props = { t: Dictionary["contact"]; talk: string; footer: Dictionary["footer"] };

/** The close: the tokens orbit the invitation; every way to reach me is one tap away. */
export default function Contact({ t, talk, footer }: Props) {
  const links = [
    { label: "GitHub", href: CONTACT.github },
    ...(CONTACT.linkedin ? [{ label: "LinkedIn", href: CONTACT.linkedin }] : []),
    { label: "WhatsApp", href: CONTACT.whatsapp },
  ];
  return (
    <section id="contact" className="contact" data-scene="contact" aria-labelledby="contact-title">
      <div className="contact-in">
        <p className="contact-status">
          <i className="live" aria-hidden="true" />
          {t.availability}
        </p>
        <h2 id="contact-title" className="contact-title" data-rv>
          {talk}
        </h2>
        <p className="contact-text" data-rv>
          {t.title} {t.text}
        </p>
        <div className="contact-mail" data-rv>
          <Magnetic strength={0.14}>
            <a className="mail" href={`mailto:${CONTACT.email}`}>
              <span>{CONTACT.email}</span>
              <Arrow />
            </a>
          </Magnetic>
          <CopyEmail email={CONTACT.email} copy={t.copy} copied={t.copied} />
        </div>
        <ul className="contact-links" data-rv>
          <li>
            <a className="ulink" href={CONTACT.cvEn} download>
              {t.cvEn} (PDF)
            </a>
          </li>
          <li>
            <a className="ulink" href={CONTACT.cvEs} download>
              {t.cvEs} (PDF)
            </a>
          </li>
          {links.map((l) => (
            <li key={l.label}>
              <a className="ulink" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <footer className="footer">
        <span className="mono">{footer.rights}</span>
        <span className="mono">{t.location}</span>
        <a href="#top" className="mono ulink">
          {footer.top}
        </a>
      </footer>
    </section>
  );
}
