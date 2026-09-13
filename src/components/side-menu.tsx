"use client";

import { useState } from "react";
import Link from "next/link";
import { useInstall } from "@/lib/install-context";
import { useLanguage } from "@/lib/language-context";

export function SideMenu() {
  const [open, setOpen] = useState(false);
  const { canInstall, installed, promptInstall } = useInstall();
  const { t } = useLanguage();

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
          <div className="absolute right-0 top-0 flex h-full w-72 flex-col overflow-y-auto bg-paper px-6 py-8 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-lg font-black tracking-tight text-ink">revia</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-2xl text-stone">×</button>
            </div>
            <nav className="mt-8 flex flex-1 flex-col gap-1">
              <Link href="/home" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-stone-light">{t("nav.home")}</Link>
              <Link href="/save" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-stone-light">{t("nav.save")}</Link>
              <Link href="/search" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-stone-light">{t("nav.search")}</Link>
              <Link href="/profile" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-stone-light">{t("nav.profile")}</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-base font-medium text-ink hover:bg-stone-light">{t("nav.about")}</Link>

              {!installed && canInstall && (
                <button onClick={() => promptInstall()} className="mt-2 w-full rounded-xl bg-clay px-3 py-3 text-left text-base font-medium text-white">
                  {t("nav.install")}
                </button>
              )}
            </nav>
            <div className="border-t border-stone-light pt-4">
              <Link href="/privacy" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-stone hover:text-ink">{t("nav.privacy")}</Link>
              <Link href="/terms" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-stone hover:text-ink">{t("nav.terms")}</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
