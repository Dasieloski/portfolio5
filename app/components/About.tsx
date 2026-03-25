'use client';

import { useEffect, useRef } from 'react';

const STATS = [
  { num: '2+', label: 'Años en producción' },
  { num: '15+', label: 'Proyectos completados' },
  { num: '12+', label: 'Tecnologías dominadas' },
  { num: '100%', label: 'Remoto / Global' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section id="about" ref={sectionRef} style={{
      padding: 'var(--section-y) var(--section-x)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '6rem',
      alignItems: 'start',
      borderBottom: '1px solid var(--border)',
    }}>
      {/* Left col */}
      <div>
        <div className="section-label reveal">Sobre mí</div>

        <h2 className="reveal reveal-delay-1" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(32px, 4vw, 56px)',
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: 'var(--charcoal)',
          marginBottom: '2rem',
        }}>
          Construyo cosas
          <br />
          que{' '}
          <em style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--accent)',
          }}>funcionen</em>
          {' '}y
          <br />
          <em style={{
            fontFamily: 'var(--font-serif)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'var(--accent2)',
          }}>brillen</em>
        </h2>

        <p className="reveal reveal-delay-2" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '14px',
          lineHeight: 1.9,
          color: 'var(--muted)',
          marginBottom: '1.5rem',
        }}>
          Soy Dasiel, **Ingeniero en Ciencias Informáticas (UCI)** y Product Engineer enfocado en 
          construir sistemas de producción robustos — desde el esquema de base de datos hasta el despliegue final.
          Me especializo en Next.js 14, TypeScript y PostgreSQL, creando plataformas que escalan y resuelven problemas reales.
        </p>
        <p className="reveal reveal-delay-2" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '14px',
          lineHeight: 1.9,
          color: 'var(--muted)',
        }}>
          Mi trabajo no se queda en prototipos — entrego productos escalables y listos para producción.
          He liderado proyectos complejos manejando todo el ciclo de vida del producto: UX/UI, arquitectura, backend e infraestructura.
        </p>

        {/* CTA links */}
        <div className="reveal reveal-delay-3" style={{
          display: 'flex',
          gap: '1.5rem',
          marginTop: '2.5rem',
          flexWrap: 'wrap',
        }}>
          <a
            href="/Dasiel_Torres_CV_English.pdf"
            download
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--charcoal)',
              padding: '10px 20px',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              transition: 'all 0.25s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--charcoal)'; }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 1v7M2 8l4 3 4-3M1 11h10" />
            </svg>
            Descargar CV
          </a>
          <a
            href="https://github.com/dasieloski"
            target="_blank"
            rel="noopener"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              padding: '10px 20px',
              border: '1px solid var(--border)',
              transition: 'all 0.25s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--charcoal)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; }}
          >
            Github →
          </a>
        </div>
      </div>

      {/* Right col — Stats */}
      <div style={{ paddingTop: '4rem' }}>
        {/* Avatar */}
        <div className="reveal" style={{
          width: '80px', height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          fontWeight: 800,
          color: 'white',
          marginBottom: '3rem',
          boxShadow: '0 0 0 4px rgba(123,97,255,0.15)',
        }}>
          D
        </div>

        {/* Stats grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
        }}>
          {STATS.map(({ num, label }, i) => (
            <div
              key={label}
              className={`reveal reveal-delay-${i + 1}`}
              style={{
                padding: '1.75rem 1.5rem',
                background: 'var(--surface)',
                transition: 'background 0.25s',
                cursor: 'default',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--surface2)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--surface)'}
            >
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '42px',
                fontWeight: 300,
                color: 'var(--accent)',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}>
                {num}
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            padding: 4rem 1.5rem !important;
          }
          #about > div:last-child { padding-top: 0 !important; }
        }
      `}</style>
    </section>
  );
}
