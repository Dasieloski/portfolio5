'use client';

import { useEffect, useRef, useState } from 'react';

const LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/dasieloski',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.49 11.49 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/5354710329?text=Hola%20Dasiel%2C%20me%20gustar%C3%ADa%20hablar%20sobre%20un%20proyecto.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.62.72.23 1.37.2 1.88.12.57-.08 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35zm-5.39 7.37h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.67-.24-.38A9.86 9.86 0 0 1 2.1 12C2.1 6.53 6.53 2.1 12.08 2.1c2.65 0 5.14 1.03 7.01 2.9a9.86 9.86 0 0 1 2.9 7.02c-.01 5.46-4.45 9.83-9.91 9.83zM12.08 0C5.4 0 0 5.4 0 12c0 2.12.55 4.1 1.52 5.83L0 24l6.35-1.66A11.96 11.96 0 0 0 12.08 24C18.7 24 24 18.6 24 12S18.7 0 12.08 0z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/dasieloski',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal');
    if (!els) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('dasieldev@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" ref={sectionRef} style={{
      padding: 'var(--section-y) var(--section-x)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '6rem',
      alignItems: 'center',
      borderBottom: '1px solid var(--border)',
    }}>
      {/* Left */}
      <div>
        <div className="section-label reveal">Contacto</div>
        <h2 className="reveal reveal-delay-1" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 5vw, 72px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 0.95,
          color: 'var(--charcoal)',
          marginBottom: '2rem',
        }}>
          Hablemos.
        </h2>

        <p className="reveal reveal-delay-2" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '14px',
          lineHeight: 1.9,
          color: 'var(--muted)',
          marginBottom: '3rem',
          maxWidth: '380px',
        }}>
          ¿Tienes un proyecto en mente? Estoy disponible para colaborar en 
          tiempo completo o freelance. Escribeme y hablemos.
        </p>

        {/* Email button */}
        <button
          className="reveal reveal-delay-3"
          onClick={copyEmail}
          data-cursor="hover"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            letterSpacing: '0.05em',
            color: copied ? 'var(--success)' : 'var(--charcoal)',
            padding: '16px 24px',
            border: `1px solid ${copied ? 'var(--success)' : 'var(--border)'}`,
            background: 'var(--surface)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            transition: 'all 0.25s ease',
            cursor: 'none',
            width: '100%',
            maxWidth: '360px',
          }}
          onMouseEnter={e => {
            if (!copied) {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
              (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
            }
          }}
          onMouseLeave={e => {
            if (!copied) {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
              (e.currentTarget as HTMLElement).style.color = 'var(--charcoal)';
            }
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="1" y="3" width="14" height="10" rx="1" />
            <path d="M1 5l7 5 7-5" />
          </svg>
          {copied ? '¡Copiado!' : 'dasieldev@gmail.com'}
        </button>
      </div>

      {/* Right — Links */}
      <div>
        <div className="reveal reveal-delay-1" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: '2rem',
        }}>
          Redes
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {LINKS.map(({ label, href, icon }, i) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener"
              className={`reveal reveal-delay-${i + 2}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1rem',
                border: '1px solid var(--border)',
                color: 'var(--muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                letterSpacing: '0.05em',
                background: 'var(--surface)',
                marginBottom: '1px',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--charcoal)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)';
                (e.currentTarget as HTMLElement).style.background = 'var(--surface2)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = 'var(--muted)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLElement).style.background = 'var(--surface)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {icon}
                {label}
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 12L12 2M12 2H5M12 2v7" />
              </svg>
            </a>
          ))}
        </div>

        {/* Location */}
        <div className="reveal reveal-delay-4" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginTop: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="6" cy="5" r="2" />
            <path d="M6 1C3.79 1 2 2.79 2 5c0 3 4 7 4 7s4-4 4-7c0-2.21-1.79-4-4-4z" />
          </svg>
          Remoto · Disponible globalmente
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            padding: 4rem 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
