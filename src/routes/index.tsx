import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Heart, Lightbulb, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import nanhaHero from "@/assets/nanha-hero.png";
import nanhaTeaching from "@/assets/nanha-teaching.png";
import piggyBank from "@/assets/piggy-bank.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nanha Investor — Money Lessons Kids Actually Love" },
      { name: "description", content: "Story-driven financial literacy for kids ages 6–14. Calm, screen-friendly lessons designed with parents in mind." },
      { property: "og:title", content: "Nanha Investor — Money Lessons Kids Actually Love" },
      { property: "og:description", content: "Story-driven financial literacy for kids ages 6–14." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Ages 6–14
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Meet <span className="text-primary">Nanha</span>.
              <br />
              The friend who makes <span className="bg-gradient-accent bg-clip-text text-transparent">money make sense.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Calm, story-driven lessons that turn complex money ideas into bite-sized adventures —
              no banking apps, no scary jargon, no screen-time guilt.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/lessons">Start First Lesson <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="soft" size="xl">
                <Link to="/parents">For Parents</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[0,1,2,3].map(i => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent" />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 text-accent">
                  {[...Array(5)].map((_,i)=><Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="font-semibold text-foreground">Loved by 2,000+ curious kids</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-full bg-gradient-accent opacity-20 blur-3xl" />
            <img
              src={nanhaHero}
              alt="Nanha Investor mascot waving and holding a gold coin"
              width={1024}
              height={1024}
              className="mx-auto w-full max-w-md animate-float drop-shadow-xl"
            />
            {/* Floating speech bubble */}
            <div className="absolute left-2 top-6 hidden rounded-2xl bg-card px-4 py-3 shadow-pop md:block">
              <p className="text-sm font-semibold">Hi! I&apos;m Nanha 👋</p>
              <p className="text-xs text-muted-foreground">Let&apos;s learn about money!</p>
            </div>
            <div className="absolute -bottom-2 right-0 hidden rounded-2xl bg-accent px-4 py-2 text-accent-foreground shadow-sun md:block">
              <p className="text-sm font-bold">+ ₹5 saved today</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">How Nanha teaches</h2>
          <p className="mt-4 text-muted-foreground">Three tiny steps. One big habit. Built for short attention spans and big curiosity.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: BookOpen, title: "1. Read a tiny story", desc: "Each lesson is a 3-minute scenario — Nanha wants a bike, but only has $5. What now?" },
            { icon: Lightbulb, title: "2. Spot the idea", desc: "Visual flowcharts and friendly icons reveal the concept hidden inside the story." },
            { icon: Heart, title: "3. Try it tomorrow", desc: "Every lesson ends with a real-life mini-mission your child can do at home." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-pop">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary transition-colors group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CURRICULUM PEEK */}
      <section className="bg-primary-soft/40">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
          <img src={nanhaTeaching} alt="Nanha pointing at a whiteboard graph" loading="lazy" width={1024} height={1024} className="mx-auto w-full max-w-sm animate-bob" />
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
              The Learning Lab
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">A graded path from piggy bank to portfolio</h2>
            <p className="mt-4 text-muted-foreground">Three levels, twenty stories. Designed by educators, illustrated to delight.</p>
            <div className="mt-6 space-y-3">
              {[
                { tag: "Beginner", color: "bg-primary-soft text-primary", title: "Needs vs. Wants", note: "Ages 6–8 · 5 lessons" },
                { tag: "Intermediate", color: "bg-accent-soft text-accent-foreground", title: "Saving & Goals", note: "Ages 9–11 · 8 lessons" },
                { tag: "Advanced", color: "bg-foreground text-background", title: "Investing Basics", note: "Ages 12–14 · 7 lessons" },
              ].map((l) => (
                <div key={l.title} className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 shadow-soft">
                  <div className="flex items-center gap-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${l.color}`}>{l.tag}</span>
                    <div>
                      <p className="font-bold">{l.title}</p>
                      <p className="text-xs text-muted-foreground">{l.note}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
            <Button asChild variant="hero" size="lg" className="mt-8">
              <Link to="/lessons">Explore the Lab</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { quote: "My 8-year-old now asks if a toy is a 'need or want'. Game changer.", name: "Priya, mom of two" },
            { quote: "Finally a money site that doesn't feel like a casino app for kids.", name: "Daniel, dad" },
            { quote: "I love Nanha! He tells the best money stories.", name: "Aarav, age 9" },
          ].map((t) => (
            <figure key={t.name} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <div className="flex gap-0.5 text-accent">
                {[...Array(5)].map((_,i)=><Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 text-foreground">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-muted-foreground">— {t.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA / EMAIL */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-primary p-10 text-primary-foreground shadow-pop md:p-16">
          <img src={piggyBank} alt="" loading="lazy" width={1024} height={1024} className="absolute -bottom-8 -right-8 hidden w-64 opacity-90 md:block" />
          <div className="relative max-w-xl">
            <ShieldCheck className="h-8 w-8 text-accent" />
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">Get the free Money-Smart Kid Starter Kit</h2>
            <p className="mt-3 text-primary-foreground/90">A 12-page printable PDF with 5 mini-lessons you can do with your child this weekend.</p>
            <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="parent@email.com"
                className="h-12 flex-1 rounded-full border-0 bg-background px-5 text-foreground outline-none ring-2 ring-transparent focus:ring-accent"
              />
              <Button type="submit" variant="sun" size="lg">Send my PDF</Button>
            </form>
            <p className="mt-3 text-xs text-primary-foreground/70">No spam. Unsubscribe in one click.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
