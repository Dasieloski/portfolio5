/** Re-mounts on every navigation, so the fade in base.css plays as a page transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
