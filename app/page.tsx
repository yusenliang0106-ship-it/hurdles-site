import { Megaphone, Target, TrendingUp } from "lucide-react";

import DemoOne from "@/components/demo";

const strategies = [
  {
    icon: Target,
    title: "Find your audience",
    body: "Pick the two or three platforms where your people already spend time, and go deep there instead of thin everywhere.",
  },
  {
    icon: Megaphone,
    title: "Say one thing well",
    body: "A clear point of view, posted consistently, beats a busy calendar of content nobody remembers.",
  },
  {
    icon: TrendingUp,
    title: "Measure what matters",
    body: "Track saves, shares and sign-ups, not just likes, and let the numbers decide what you make next.",
  },
];

export default function Home() {
  return (
    <main>
      <DemoOne />

      <section className="mx-auto max-w-5xl px-6 py-24">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Online strategies
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Growing online, one channel at a time
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {strategies.map(({ icon: Icon, title, body }) => (
            <article key={title} className="rounded-xl border bg-card p-6 text-card-foreground">
              <Icon className="size-6" aria-hidden />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="h-[60vh] border-t bg-muted/40" aria-hidden />
    </main>
  );
}
