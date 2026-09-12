"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProfile } from "@/lib/storage";
import type { Profile } from "@/lib/types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [notifStatus, setNotifStatus] = useState<NotificationPermission>("default");
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    getProfile().then((p) => setProfile(p ?? null));
    if (typeof Notification !== "undefined") setNotifStatus(Notification.permission);
  }, []);

  const requestNotifications = async () => {
    if (typeof Notification === "undefined") return;
    const result = await Notification.requestPermission();
    setNotifStatus(result);
  };

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <Link href="/home" className="mb-8 inline-block text-sm text-stone hover:text-ink">‹ Home</Link>
      <h1 className="text-2xl font-bold text-ink">Profile</h1>

      <div className="mt-6 rounded-2xl border border-stone-light bg-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone">Name</p>
        <p className="mt-1 text-base text-ink">{profile?.name ?? "Not set"}</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-stone">Type</p>
        <p className="mt-1 text-base capitalize text-ink">{profile?.userType ?? "Not set"}</p>
      </div>

      <div className="mt-4 rounded-2xl border border-stone-light bg-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone">Account</p>
        <p className="mt-1 text-sm text-stone">Your library lives on this device only. Account creation and cross-device sync are coming later.</p>
      </div>

      <div className="mt-4 rounded-2xl border border-stone-light bg-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone">Notifications</p>
        {notifStatus === "granted" ? (
          <p className="mt-1 text-sm text-stone">On. Revia will let you know when it connects something new to what you've already saved.</p>
        ) : notifStatus === "denied" ? (
          <p className="mt-1 text-sm text-stone">Blocked in your browser settings.</p>
        ) : (
          <>
            <p className="mt-1 text-sm text-stone">Get a nudge only when Revia finds a real connection to something you've already saved.</p>
            <button onClick={requestNotifications} className="mt-3 rounded-full bg-clay px-4 py-2 text-sm font-semibold text-white">Turn on</button>
          </>
        )}
      </div>

      <div className="mt-4 rounded-2xl border border-stone-light bg-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-stone">Language</p>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-2 w-full rounded-xl border border-stone-light bg-surface px-3 py-2 text-sm text-ink">
          <option value="en">English</option>
        </select>
        <p className="mt-2 text-xs text-stone">More languages planned, not translated yet.</p>
      </div>
    </main>
  );
}
