import Link from "next/link";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";

const sampleResources = [
  {
    type: "Video",
    space: "Web Development",
    title: "Understanding React Server Components",
    description:
      "A practical walkthrough of how RSCs change data fetching and rendering.",
  },
  {
    type: "Article",
    space: "Career",
    title: "How to negotiate your first job offer",
    description:
      "A framework for evaluating offers beyond just the base salary.",
  },
  {
    type: "Tool",
    space: "Research",
    title: "A note-taking tool for long-form reading",
    description:
      "Built for highlighting and connecting ideas across sources.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="py-16 md:py-24 lg:py-32">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-clay">
              Revia
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-ink md:text-5xl lg:text-6xl">
              You save useful things every day.
            </h1>
            <p className="mt-2 text-4xl font-bold leading-tight text-stone md:text-5xl lg:text-6xl">
              How many do you actually find again?
            </p>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-stone md:text-lg">
              Revia takes responsibility for what you save. Share a link once,
              and it understands it, organizes it, and brings it back when it
              matters.
            </p>
            <Link
              href="/onboarding"
              className="mt-8 inline-block w-fit rounded-full bg-clay px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-clay-dark"
            >
              Get started
            </Link>
          </div>

          <div className="relative hidden h-80 lg:block">
            <div className="absolute left-4 top-8 w-64 -rotate-3 rounded-2xl border border-stone-light bg-surface p-4 shadow-md">
              <span className="inline-block rounded-full bg-stone-light px-2 py-0.5 text-xs font-semibold text-stone">
                Article
              </span>
              <div className="mt-3 h-3 w-4/5 rounded bg-stone-light" />
              <div className="mt-2 h-3 w-3/5 rounded bg-stone-light" />
            </div>
            <div className="absolute right-2 top-24 w-64 rotate-2 rounded-2xl border border-stone-light bg-surface p-4 shadow-lg">
              <span className="inline-block rounded-full bg-clay-dark/10 px-2 py-0.5 text-xs font-semibold text-clay-dark">
                Video
              </span>
              <div className="mt-3 h-3 w-full rounded bg-stone-light" />
              <div className="mt-2 h-3 w-2/3 rounded bg-stone-light" />
            </div>
            <div className="absolute left-16 top-48 w-56 -rotate-1 rounded-2xl border border-stone-light bg-surface p-4 shadow-md">
              <span className="inline-block rounded-full bg-stone-light px-2 py-0.5 text-xs font-semibold text-stone">
                Tool
              </span>
              <div className="mt-3 h-3 w-3/4 rounded bg-stone-light" />
            </div>
          </div>
        </Container>
      </section>

      <Reveal>
        <section className="border-t border-stone-light py-16 md:py-24">
          <Container className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-ink md:text-3xl">
                Saved is not the same as findable.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-stone md:text-lg">
                A bookmark folder doesn't know why you saved something, or
                when you'll need it again. Weeks later, the useful article,
                the tool you meant to try, the tutorial you were halfway
                through, all sit in the same forgotten pile. Revia is built
                to remember on your behalf, not just to store.
              </p>
            </div>
            <div className="mx-auto flex w-full max-w-xs flex-col gap-2">
              {[100, 80, 60, 40, 25].map((width, i) => (
                <div
                  key={i}
                  className="h-8 rounded-lg bg-stone-light"
                  style={{ width: `${width}%`, opacity: 1 - i * 0.15 }}
                />
              ))}
              <p className="mt-2 text-sm text-stone">
                What a saved-links pile usually looks like: a lot going in,
                less and less of it ever opened again.
              </p>
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-t border-stone-light py-16 md:py-24">
          <Container>
            <h2 className="text-2xl font-bold text-ink md:text-3xl">
              This is what organized actually looks like
            </h2>
            <p className="mt-2 text-sm text-stone">
              Example only, your real library starts empty.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sampleResources.map((r) => (
                <div
                  key={r.title}
                  className="rounded-2xl border border-stone-light bg-surface p-5 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-clay-dark/10 px-2 py-0.5 text-xs font-semibold text-clay-dark">
                      {r.type}
                    </span>
                    <span className="text-xs text-stone">{r.space}</span>
                  </div>
                  <p className="mt-3 font-semibold text-ink">{r.title}</p>
                  <p className="mt-1 text-sm text-stone">{r.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-t border-stone-light py-16 md:py-24">
          <Container>
            <h2 className="text-2xl font-bold text-ink md:text-3xl">How it works</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {[
                {
                  n: "1",
                  title: "Share it",
                  body: "Send any link to Revia the moment you find it, straight from your phone's share menu.",
                },
                {
                  n: "2",
                  title: "Revia understands it",
                  body: "It reads the resource, figures out what it actually is, and files it somewhere that makes sense for you.",
                },
                {
                  n: "3",
                  title: "Find it when it matters",
                  body: "Revia brings relevant saves back to you at the right moment, and always tells you why.",
                },
              ].map((step) => (
                <div key={step.n} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-light text-sm font-bold text-clay">
                    {step.n}
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{step.title}</p>
                    <p className="mt-1 text-sm text-stone">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-t border-stone-light py-16 md:py-24">
          <Container>
            <div className="rounded-2xl border border-stone-light bg-surface p-6 md:p-8">
              <h2 className="text-2xl font-bold text-ink md:text-3xl">
                Your data, handled plainly
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone md:text-lg">
                You can use Revia without creating an account; your library
                stays on your device. If a link needs outside processing to
                understand it, Revia will make that clear rather than doing
                it quietly.
              </p>
            </div>
          </Container>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-t border-stone-light py-16 text-center md:py-24">
          <Container>
            <h2 className="text-2xl font-bold text-ink md:text-3xl">
              Save it once. Find it when it matters.
            </h2>
            <Link
              href="/onboarding"
              className="mt-6 inline-block rounded-full bg-clay px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-clay-dark"
            >
              Get started
            </Link>
          </Container>
        </section>
      </Reveal>

      <footer className="border-t border-stone-light py-8">
        <Container className="flex justify-center gap-4 text-sm text-stone">
          <Link href="/privacy" className="hover:text-ink">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-ink">
            Terms
          </Link>
        </Container>
      </footer>
    </main>
  );
}
