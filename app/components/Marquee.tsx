const ITEMS = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'MongoDB',
  'Docker', 'AWS', 'GraphQL', 'Nest.js', 'Tailwind CSS', 'REST API',
  'React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'MongoDB',
  'Docker', 'AWS', 'GraphQL', 'Nest.js', 'Tailwind CSS', 'REST API',
];

export default function Marquee() {
  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      overflow: 'hidden',
      background: 'var(--surface)',
      padding: '14px 0',
    }}>
      <div style={{
        display: 'flex',
        gap: 0,
        animation: 'marquee 28s linear infinite',
        whiteSpace: 'nowrap',
        willChange: 'transform',
      }}>
        {ITEMS.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            padding: '0 1.5rem',
          }}>
            {item}
            <span style={{ color: 'var(--accent)', padding: '0 0.75rem' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
