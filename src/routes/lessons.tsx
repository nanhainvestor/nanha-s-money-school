import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/lessons")({
  head: () => ({
    meta: [
      { title: "The Learning Lab — Money Lessons for Kids | Nanha Investor" },
      { name: "description", content: "Browse Nanha's story-based lessons across Beginner, Intermediate, and Advanced levels — for ages 6 to 14." },
      { property: "og:title", content: "The Learning Lab" },
      { property: "og:description", content: "Story-based money lessons for kids ages 6–14." },
    ],
  }),
  component: LessonsPage,
});

const tracks = [
  {
    level: "Beginner",
    age: "Ages 6–8",
    accent: "bg-primary-soft text-primary",
    lessons: [
      { title: "Needs vs. Wants", desc: "Nanha wants a bike, but only has $5. What does he do?", free: true },
      { title: "Where Money Comes From", desc: "Why grown-ups go to work — and what a job really is.", free: true },
      { title: "The Magic of a Piggy Bank", desc: "Saving = future-you saying thank-you.", free: false },
      { title: "Counting Coins", desc: "A playful trip to a make-believe market.", free: false },
      { title: "Sharing & Giving", desc: "Why kindness is also a kind of wealth.", free: false },
    ],
  },
  {
    level: "Intermediate",
    age: "Ages 9–11",
    accent: "bg-accent-soft text-accent-foreground",
    lessons: [
      { title: "Setting a Money Goal", desc: "Big dreams + tiny weekly steps.", free: true },
      { title: "Budgeting Like a Boss", desc: "The 50-30-20 rule, but kid-sized.", free: false },
      { title: "What Is a Bank?", desc: "A friendly building that babysits your money.", free: false },
      { title: "Earning Beyond Allowance", desc: "Side-hustle ideas that aren't lemonade stands.", free: false },
    ],
  },
  {
    level: "Advanced",
    age: "Ages 12–14",
    accent: "bg-foreground text-background",
    lessons: [
      { title: "What Is Inflation?", desc: "Why the same chocolate costs more next year.", free: true },
      { title: "Stocks Explained Simply", desc: "Owning a tiny slice of a giant company.", free: false },
      { title: "Compound Interest", desc: "The 8th wonder of the world — for real.", free: false },
      { title: "Smart Spending Online", desc: "Spotting hype, ads, and 'too good to be true'.", free: false },
    ],
  },
];

function LessonsPage() {
  return (
    <div>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" /> The Learning Lab
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">Pick a track. Start a story.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Every lesson is a 3-minute story with one tiny idea, one drawing, and one mission for tomorrow.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6">
        {tracks.map((track) => (
          <div key={track.level}>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${track.accent}`}>{track.level}</span>
                <h2 className="mt-3 font-display text-3xl font-extrabold">{track.level} Track</h2>
                <p className="text-sm text-muted-foreground">{track.age} · {track.lessons.length} lessons</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {track.lessons.map((l, i) => {
                const isLive = l.title === "Needs vs. Wants";
                const Wrapper: React.ElementType = isLive ? Link : "article";
                const wrapperProps = isLive ? { to: "/lessons/needs-vs-wants" } : {};
                return (
                  <Wrapper
                    key={l.title}
                    {...wrapperProps}
                    className="group relative flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-pop"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-3xl font-extrabold text-muted-foreground/40">{String(i + 1).padStart(2, "0")}</span>
                      {l.free ? (
                        <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase text-accent-foreground">Free peek</span>
                      ) : (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <h3 className="mt-4 text-lg font-bold">{l.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{l.desc}</p>
                    <div className="mt-5 flex items-center gap-2 text-sm font-bold text-primary">
                      {isLive ? "Start lesson" : l.free ? "Coming soon" : "Save my spot"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-gradient-primary p-10 text-center text-primary-foreground shadow-pop md:p-14">
          <h2 className="font-display text-3xl font-extrabold">Want the full curriculum?</h2>
          <p className="mt-3 text-primary-foreground/90">Get the parent syllabus and follow along week by week.</p>
          <Button asChild variant="sun" size="xl" className="mt-6">
            <Link to="/parents">Open the Parent Center</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
