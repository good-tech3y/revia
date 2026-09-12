"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getProfile, saveProfile } from "@/lib/storage";
import type { UserType } from "@/lib/types";

export default function OnboardingPage() {
  const router = useRouter();
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [userType, setUserType] = useState<UserType | null>(null);
  const [organizationName, setOrganizationName] = useState("");
  const [context, setContext] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [saving, setSaving] = useState(false);

  const totalSteps = 4;

  useEffect(() => {
    (async () => {
      const existing = await getProfile();
      if (existing) {
        router.replace("/home");
        return;
      }
      setCheckingProfile(false);
    })();
  }, [router]);

  const canContinue = () => {
    if (step === 0) return name.trim().length > 0;
    if (step === 1) {
      if (!userType) return false;
      if (userType === "organization") return organizationName.trim().length > 0;
      return true;
    }
    if (step === 2) return true;
    if (step === 3) return agreed;
    return false;
  };

  const next = async () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
      return;
    }
    setSaving(true);
    await saveProfile({
      name,
      userType: userType as UserType,
      organizationName: userType === "organization" ? organizationName : undefined,
      contextTags: context.trim() ? [context.trim()] : [],
    });
    router.push("/home");
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  if (checkingProfile) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md items-center justify-center px-6">
        <p className="text-sm text-stone">Loading...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-6 py-12">
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i <= step ? "bg-clay" : "bg-stone-light"
            }`}
          />
        ))}
      </div>

      <div className="mt-12 flex flex-1 flex-col">
        {step === 0 && (
          <div>
            <h1 className="text-2xl font-bold text-ink">What should Revia call you?</h1>
            <p className="mt-2 text-sm text-stone">Just your name, nothing formal.</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="mt-6 w-full rounded-xl border border-stone-light bg-surface px-4 py-3 text-base text-ink outline-none focus:border-clay"
              autoFocus
            />
          </div>
        )}

        {step === 1 && (
          <div>
            <h1 className="text-2xl font-bold text-ink">What best describes you?</h1>
            <p className="mt-2 text-sm text-stone">
              This helps Revia organize things the way you actually think about them.
            </p>
            <div className="mt-6 space-y-3">
              {(
                [
                  { value: "student", label: "Student" },
                  { value: "worker", label: "Worker" },
                  { value: "organization", label: "Organization" },
                ] as { value: UserType; label: string }[]
              ).map((option) => (
                <button
                  key={option.value}
                  onClick={() => setUserType(option.value)}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-base font-medium transition ${
                    userType === option.value
                      ? "border-clay text-clay-dark"
                      : "border-stone-light text-ink"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {userType === "organization" && (
              <input
                type="text"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                placeholder="Organization name"
                className="mt-4 w-full rounded-xl border border-stone-light bg-surface px-4 py-3 text-base text-ink outline-none focus:border-clay"
              />
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-2xl font-bold text-ink">
              What do you spend most of your time on?
            </h1>
            <p className="mt-2 text-sm text-stone">
              Optional, but it helps Revia pick better spaces for what you save.
              For example, "computer science" or "content creation."
            </p>
            <input
              type="text"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g. computer science"
              className="mt-6 w-full rounded-xl border border-stone-light bg-surface px-4 py-3 text-base text-ink outline-none focus:border-clay"
            />
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="text-2xl font-bold text-ink">Almost there</h1>
            <p className="mt-2 text-sm text-stone">
              Revia stores what you save on this device unless you create an
              account later.
            </p>
            <label className="mt-6 flex items-start gap-3 text-sm text-stone">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 accent-clay"
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" className="text-clay underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-clay underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        {step > 0 && (
          <button
            onClick={back}
            className="rounded-full border border-stone-light px-6 py-3 text-base font-semibold text-ink"
          >
            Back
          </button>
        )}
        <button
          onClick={next}
          disabled={!canContinue() || saving}
          className="flex-1 rounded-full bg-clay px-6 py-3 text-base font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-stone-light disabled:text-stone"
        >
          {step === totalSteps - 1 ? (saving ? "Saving..." : "Enter Revia") : "Continue"}
        </button>
      </div>
    </main>
  );
}
