"use client";

import { useState } from "react";
import Link from "next/link";
import { useSaveResource, PROCESSING_STEPS } from "@/lib/use-save-resource";

export default function SavePage() {
  const [url, setUrl] = useState("");
  const { save, processing, completedSteps, error } = useSaveResource();

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-6 py-16">
      {!processing && (
        <Link href="/home" className="mb-8 text-sm text-stone hover:text-ink">
          ‹ Home
        </Link>
      )}
      <h1 className="text-2xl font-bold text-ink">Save a link</h1>
      <p className="mt-2 text-sm text-stone">
        Paste a URL below, or once Revia's installed, share any link to it directly from other apps.
      </p>

      {!processing && (
        <>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            className="mt-6 w-full rounded-xl border border-stone-light bg-surface px-4 py-3 text-base text-ink outline-none focus:border-clay"
            autoFocus
          />
          {error && <p className="mt-3 text-sm text-clay-dark">{error}</p>}
          <button
            onClick={() => save(url)}
            disabled={!url.trim()}
            className="mt-6 rounded-full bg-clay px-6 py-3 text-base font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-stone-light disabled:text-stone"
          >
            Save to Revia
          </button>
        </>
      )}

      {processing && (
        <ul className="mt-10 space-y-4">
          {PROCESSING_STEPS.map((step) => {
            const done = completedSteps.includes(step);
            return (
              <li key={step} className="flex items-center gap-3">
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${done ? "bg-clay text-white" : "bg-stone-light text-stone"}`}>
                  {done ? "✓" : ""}
                </span>
                <span className={done ? "text-ink" : "text-stone"}>{step}</span>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
