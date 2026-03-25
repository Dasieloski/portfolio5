'use client';

const FOOTER_LINKS = [
  { label: 'GitHub', href: 'https://github.com/dasieloski' },
  { label: 'WhatsApp', href: 'https://wa.me/5354710329' },
  { label: 'Instagram', href: 'https://instagram.com/dasieloski' },
];

const NAV_LINKS = [
  { href: '#about', label: 'Sobre mí' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contacto' },
];

export default function Footer() {
  return (
    <footer style={{
      padding: '3rem',
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      borderTop: '1px solid var(--border)',
      gap: '2rem',
    }}>
      {/* Left — copyright */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
      }}>
        © 2026 Dasiel. Desarrollador Fullstack.
      </div>

      {/* Center — logo */}
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '28px',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        color: 'var(--charcoal)',
        textAlign: 'center',
      }}>
        DasielDev<span style={{ color: 'var(--accent)' }}>.</span>
      </div>

      {/* Right — social links */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        justifyContent: 'flex-end',
        flexWrap: 'wrap',
      }}>
        {FOOTER_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--charcoal)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--muted)'}
          >
            {label}
          </a>
        ))}
      </div>

      <style>{`
        footer {
          @media (max-width: 768px) {
            grid-template-columns: 1fr !important;
            text-align: center;
            padding: 2rem 1.5rem !important;
          }
        }
        @media (max-width: 768px) {
          footer > div:first-child { order: 3; }
          footer > div:nth-child(2) { order: 1; }
          footer > div:last-child { order: 2; justify-content: center !important; }
        }
      `}</style>
    </footer>
  );
}
