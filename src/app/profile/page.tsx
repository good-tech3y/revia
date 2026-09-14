"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getProfile, deleteAllData } from "@/lib/storage";
import { useLanguage } from "@/lib/language-context";
import { LANGUAGES } from "@/lib/i18n";
import { playChime } from "@/lib/notification-sound";
import { showSystemNotification } from "@/lib/notify";
import type { Profile } from "@/lib/types";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [notifStatus, setNotifStatus] = useState<NotificationPermission>("default");
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
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
    showSystemNotification("Revia", "This is what a real connection notification looks like.");
  };

  const handleDeleteAll = async () => {
    setDeleting(true);
    await deleteAllData();
    router.push("/");
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
          <p className="mt-1 text-sm text-stone">Blocked. You can turn them on for Revia from your device or browser settings.</p>
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

      <div className="mt-8 rounded-2xl border border-clay-dark p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-clay-dark">Delete my data</p>
        <p className="mt-1 text-sm text-stone">
          There's no account yet, everything lives on this device. This permanently erases your profile and every saved resource here.
        </p>
        {!confirmingDelete ? (
          <button onClick={() => setConfirmingDelete(true)} className="mt-3 rounded-full border border-clay-dark px-4 py-2 text-sm font-semibold text-clay-dark">
            Delete all my data
          </button>
        ) : (
          <div className="mt-3 flex gap-3">
            <button onClick={() => setConfirmingDelete(false)} className="flex-1 rounded-full border border-stone-light px-4 py-2 text-sm font-semibold text-ink">
              Cancel
            </button>
            <button onClick={handleDeleteAll} disabled={deleting} className="flex-1 rounded-full bg-clay-dark px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
              {deleting ? "Deleting..." : "Yes, delete everything"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
