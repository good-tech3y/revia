"use client";

import { useState } from "react";
import Link from "next/link";

export function SideMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Open menu" className="flex h-10 w-10 items-center justify-center rounded-full text-ink">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-72 flex-col bg-paper px-6 py-8 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-ink">Revia</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-2xl text-stone">×</button>
            </div>
            <nav className="mt-8 flex flex-1 flex-col gap-1">
              <Link href="/home" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-stone-light">Home</Link>
              <Link href="/save" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-stone-light">Save a link</Link>
              <Link href="/search" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-stone-light">Search</Link>
              <Link href="/profile" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-stone-light">Profile</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-stone-light">About</Link>
            </nav>
            <div className="border-t border-stone-light pt-4">
              <Link href="/privacy" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-stone hover:text-ink">Privacy Policy</Link>
              <Link href="/terms" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-stone hover:text-ink">Terms</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
