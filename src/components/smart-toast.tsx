"use client";

import { useEffect, useState } from "react";
import { playChime } from "@/lib/notification-sound";

export function SmartToast({ message, onDone }: { message: string; onDone: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    playChime();

    if (document.hidden && typeof Notification !== "undefined" && Notification.permission === "granted") {
      try {
        new Notification("Revia", { body: message });
      } catch {}
    }

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 350);
    }, 5000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [message, onDone]);

  return (
    <div
      className={`fixed left-4 right-4 top-4 z-50 rounded-2xl bg-ink px-4 py-3 text-white shadow-xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] sm:left-auto sm:right-4 sm:w-80 ${
        visible ? "translate-y-0 scale-100 opacity-100" : "-translate-y-3 scale-95 opacity-0"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-light">Revia noticed something</p>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  );
}
