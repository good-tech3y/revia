"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { listResources } from "@/lib/storage";
import { ResourceCard } from "@/components/resource-card";
import { TYPE_LABELS } from "@/lib/resource-types";
import type { Resource } from "@/lib/types";

export default function CategoryPage() {
  const params = useParams<{ type: string }>();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listResources().then((all) => {
      setResources(all.filter((r) => r.resourceType === params.type));
      setLoading(false);
    });
  }, [params.type]);

  return (
    <main className="mx-auto max-w-md px-6 py-12 sm:max-w-2xl lg:max-w-4xl">
      <Link href="/home" className="mb-6 inline-block text-sm text-stone hover:text-ink">‹ Home</Link>
      <h1 className="text-2xl font-bold text-ink">{TYPE_LABELS[params.type] ?? params.type}</h1>
      {loading ? (
        <p className="mt-6 text-sm text-stone">Loading...</p>
      ) : resources.length === 0 ? (
        <p className="mt-6 text-sm text-stone">Nothing here yet.</p>
      ) : (
        <div className="mt-6 flex flex-wrap gap-3">
          {resources.map((r) => <ResourceCard key={r.id} resource={r} />)}
        </div>
      )}
    </main>
  );
}
