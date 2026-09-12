import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <Link href="/home" className="mb-8 inline-block text-sm text-stone hover:text-ink">‹ Home</Link>
      <h1 className="text-2xl font-bold text-ink">About Revia</h1>
      <p className="mt-4 text-base leading-relaxed text-stone">
        Revia takes responsibility for what you save. Share a link once, and it reads it, decides where it belongs, and brings it back when it's actually relevant, instead of letting it disappear into a folder you'll never open again.
      </p>
      <p className="mt-4 text-base leading-relaxed text-stone">
        Built for the Agents for Humans hackathon using the Strands Agents SDK.
      </p>
    </main>
  );
}
