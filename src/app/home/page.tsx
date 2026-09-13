"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProfile, listResources } from "@/lib/storage";
import { SideMenu } from "@/components/side-menu";
import { ResourceCard } from "@/components/resource-card";
import { MoreCard } from "@/components/more-card";
import { SmartToast } from "@/components/smart-toast";
import { Wordmark } from "@/components/wordmark";
import { useLanguage } from "@/lib/language-context";
import { TYPE_LABELS, TYPE_ORDER } from "@/lib/resource-types";
import type { Profile, Resource } from "@/lib/types";

const PREVIEW_COUNT = 5;

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    (async () => {
      try {
        const [p, r] = await Promise.all([getProfile(), listResources()]);
        setProfile(p ?? null);
        setResources(r);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
    const msg = sessionStorage.getItem("revia:notification");
    if (msg) {
      setToastMessage(msg);
      sessionStorage.removeItem("revia:notification");
    }
  }, []);

  const presentTypes = TYPE_ORDER.filter((type) => resources.some((r) => r.resourceType === type));

  return (
    <div className="mx-auto min-h-screen max-w-md sm:max-w-2xl lg:max-w-4xl">
      <header className="flex items-center justify-between px-6 py-4">
        <Wordmark className="text-2xl" />
        <SideMenu />
      </header>

      {toastMessage && <SmartToast message={toastMessage} onDone={() => setToastMessage(null)} />}

      {loading ? (
        <div className="flex min-h-[60vh] items-center justify-center px-6"><p className="text-sm text-stone">{t("home.loading")}</p></div>
      ) : error ? (
        <div className="flex min-h-[60vh] items-center justify-center px-6 text-center"><p className="text-sm text-stone">{t("home.error")}</p></div>
      ) : resources.length === 0 ? (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
          <h1 className="text-2xl font-bold text-ink">
            {profile ? t("home.emptyTitleNamed", { name: profile.name }) : t("home.emptyTitle")}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-stone">{t("home.emptySubtitle")}</p>
        </div>
      ) : (
        <div className="space-y-8 px-6 pb-24 pt-2">
          <h1 className="text-2xl font-bold text-ink">{t("home.library")}</h1>
          {presentTypes.map((type) => {
            const items = resources.filter((r) => r.resourceType === type);
            const preview = items.slice(0, PREVIEW_COUNT);
            const remaining = items.length - PREVIEW_COUNT;
            return (
              <section key={type}>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-ink">{TYPE_LABELS[type] ?? type}</h2>
                  {remaining > 0 && <Link href={`/category/${type}`} className="text-sm font-medium text-clay">{t("common.more")}</Link>}
                </div>
                <div className="mt-3 flex gap-3 overflow-x-auto pb-2 snap-x">
                  {preview.map((r) => <ResourceCard key={r.id} resource={r} />)}
                  {remaining > 0 && <MoreCard type={type} count={remaining} />}
                </div>
              </section>
            );
          })}
        </div>
      )}

      <Link href="/save" className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-clay text-2xl font-semibold text-white shadow-lg">+</Link>
    </div>
  );
}
