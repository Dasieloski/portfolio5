'use client';

import { useEffect, useRef } from 'react';

const SKILL_GROUPS = [
  {
    title: 'Frontend',
    items: ['Next.js 14', 'TypeScript', 'React 18', 'Tailwind CSS', 'Shadcn/ui', 'Material UI', 'Zustand', 'JavaScript'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'NestJS', 'PostgreSQL', 'Prisma ORM', 'Strapi CMS', 'REST APIs', 'Firebase', 'Supabase'],
  },
  {
    title: 'Tools',
    items: ['Vercel', 'Git / GitHub', 'CI/CD', 'GitHub Actions', 'Docker', 'AWS', 'Figma', 'Jest'],
  },
];

export default function Skills() {
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
    <section id="skills" ref={sectionRef} style={{
      padding: 'var(--section-y) var(--section-x)',
      borderBottom: '1px solid var(--border)',
      background: 'var(--surface)',
    }}>
      {/* Header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '6rem',
        alignItems: 'start',
      }}>
        <div>
          <div className="section-label reveal">Skills</div>
          <h2 className="reveal reveal-delay-1" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 4vw, 64px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            color: 'var(--charcoal)',
          }}>
            Stack
            <br />
            <em style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--accent)',
            }}>completo</em>
          </h2>

          <p className="reveal reveal-delay-2" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            lineHeight: 1.8,
            color: 'var(--muted)',
            marginTop: '2rem',
            maxWidth: '280px',
          }}>
            Domino el ciclo completo de desarrollo, desde el diseño hasta el deployment en producción.
          </p>
        </div>

        {/* Groups */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '3rem',
        }}>
          {SKILL_GROUPS.map(({ title, items }, gi) => (
            <div key={title} className={`reveal reveal-delay-${gi + 1}`}>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '1.25rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid var(--line)',
              }}>
                {title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {items.map(item => (
                  <div key={item} className="skill-tag">
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #skills > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
          #skills > div > div:last-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          #skills { padding: 4rem 1.5rem !important; }
          #skills > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
