"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallIcon() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    const installedHandler = () => setInstalled(true);
    window.addEventListener("appinstalled", installedHandler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", installedHandler);
    };
  }, []);

  if (!deferredPrompt || installed || dismissed) return null;

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={async () => {
          await deferredPrompt.prompt();
          const choice = await deferredPrompt.userChoice;
          if (choice.outcome === "accepted") setInstalled(true);
          setDeferredPrompt(null);
        }}
        title="Install Revia"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-clay text-white"
      >
        ↓
      </button>
      <button onClick={() => setDismissed(true)} aria-label="Dismiss" className="flex h-6 w-6 items-center justify-center text-sm text-stone">×</button>
    </div>
  );
}
