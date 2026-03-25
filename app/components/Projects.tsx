'use client';

import { useEffect, useRef, useState } from 'react';
import { useSmoothScroll } from './SmoothScrollProvider';

const STOPS = [
  { rx: 90, ry: 0 },
  { rx: 0, ry: 0 },
  { rx: 0, ry: -90 },
  { rx: 0, ry: -180 },
  { rx: 0, ry: -270 },
  { rx: -90, ry: -360 },
];
const N = STOPS.length;
const easeIO = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

const topProjects = [
  {
    name: 'Habaluna',
    tag: '01 — E-commerce Platform',
    desc: 'Plataforma e-commerce estilo Amazon para la venta de productos varios. Construida con Next.js y NestJS, desplegada exitosamente en Railway. Maneja catálogo extenso y flujos complejos.',
    techs: ['Next.js', 'NestJS', 'PostgreSQL', 'Railway'],
  },
  {
    name: 'Gym Victoria',
    tag: '02 — SaaS Multi-tenant',
    desc: 'Plataforma SaaS para gestión de gimnasios. Soporta múltiples sedes, membresías por niveles y gestión de entrenadores con auth basada en roles.',
    techs: ['Next.js', 'PostgreSQL', 'Tailwind', 'Vercel'],
  },
  {
    name: 'MK Tattoo',
    tag: '03 — E-Commerce',
    desc: 'E-commerce full-stack con gestión de inventario en tiempo real y panel administrativo para manejo de SKUs y pedidos.',
    techs: ['Next.js', 'Strapi', 'REST API', 'Framer'],
  },
  {
    name: 'Sudoku Web',
    tag: '04 — Interactive App',
    desc: 'Juego de Sudoku interactivo con generador procedural de tableros y motor de validación en tiempo real. Completamente responsive.',
    techs: ['React', 'TypeScript', 'Tailwind', 'Vercel'],
  },
  {
    name: 'MotoMarket',
    tag: '05 — Marketplace (WIP)',
    desc: 'Marketplace especializado en la compra y venta de motos en Cuba (motomarket-three.vercel.app). Actualmente en desarrollo, optimizando el comercio de vehículos.',
    techs: ['Next.js', 'TypeScript', 'Tailwind', 'Vercel'],
  },
  {
    name: 'El Friñon',
    tag: '06 — E-commerce & POS',
    desc: 'E-commerce de piezas y accesorios (variedadeselfrinon.vercel.app). Sistema con múltiples roles, punto de venta (POS) y gestión de almacén.',
    techs: ['Next.js', 'Node.js', 'PostgreSQL', 'Vercel'],
  },
];

export default function Projects() {
  const smoothRef = useSmoothScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!sectionRef.current || !cubeRef.current) return;

      const sec = sectionRef.current;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const smoothedScrollY = smoothRef.current * maxScroll;

      const start = sec.offsetTop;
      const end = start + sec.offsetHeight - window.innerHeight;

      let p = (smoothedScrollY - start) / (end - start);
      p = Math.max(0, Math.min(1, p));

      const t = p * (N - 1);
      const i = Math.min(Math.floor(t), N - 2);
      const f = easeIO(t - i);
      const a = STOPS[i];
      const b = STOPS[i + 1];
      const rx = a.rx + (b.rx - a.rx) * f;
      const ry = a.ry + (b.ry - a.ry) * f;

      cubeRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;

      const currentIdx = Math.max(0, Math.min(N - 1, Math.round(t)));
      if (currentIdx !== (tick as any)._lastIdx) {
        (tick as any)._lastIdx = currentIdx;
        document.dispatchEvent(new CustomEvent('cube-index', { detail: currentIdx }));
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [smoothRef]);

  useEffect(() => {
    const handler = (e: any) => setActiveIndex(e.detail);
    document.addEventListener('cube-index', handler);
    return () => document.removeEventListener('cube-index', handler);
  }, []);

  const facesConfig = [
    { face: "top", transform: "rotateX(-90deg)" },
    { face: "front", transform: "" },
    { face: "right", transform: "rotateY(90deg)" },
    { face: "back", transform: "rotateY(180deg)" },
    { face: "left", transform: "rotateY(-90deg)" },
    { face: "bottom", transform: "rotateX(90deg)" },
  ];

  const pct = Math.round((activeIndex / (N - 1)) * 100);

  return (
    <section 
      id="projects" 
      ref={sectionRef} 
      style={{
        position: 'relative',
        height: '400vh', // Scrolling space constraints
        background: 'var(--paper)',
      }}
    >
      {/* HUD (Progress / Indicators) */}
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        pointerEvents: 'none', zIndex: 10,
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Top Info line */}
        <div style={{
          position: 'absolute', top: '2rem', right: '3rem',
          textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--muted)',
          fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase'
        }}>
          <div>{String(pct).padStart(3, '0')}%</div>
          <div style={{
            width: '120px', height: '1px', background: 'rgba(255,255,255,0.1)',
            margin: '0.5rem 0 0.5rem auto', position: 'relative'
          }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              background: 'var(--accent)', width: `${pct}%`, transition: 'width 0.2s linear'
            }} />
          </div>
          <div style={{ color: 'var(--accent)', fontSize: '10px' }}>{topProjects[activeIndex].name}</div>
        </div>

        {/* Scene Labels Left */}
        <div style={{
          position: 'absolute', left: '3rem', top: '50%', transform: 'translateY(-50%)',
          display: 'flex', flexDirection: 'column', gap: '8px'
        }}>
          {STOPS.map((_, i) => (
            <div key={i} style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: i === activeIndex ? 'var(--accent)' : 'var(--muted)',
              transform: i === activeIndex ? 'scale(1.8)' : 'scale(1)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>

        {/* Floating Side Info Panel */}
        <div style={{
          position: 'absolute', bottom: '3rem', right: '3rem', 
          maxWidth: '300px', textAlign: 'right',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '56px', lineHeight: 1, letterSpacing: '0.05em', color: '#fff', marginBottom: '0.5rem' }}>
             {topProjects[activeIndex].name}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.1em', marginBottom: '1rem' }}>
             {topProjects[activeIndex].tag}
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: 1.6, color: 'var(--muted)', marginBottom: '1.5rem' }}>
             {topProjects[activeIndex].desc}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'flex-end' }}>
            {topProjects[activeIndex].techs.map((t, i) => (
               <span key={i} style={{
                 padding: '4px 8px', border: '1px solid var(--border)', borderRadius: '2px',
                 fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--charcoal)',
                 background: 'rgba(255,255,255,0.02)'
               }}>{t}</span>
            ))}
          </div>
        </div>

      </div>

      {/* 3D Scene */}
      <div style={{
        position: 'sticky', top: 0, height: '100vh', marginTop: '-100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        perspective: '1400px', pointerEvents: 'none'
      }}>
        {/* CUBE CONTAINER */}
        <div 
          ref={cubeRef}
          style={{
            // The size variable --s is the width/height of the cube
            width: 'clamp(280px, 45vmin, 460px)', 
            height: 'clamp(280px, 45vmin, 460px)',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transform: 'rotateX(90deg) rotateY(0deg)',
            willChange: 'transform',
          }}
        >
          <style>{`
            .cube-face {
              position: absolute; inset: 0;
              backface-visibility: hidden;
              background: repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 48px),
                          repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 48px),
                          #13131A;
              border: 1px solid rgba(123,97,255,0.15);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: inset 0 0 80px rgba(0,0,0,0.8);
            }
            .cube-face::after {
              content: '';
              position: absolute; inset: 0;
              background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.6) 100%);
            }
            .face-number {
              font-family: var(--font-display);
              font-size: clamp(80px, 15vw, 160px);
              color: rgba(255,255,255,0.03);
              user-select: none;
              font-weight: 800;
            }
          `}</style>
          
          {facesConfig.map((f, i) => (
             <div 
               key={f.face} 
               className="cube-face"
               style={{ 
                 transform: `${f.transform} translateZ(clamp(140px, 22.5vmin, 230px))` 
               }}
             >
                <div className="face-number">{(i + 1).toString().padStart(2, '0')}</div>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
