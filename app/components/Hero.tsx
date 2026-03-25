'use client';

export default function Hero() {
  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: '0 3rem 6rem',
      overflow: 'hidden',
    }}>
      {/* Rays CSS and Animations */}
      <style>{`
        @keyframes smoothBgHero {
          from {
            background-position: 50% 50%, 50% 50%;
          }
          to {
            background-position: 350% 50%, 350% 50%;
          }
        }
        
        .rays-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          --stripe-color: #fff;
          --stripes: repeating-linear-gradient(
            100deg,
            var(--stripe-color) 0%,
            var(--stripe-color) 7%,
            transparent 10%,
            transparent 12%,
            var(--stripe-color) 16%
          );
          --rainbow: repeating-linear-gradient(
            100deg,
            #60a5fa 10%,
            #e879f9 15%,
            #60a5fa 20%,
            #5eead4 25%,
            #60a5fa 30%
          );
          background-image: var(--stripes), var(--rainbow);
          background-size: 300%, 200%;
          background-position: 50% 50%, 50% 50%;
          filter: blur(10px) invert(100%);
          mask-image: radial-gradient(ellipse at 100% 0%, black 60%, transparent 100%);
        }

        .rays-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: var(--stripes), var(--rainbow);
          background-size: 200%, 100%;
          animation: smoothBgHero 60s linear infinite;
          background-attachment: fixed;
          mix-blend-mode: difference;
        }

        /* Opcional: Una suave capa de oscurecimiento por encima de los rays para mantener legibilidad */
        .rays-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(circle at bottom right, rgba(13,13,18,0.3) 0%, var(--paper) 100%);
          opacity: 0.9;
          pointer-events: none;
        }
      `}</style>

      {/* RAYS BACKGROUND */}
      <div className="rays-bg" aria-hidden="true" />
      <div className="rays-overlay" aria-hidden="true" />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backgroundImage: 'linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        opacity: 0.4,
        pointerEvents: 'none',
        maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
      }} aria-hidden="true" />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em',
          color: 'var(--charcoal)', textTransform: 'uppercase', marginBottom: '2rem',
          display: 'flex', alignItems: 'center', gap: '1rem',
          animation: 'fadeUp 0.8s ease 0.2s both',
        }} className="hero-subtitle">
          <span style={{ display: 'block', width: '40px', height: '1px', background: 'var(--accent)' }} />
          Product Engineer — Next.js / TypeScript / Node.js
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(64px, 12vw, 180px)',
          fontWeight: 800, lineHeight: 0.88, letterSpacing: '-0.03em',
          color: 'var(--charcoal)',
          animation: 'fadeUp 0.9s ease 0.4s both',
          textShadow: '0 10px 40px rgba(0,0,0,0.8)',
        }} className="hero-title">
          DASIEL<br />
          <span style={{
            fontFamily: 'var(--font-serif)', fontWeight: 300, fontStyle: 'italic',
            color: 'var(--accent)', fontSize: '0.62em',
          }}>Dev</span>
        </h1>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginTop: '3rem', flexWrap: 'wrap', gap: '2rem',
          animation: 'fadeUp 0.9s ease 0.65s both',
        }} className="hero-content-row">
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.9,
            color: 'var(--charcoal)', maxWidth: '340px',
            opacity: 0.9,
          }}>
            Construyo aplicaciones web completas — desde el diseño hasta el deploy.
            Frontend, backend y todo lo que hay entre medias.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }} className="hero-badge-container">
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.05em',
              color: 'var(--charcoal)', padding: '8px 16px', border: '1px solid var(--border)',
              background: 'rgba(13,13,18,0.7)', backdropFilter: 'blur(10px)',
            }}>
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', animation: 'pulse 2s infinite',
              }} />
              Disponible para trabajar
            </div>

            <button
              onClick={scrollToProjects}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--paper)', background: 'var(--accent)',
                padding: '12px 28px', border: '1px solid var(--accent)', transition: 'all 0.25s ease',
                cursor: 'none', display: 'flex', alignItems: 'center', gap: '8px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--accent)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.color = 'var(--paper)';
              }}
            >
              Ver proyectos
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 6h10M6 1l5 5-5 5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: '3rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.25em',
        textTransform: 'uppercase', color: 'var(--muted)',
        animation: 'fadeUp 1s ease 1.2s both', pointerEvents: 'none', zIndex: 2
      }}>
        <span style={{
          width: '1px', height: '50px',
          background: 'linear-gradient(to bottom, var(--accent), transparent)',
          animation: 'scrollLine 2s ease-in-out infinite',
        }} />
        scroll
      </div>

      <div style={{
        position: 'absolute', right: '3rem', top: '50%', transform: 'translateY(-50%)',
        fontFamily: 'var(--font-serif)', fontSize: 'clamp(120px, 20vw, 260px)', fontWeight: 100,
        color: 'transparent', WebkitTextStroke: '1px rgba(123,97,255,0.06)',
        userSelect: 'none', pointerEvents: 'none', lineHeight: 1, letterSpacing: '-0.05em', zIndex: 1
      }} aria-hidden="true">01</div>
      <style>{`
        @media (max-width: 768px) {
          #hero {
            padding: 0 1.5rem 4rem !important;
            justify-content: center !important;
          }
          .hero-title {
            font-size: clamp(48px, 15vw, 84px) !important;
            text-align: center;
          }
          .hero-content-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            margin-top: 2rem !important;
          }
          .hero-content-row p {
            max-width: 100% !important;
          }
          .hero-badge-container {
            align-items: center !important;
          }
          .hero-subtitle {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
