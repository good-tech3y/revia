import Link from "next/link";

export function MoreCard({ type, count }: { type: string; count: number }) {
  return (
    <Link
      href={`/category/${type}`}
      className="flex w-40 shrink-0 flex-col items-center justify-center rounded-2xl border border-dashed border-stone-light bg-surface text-center sm:w-48"
    >
      <span className="text-2xl font-bold text-clay">+{count}</span>
      <span className="mt-1 text-xs font-semibold text-stone">See all</span>
    </Link>
  );
}
