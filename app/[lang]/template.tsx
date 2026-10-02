/** Re-mounts on every navigation, so the wipe in globals.css plays as a page transition. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
