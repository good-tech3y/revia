import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <Link href="/home" className="mb-8 inline-block text-sm text-stone hover:text-ink">‹ Home</Link>
      <h1 className="text-2xl font-bold text-ink">Terms</h1>
      <p className="mt-2 text-xs text-stone">Last updated September 2026</p>

      <p className="mt-6 text-sm leading-relaxed text-stone">
        Revia is provided as-is, built for the Agents for Humans hackathon, with no warranty of any kind. It's an early-stage project and may change, break, or be discontinued without notice.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-stone">
        You're responsible for the links you choose to save and what you do with the resources Revia surfaces. Don't use Revia to save, process, or organize illegal content.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-stone">
        There's no formal support channel at this stage. If something breaks, your saved data stays on your device regardless, since Revia doesn't hold it anywhere else.
      </p>
    </main>
  );
}
