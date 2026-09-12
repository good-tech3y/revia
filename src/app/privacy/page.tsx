import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <Link href="/home" className="mb-8 inline-block text-sm text-stone hover:text-ink">‹ Home</Link>
      <h1 className="text-2xl font-bold text-ink">Privacy Policy</h1>
      <p className="mt-2 text-xs text-stone">Last updated September 2026</p>

      <h2 className="mt-6 font-semibold text-ink">What Revia stores</h2>
      <p className="mt-2 text-sm leading-relaxed text-stone">
        The profile you set up (your name, whether you're a student, worker, or organization, and anything you shared about your context) and every resource you save, its title, description, tags, and where it lives, are stored locally in your browser on this device. Nothing is stored on a server, since account and cross-device sync haven't been built yet.
      </p>

      <h2 className="mt-6 font-semibold text-ink">What leaves your device</h2>
      <p className="mt-2 text-sm leading-relaxed text-stone">
        When you save a link, that URL and your basic profile type are sent to Revia's backend, which fetches the page and passes relevant details to a third-party AI service (currently Groq) to decide how to describe and organize it. That's the only time data leaves your device, and only for the specific link you just saved.
      </p>

      <h2 className="mt-6 font-semibold text-ink">What Revia doesn't do</h2>
      <p className="mt-2 text-sm leading-relaxed text-stone">
        Doesn't sell your data, doesn't track you across other sites, doesn't share your library with anyone else.
      </p>

      <h2 className="mt-6 font-semibold text-ink">Your control</h2>
      <p className="mt-2 text-sm leading-relaxed text-stone">
        Delete any saved resource at any time from its detail page. Clearing your browser's site data removes everything Revia has stored, since it's all local.
      </p>

      <p className="mt-6 text-sm leading-relaxed text-stone">
        Revia is an early-stage hackathon project. This policy will be updated as account creation and cloud sync are actually built.
      </p>
    </main>
  );
}
