"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProfile } from "@/lib/storage";
import { useLanguage } from "@/lib/language-context";
import { LANGUAGES } from "@/lib/i18n";
import { playChime } from "@/lib/notification-sound";
import type { Profile } from "@/lib/types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [notifStatus, setNotifStatus] = useState<NotificationPermission>("default");
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    getProfile().then((p) => setProfile(p ?? null));
    if (typeof Notification !== "undefined") setNotifStatus(Notification.permission);
  }, []);

  const requestNotifications = async () => {
    if (typeof Notification === "undefined") return;
    const result = await Notification.requestPermission();
    setNotifStatus(result);
  };

  const sendTestNotification = () => {
    playChime();
    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
      try {
        new Notification("Revia", { body: "This is what a real connection notification looks like." });
      } catch {}
    }
  };

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <Link href="/home" className="mb-8 inline-block text-sm text-stone hover:text-ink">‹ {t("common.backHome")}</Link>
      <h1 className="text-2xl font-bold text-ink">{t("profile.title")}</h1>

      <div className="mt-6 rounded-2xl border border-stone-light bg-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone">{t("profile.name")}</p>
        <p className="mt-1 text-base text-ink">{profile?.name ?? "-"}</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-stone">{t("profile.type")}</p>
        <p className="mt-1 text-base capitalize text-ink">{profile?.userType ?? "-"}</p>
      </div>

      <div className="mt-4 rounded-2xl border border-stone-light bg-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone">{t("profile.account")}</p>
        <p className="mt-1 text-sm text-stone">{t("profile.accountBody")}</p>
      </div>

      <div className="mt-4 rounded-2xl border border-stone-light bg-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone">{t("profile.notifications")}</p>

        {notifStatus === "granted" ? (
          <>
            <p className="mt-1 text-sm text-stone">On. Revia will let you know when it connects something new to what you've already saved.</p>
            <button onClick={sendTestNotification} className="mt-3 rounded-full border border-stone-light px-4 py-2 text-sm font-semibold text-ink">
              Send a test
            </button>
          </>
        ) : notifStatus === "denied" ? (
          <>
            <p className="mt-1 text-sm text-stone">Blocked. A website can't turn this back on for you, browsers require you to do it directly, but it's quick:</p>
            <div className="mt-3 space-y-2 rounded-xl bg-stone-light p-3 text-xs text-stone">
              <p><strong>Android Chrome:</strong> tap the lock icon left of the address bar, then Permissions, then turn Notifications on.</p>
              <p><strong>iPhone/iPad:</strong> Settings app, then Notifications, find Revia (only appears once it's installed to your home screen).</p>
            </div>
          </>
        ) : (
          <>
            <p className="mt-1 text-sm text-stone">Get a nudge only when Revia finds a real connection to something you've already saved, never a generic reminder.</p>
            <button onClick={requestNotifications} className="mt-3 rounded-full bg-clay px-4 py-2 text-sm font-semibold text-white">Turn on</button>
          </>
        )}
      </div>

      <div className="mt-4 rounded-2xl border border-stone-light bg-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone">{t("profile.language")}</p>
        <select value={language} onChange={(e) => setLanguage(e.target.value as typeof language)} className="mt-2 w-full rounded-xl border border-stone-light bg-surface px-3 py-2 text-sm text-ink">
          {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
        </select>
        <p className="mt-2 text-xs text-stone">Applies to the app's interface and to how Revia writes new descriptions.</p>
      </div>
    </main>
  );
}
