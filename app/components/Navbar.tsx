'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const NAV_LINKS = [
  { href: '#about', label: 'Sobre mí' },
  { href: '#projects', label: 'Proyectos' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        padding: '0 3rem',
        height: 'var(--nav-h)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(13,13,18,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '14px',
          letterSpacing: '0.08em',
          color: 'var(--charcoal)',
          fontWeight: 500,
          textShadow: scrolled ? 'none' : '0 2px 10px rgba(0,0,0,0.5)',
        }}>
          DasielDev<span style={{ color: 'var(--accent)', marginLeft: '2px' }}>.</span>
        </Link>

        {/* Desktop Links */}
        <ul style={{
          display: 'flex',
          gap: '2.5rem',
          listStyle: 'none',
        }} className="nav-links-desktop">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <button
                onClick={() => scrollTo(href)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--muted)',
                  padding: '4px 0',
                  position: 'relative',
                  transition: 'color 0.2s',
                  background: 'none',
                  border: 'none',
                  cursor: 'none',
                  lineHeight: 1,
                  textShadow: scrolled ? 'none' : '0 1px 8px rgba(0,0,0,0.4)',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--charcoal)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          onClick={e => { e.preventDefault(); scrollTo('#contact'); }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--paper)',
            background: 'var(--accent)',
            padding: '10px 22px',
            border: '1px solid var(--accent)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'var(--accent)';
            (e.currentTarget as HTMLElement).style.color = 'var(--paper)';
          }}
          className="nav-cta-desktop"
        >
          Contactar
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          className="hamburger"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: '24px',
              height: '1.5px',
              background: 'var(--charcoal)',
              transition: 'all 0.3s',
              transform: menuOpen
                ? i === 0 ? 'rotate(45deg) translateY(9.5px)'
                : i === 2 ? 'rotate(-45deg) translateY(-9.5px)'
                : 'scaleX(0)'
                : 'none',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: 'var(--nav-h)',
          left: 0, right: 0,
          background: 'rgba(13,13,18,0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
          padding: '2rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          zIndex: 999,
        }}>
          {NAV_LINKS.map(({ href, label }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '18px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--charcoal)',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem 0',
                borderBottom: '1px solid var(--border)',
              }}
            >
              {label}
            </button>
          ))}
          <a
            href="mailto:dasieldev@gmail.com"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              color: 'var(--accent)',
              letterSpacing: '0.05em',
              marginTop: '1rem',
            }}
          >
            dasieldev@gmail.com
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-cta-desktop { display: none !important; }
          .hamburger { display: flex !important; }
          nav { padding: 0 1.5rem !important; }
        }
      `}</style>
    </>
  );
}
