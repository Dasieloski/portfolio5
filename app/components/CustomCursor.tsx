'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseEnterLink = () => cursor.classList.add('hover');
    const onMouseLeaveLink = () => cursor.classList.remove('hover');
    const onMouseDown = () => cursor.classList.add('click');
    const onMouseUp = () => cursor.classList.remove('click');

    const loop = () => {
      const dx = posRef.current.x - currentRef.current.x;
      const dy = posRef.current.y - currentRef.current.y;
      currentRef.current.x += dx * 0.18;
      currentRef.current.y += dy * 0.18;
      cursor.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px) translate(-50%, -50%)`;
      rafRef.current = requestAnimationFrame(loop);
    };

    const addHoverListeners = () => {
      const els = document.querySelectorAll('a, button, [data-cursor="hover"]');
      els.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    addHoverListeners();
    rafRef.current = requestAnimationFrame(loop);

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={cursorRef} id="custom-cursor" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="5" fill="white" />
        <circle cx="16" cy="16" r="10" stroke="rgba(123,97,255,0.8)" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}
