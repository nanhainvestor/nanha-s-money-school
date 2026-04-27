import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, BookOpen, ShieldCheck } from "lucide-react";
import nanhaTeaching from "@/assets/nanha-teaching.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Nanha Investor — Our Mission & Pedagogy" },
      { name: "description", content: "Why Nanha exists: a calm, story-driven approach to teaching kids about money — built by educators, loved by parents." },
      { property: "og:title", content: "About Nanha Investor" },
      { property: "og:description", content: "A calm, story-driven approach to teaching kids about money." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Our story
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Money is a life skill.
            <br /> <span className="text-primary">We teach it like one.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Schools rarely teach financial literacy. Banking apps are too complex. Gaming apps are too loud.
            Nanha sits gently in the middle — pedagogically sound, character-led, and short enough to fit between dinner and bedtime.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
        <img src={nanhaTeaching} alt="Nanha at a whiteboard" loading="lazy" width={1024} height={1024} className="mx-auto w-full max-w-sm" />
        <div>
          <h2 className="font-display text-3xl font-extrabold">Nanha&apos;s philosophy</h2>
          <p className="mt-4 text-muted-foreground">
            Treat the child as an intelligent learner. Replace jargon with stories. Replace screens-for-screens-sake with one tiny idea per day.
          </p>
          <ul className="mt-6 space-y-4">
            {[
              { icon: BookOpen, t: "Story first", d: "Every concept opens with a scenario, not a definition." },
              { icon: Heart, t: "Calm tone", d: "No flashing rewards. No fake currency. Just calm clarity." },
              { icon: ShieldCheck, t: "Parent-trusted", d: "No real money, no bank links, no in-app purchases. Ever." },
            ].map(({ icon: Icon, t, d }) => (
              <li key={t} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
                <div>
                  <p className="font-bold">{t}</p>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-primary-soft/40">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h2 className="font-display text-3xl font-extrabold">What kids learn with Nanha</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { n: "20+", l: "Story lessons" },
              { n: "3", l: "Skill levels" },
              { n: "0", l: "Real money risk" },
            ].map((s) => (
              <div key={s.l} className="rounded-3xl border border-border bg-card p-8 shadow-soft">
                <p className="font-display text-5xl font-extrabold text-primary">{s.n}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
          <Button asChild variant="hero" size="xl" className="mt-10">
            <Link to="/lessons">Take a peek inside</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
