import Link from "next/link";
import { TYPE_LABELS } from "@/lib/resource-types";
import type { Resource } from "@/lib/types";

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link
      href={`/resource/${resource.id}`}
      className="flex w-40 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-stone-light bg-surface shadow-sm transition active:scale-[0.98] sm:w-48"
    >
      <div className="flex h-24 w-full items-center justify-center bg-stone-light sm:h-28">
        {resource.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={resource.thumbnailUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="text-2xl font-bold text-clay">{TYPE_LABELS[resource.resourceType]?.[0] ?? "?"}</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <span className="w-fit rounded-full bg-clay-dark/10 px-2 py-0.5 text-[10px] font-semibold text-clay-dark">
          {TYPE_LABELS[resource.resourceType] ?? "Saved"}
        </span>
        <p className="mt-2 line-clamp-2 text-sm font-semibold text-ink">{resource.title}</p>
      </div>
    </Link>
  );
}
