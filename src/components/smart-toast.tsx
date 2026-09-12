"use client";

import { useEffect, useState } from "react";
import { playChime } from "@/lib/notification-sound";

export function SmartToast({ message, onDone }: { message: string; onDone: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    playChime();
    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      try {
        new Notification("Revia", { body: message });
      } catch {}
    }
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 300);
    }, 5000);
    return () => clearTimeout(timer);
  }, [message, onDone]);

  return (
    <div
      className={`fixed left-4 right-4 top-4 z-50 rounded-2xl bg-ink px-4 py-3 text-white shadow-lg transition-all duration-300 sm:left-auto sm:right-4 sm:w-80 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-stone-light">Revia noticed something</p>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  );
}
