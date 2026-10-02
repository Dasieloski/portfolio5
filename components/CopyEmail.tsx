"use client";

import { useState } from "react";

export default function CopyEmail({ email, copy, copied }: { email: string; copy: string; copied: string }) {
  const [done, setDone] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      // Reason: clipboard can be blocked; the mailto link above remains the primary path.
    }
  };

  return (
    <button type="button" className="btn btn-line btn-copy" onClick={onCopy}>
      <span aria-live="polite">{done ? copied : copy}</span>
    </button>
  );
}
