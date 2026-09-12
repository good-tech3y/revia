"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProfile, listResources, listSpaces } from "@/lib/storage";
import { InstallIcon } from "@/components/install-icon";
import { SideMenu } from "@/components/side-menu";
import { ResourceCard } from "@/components/resource-card";
import { CategoryFilter } from "@/components/category-filter";
import { SmartToast } from "@/components/smart-toast";
import type { Profile, Resource, Space } from "@/lib/types";

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeType, setActiveType] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [p, r, s] = await Promise.all([getProfile(), listResources(), listSpaces()]);
        setProfile(p ?? null);
        setResources(r);
        setSpaces(s);
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

  const presentTypes = Array.from(new Set(resources.map((r) => r.resourceType)));
  const filtered = activeType === "all" ? resources : resources.filter((r) => r.resourceType === activeType);
  const grouped = spaces
    .map((space) => ({ space, items: filtered.filter((r) => r.spaceId === space.id) }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="mx-auto min-h-screen max-w-md sm:max-w-2xl lg:max-w-4xl">
      <header className="flex items-center justify-between px-6 py-4">
        <span className="text-lg font-bold text-clay">Revia</span>
        <div className="flex items-center gap-1">
          <InstallIcon />
          <SideMenu />
        </div>
      </header>

      {toastMessage && <SmartToast message={toastMessage} onDone={() => setToastMessage(null)} />}

      {loading ? (
        <div className="flex min-h-[60vh] items-center justify-center px-6"><p className="text-sm text-stone">Loading your library...</p></div>
      ) : error ? (
        <div className="flex min-h-[60vh] items-center justify-center px-6 text-center"><p className="text-sm text-stone">Revia couldn't reach your device's storage. Try reloading the page.</p></div>
      ) : resources.length === 0 ? (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
          <h1 className="text-2xl font-bold text-ink">{profile ? `Nothing here yet, ${profile.name}.` : "Your Revia library is empty."}</h1>
          <p className="mt-3 text-base leading-relaxed text-stone">Share something useful with Revia and it will organize it for you.</p>
        </div>
      ) : (
        <div className="px-6 pb-24">
          <h1 className="text-2xl font-bold text-ink">Your library</h1>
          <div className="mt-4">
            <CategoryFilter types={presentTypes} active={activeType} onChange={setActiveType} />
          </div>

          {activeType === "all" ? (
            <div className="mt-6 space-y-8">
              {grouped.map(({ space, items }) => (
                <section key={space.id}>
                  <h2 className="text-lg font-semibold text-ink">{space.name}</h2>
                  <div className="mt-3 flex gap-3 overflow-x-auto pb-2 snap-x">
                    {items.map((r) => <ResourceCard key={r.id} resource={r} />)}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-wrap gap-3">
              {filtered.map((r) => <ResourceCard key={r.id} resource={r} />)}
            </div>
          )}
        </div>
      )}

      <Link href="/save" className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-clay text-2xl font-semibold text-white shadow-lg">+</Link>
    </div>
  );
}
