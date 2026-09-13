"use client";

import { useState } from "react";
import { useInstall } from "@/lib/install-context";

export function InstallIcon() {
  const { canInstall, installed, promptInstall } = useInstall();
  const [dismissed, setDismissed] = useState(false);

  if (!canInstall || installed || dismissed) return null;

  return (
    <div className="flex items-center gap-1">
      <button onClick={() => promptInstall()} title="Install Revia" className="flex h-10 w-10 items-center justify-center rounded-full bg-clay text-white">↓</button>
      <button onClick={() => setDismissed(true)} aria-label="Dismiss" className="flex h-6 w-6 items-center justify-center text-sm text-stone">×</button>
    </div>
  );
}
