'use client';

import React, { createContext, useContext, useEffect, useRef } from 'react';

// Expose a ref to avoid re-rendering consumers 60 times a second
const SmoothScrollContext = createContext<React.MutableRefObject<number> | null>(null);

export const useSmoothScroll = () => {
  const context = useContext(SmoothScrollContext);
  if (!context) throw new Error('useSmoothScroll must be used within a SmoothScrollProvider');
  return context;
};

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const smoothRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);
  
  useEffect(() => {
    let maxScroll = 1;
    let tgt = 0;
    let smooth = 0;
    let velocity = 0;

    const FRICTION = 0.85; // From six-faces
    const ease = 0.1;

    let resizeRAF = 0;
    const updateDimensions = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      tgt = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      tgt = Math.max(0, Math.min(1, tgt));
    };

    const handleResize = () => {
      if (!resizeRAF) resizeRAF = requestAnimationFrame(() => {
        updateDimensions();
        resizeRAF = 0;
      });
    };

    const handleScroll = () => {
      tgt = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      tgt = Math.max(0, Math.min(1, tgt));
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const linePx = 16;
      const pagePx = window.innerHeight * 0.9;
      
      const delta =
        e.deltaMode === 1 ? e.deltaY * linePx :
        e.deltaMode === 2 ? e.deltaY * pagePx :
        e.deltaY;
        
      velocity += delta;
      velocity = Math.max(-600, Math.min(600, velocity)); // Clamp velocity
    };

    // Observers and Listeners
    updateDimensions();
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Polyfill for document height change if needed
    const ro = new ResizeObserver(handleResize);
    ro.observe(document.body);

    let lastNow = performance.now();

    const frame = (now: number) => {
      rafRef.current = requestAnimationFrame(frame);
      
      const dt = Math.min((now - lastNow) / 1000, 0.05);
      lastNow = now;

      // Friction logic exactly as in the example
      velocity *= Math.pow(FRICTION, dt * 60);
      if (Math.abs(velocity) < 0.01) velocity = 0;
      
      if (Math.abs(velocity) > 0.2) {
        window.scrollBy({ top: velocity * ease, behavior: 'auto' });
      }

      // Smooth target interpolation
      smooth += (tgt - smooth) * (1 - Math.exp(-dt * 8));
      smooth = Math.max(0, Math.min(1, smooth));

      // Update ref for consumers
      smoothRef.current = smooth;
    };

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resizeRAF) cancelAnimationFrame(resizeRAF);
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={smoothRef}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
