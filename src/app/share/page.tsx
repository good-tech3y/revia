"use client";

import { Suspense, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useSaveResource, PROCESSING_STEPS } from "@/lib/use-save-resource";

function extractUrl(text: string): string | null {
  const match = text.match(/https?:\/\/[^\s]+/);
  return match ? match[0] : null;
}

function ShareContent() {
  const searchParams = useSearchParams();
  const { save, completedSteps, error } = useSaveResource();
  const attempted = useRef(false);

  const rawUrl = searchParams.get("url") ?? "";
  const text = searchParams.get("text") ?? "";
  const resolved = extractUrl(rawUrl) || extractUrl(text) || (rawUrl.startsWith("http") ? rawUrl : null);

  useEffect(() => {
    if (attempted.current || !resolved) return;
    attempted.current = true;
    save(resolved);
  }, [resolved, save]);

  if (!resolved) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-bold text-ink">Nothing to save</h1>
        <p className="mt-3 text-sm text-stone">
          Revia didn't receive a link from that share. Try again, or paste one from Home instead.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-6 py-16">
      <h1 className="text-2xl font-bold text-ink">Saving to Revia</h1>
      <p className="mt-2 break-all text-sm text-stone">{resolved}</p>
      {error && <p className="mt-4 text-sm text-clay-dark">{error}</p>}
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
    </main>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={null}>
      <ShareContent />
    </Suspense>
  );
}
