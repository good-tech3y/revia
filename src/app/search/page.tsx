"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listResources } from "@/lib/storage";
import { ResourceCard } from "@/components/resource-card";
import type { Resource } from "@/lib/types";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    listResources().then(setResources);
  }, []);

  const results = query.trim()
    ? resources.filter((r) => {
        const q = query.toLowerCase();
        return r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.tags.some((t) => t.toLowerCase().includes(q));
      })
    : [];

  return (
    <main className="mx-auto max-w-md px-6 py-12 sm:max-w-2xl">
      <Link href="/home" className="mb-6 inline-block text-sm text-stone hover:text-ink">‹ Home</Link>
      <h1 className="text-2xl font-bold text-ink">Search</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your library"
        className="mt-4 w-full rounded-xl border border-stone-light bg-surface px-4 py-3 text-base text-ink outline-none focus:border-clay"
        autoFocus
      />
      {query.trim() && (
        <div className="mt-6 flex flex-wrap gap-3">
          {results.length === 0 ? <p className="text-sm text-stone">Nothing matches that yet.</p> : results.map((r) => <ResourceCard key={r.id} resource={r} />)}
        </div>
      )}
    </main>
  );
}
