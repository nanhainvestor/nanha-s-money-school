import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, ShieldCheck, CheckCircle2, Sparkles, TrendingUp, Trophy, Clock, Flame, Bell, Heart } from "lucide-react";
import {
  getLessonProgress,
  getCurrentStreak,
  getWeekActivity,
  getDaysSinceLastActivity,
  type LessonProgress,
} from "@/lib/progress";

export const Route = createFileRoute("/parents")({
  head: () => ({
    meta: [
      { title: "Walidain Center — Curriculum, Hifazat aur Resources | Nanha Investor" },
      { name: "description", content: "Walidain ke liye sab kuch — mukammal curriculum, FAQ, hifazati waada aur downloadable kit. Qeematein Rs / PKR mein." },
      { property: "og:title", content: "Walidain Center — Nanha Investor" },
      { property: "og:description", content: "Walidain ke liye curriculum, hifazat aur downloads." },
    ],
  }),
  component: ParentsPage,
});

const faqs = [
  { q: "Kya asli paisay ka len-den hota hai?", a: "Nahi. Nanha kabhi bank login, asli paisay, ya in-app purchase nahi mangta. Sabaq sirf taleemi hain." },
  { q: "Yeh konsi umar ke liye hai?", a: "6 se 14 saal ke bachon ke liye — Beginner, Intermediate aur Advanced teen tracks mein." },
  { q: "Aik sabaq kitna lamba hota hai?", a: "Tagriban 3–5 minute parhne ka + 5 minute ka mini-mission jo aap bachay ke saath karte hain." },
  { q: "Kya account chahiye?", a: "Free sabaq ke liye nahi. Progress tracking ke liye account jald aa raha hai." },
  { q: "Kya site bachon ke liye akele istemal ke liye mehfooz hai?", a: "Haan — koi chat nahi, koi ads nahi, koi external link sabaq mein nahi." },
];

function ParentsPage() {
  return (
    <div>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Walidain Center
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">Aik mukammal aur qabil-e-aitmaad paisay ka curriculum</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            See exactly what your child is learning, in what order, and why.
          </p>
        </div>
      </section>

      <ProgressSummary />
      <WeeklyStreak />


      {/* Roadmap */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-extrabold">Curriculum ka naqsha</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { t: "Module 1 — Money Basics", items: ["Needs vs. Wants", "Where Money Comes From", "Coins & Notes"] },
            { t: "Module 2 — Saving & Goals", items: ["Setting Goals", "Budgeting Basics", "The Reward of Patience"] },
            { t: "Module 3 — Growing Money", items: ["Understanding Banks", "Inflation", "Intro to Investing"] },
          ].map((m) => (
            <div key={m.t} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <h3 className="font-bold">{m.t}</h3>
              <ul className="mt-4 space-y-2">
                {m.items.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Safety */}
      <section className="bg-primary-soft/40">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div>
            <ShieldCheck className="h-10 w-10 text-primary" />
            <h2 className="mt-3 font-display text-3xl font-extrabold">Hamara hifazati waada</h2>
            <p className="mt-3 text-muted-foreground">
              Nanha Investor is ad-free, chat-free, purchase-free, and bank-free. We collect your email only if you choose to receive the starter kit — and you can unsubscribe in one click.
            </p>
          </div>
          <ul className="space-y-3">
            {[
              "Asli paisay ka len-den kabhi nahi",
              "Sabaq mein koi third-party ad ya tracker nahi",
              "Koi social feature ya chat nahi",
              "COPPA ke usooloon par data handling",
            ].map((s) => (
              <li key={s} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-semibold">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-extrabold text-center">Walidain ke Sawal Jawab</h2>
        <div className="mt-8 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-border bg-card p-5 shadow-soft open:shadow-pop">
              <summary className="cursor-pointer list-none font-bold marker:hidden">
                <span className="flex items-center justify-between">
                  {f.q}
                  <span className="ml-4 text-primary transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Download */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-gradient-primary p-10 text-center text-primary-foreground shadow-pop md:p-14">
          <Download className="mx-auto h-10 w-10 text-accent" />
          <h2 className="mt-4 font-display text-3xl font-extrabold">Mukammal syllabus download karein</h2>
          <p className="mt-3 text-primary-foreground/90">Har sabaq, umar group aur ghar par mission ka printable PDF. Bilkul muft (Rs 0).</p>
          <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="walid@email.com"
              className="h-12 flex-1 rounded-full border-0 bg-background px-5 text-foreground outline-none ring-2 ring-transparent focus:ring-accent"
            />
            <Button type="submit" variant="sun" size="lg">Download Syllabus</Button>
          </form>
        </div>
      </section>
    </div>
  );
}

/* -------------------- Progress Summary -------------------- */

const TRACKED_LESSONS: { id: string; title: string; module: string }[] = [
  { id: "needs-vs-wants", title: "Needs vs. Wants", module: "Module 1 — Money Basics" },
];

function ProgressSummary() {
  const [progressMap, setProgressMap] = useState<Record<string, LessonProgress | undefined>>({});

  useEffect(() => {
    const load = () => {
      const next: Record<string, LessonProgress | undefined> = {};
      for (const l of TRACKED_LESSONS) next[l.id] = getLessonProgress(l.id);
      setProgressMap(next);
    };
    load();
    const onUpdate = () => load();
    window.addEventListener("nanha:progress-updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("nanha:progress-updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  const completedCount = TRACKED_LESSONS.filter((l) => progressMap[l.id]?.completed).length;
  const totalCorrect = TRACKED_LESSONS.reduce((s, l) => s + (progressMap[l.id]?.quizCorrect ?? 0), 0);
  const totalQuestions = TRACKED_LESSONS.reduce((s, l) => s + (progressMap[l.id]?.quizTotal ?? 0), 0);
  const overallPct = TRACKED_LESSONS.length
    ? Math.round((completedCount / TRACKED_LESSONS.length) * 100)
    : 0;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <TrendingUp className="h-3.5 w-3.5" /> Aap ke bachay ki progress
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold">Progress ka khulasa</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Is device par save. Mukammal sabaq aur quiz scores ka record.
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mukammal</p>
          <p className="font-display text-3xl font-extrabold text-primary">{overallPct}%</p>
        </div>
      </div>

      {/* Top stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          label="Mukammal sabaq"
          value={`${completedCount} / ${TRACKED_LESSONS.length}`}
        />
        <StatCard
          icon={<Trophy className="h-5 w-5" />}
          label="Quiz score"
          value={totalQuestions ? `${totalCorrect} / ${totalQuestions}` : "—"}
        />
        <StatCard
          icon={<Clock className="h-5 w-5" />}
          label="Aakhri activity"
          value={
            Object.values(progressMap)
              .filter(Boolean)
              .sort((a, b) => (b!.updatedAt > a!.updatedAt ? 1 : -1))[0]
              ? new Date(
                  Object.values(progressMap)
                    .filter(Boolean)
                    .sort((a, b) => (b!.updatedAt > a!.updatedAt ? 1 : -1))[0]!.updatedAt,
                ).toLocaleDateString()
              : "—"
          }
        />
      </div>

      {/* Per-lesson rows */}
      <div className="mt-6 space-y-3">
        {TRACKED_LESSONS.map((l) => {
          const p = progressMap[l.id];
          const score = p && p.quizTotal ? Math.round((p.quizCorrect / p.quizTotal) * 100) : 0;
          return (
            <div
              key={l.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {l.module}
                </p>
                <p className="font-display text-lg font-extrabold">{l.title}</p>
                <div className="mt-3 flex items-center gap-3">
                  <Progress value={score} className="h-2 max-w-xs" />
                  <span className="text-xs font-bold text-muted-foreground">
                    {p ? `${p.quizCorrect}/${p.quizTotal} sahi` : "Shuru nahi kiya"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {p?.completed ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Mukammal
                  </span>
                ) : (
                  <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                    Jari hai
                  </span>
                )}
                <Button asChild variant="soft" size="sm">
                  <Link to="/lessons/needs-vs-wants">{p ? "Review Again" : "Start Lesson"}</Link>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-center gap-2 text-primary">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary-soft">{icon}</span>
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
      </div>
      <p className="mt-3 font-display text-2xl font-extrabold">{value}</p>
    </div>
  );
}

/* -------------------- Weekly Streak + Reminder -------------------- */

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function WeeklyStreak() {
  const [streak, setStreak] = useState(0);
  const [week, setWeek] = useState<{ date: Date; key: string; active: boolean }[]>([]);
  const [daysSince, setDaysSince] = useState<number | null>(null);

  useEffect(() => {
    const load = () => {
      setStreak(getCurrentStreak());
      setWeek(getWeekActivity());
      setDaysSince(getDaysSinceLastActivity());
    };
    load();
    const onUpdate = () => load();
    window.addEventListener("nanha:progress-updated", onUpdate);
    window.addEventListener("storage", onUpdate);
    return () => {
      window.removeEventListener("nanha:progress-updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  const activeThisWeek = week.filter((d) => d.active).length;
  const todayKey = week[week.length - 1]?.key;

  // Reminder copy based on recency.
  let reminder: { tone: "celebrate" | "nudge" | "welcome"; title: string; body: string } = {
    tone: "welcome",
    title: "Bachay ke saath pehla sabaq shuru karein",
    body: "Aaj sirf 5 minute bachay ke paas baithein. Chhoti aadat lambay lecture se behtar hai.",
  };
  if (daysSince === 0) {
    reminder = {
      tone: "celebrate",
      title: streak > 1 ? `${streak} din ka streak — kamaal!` : "Aaj ka sabaq mukammal 🎉",
      body: "Puchhein: 'Aaj paisay ke baray mein kya naya seekha?' Sun-na hi sab se bara sabaq hai.",
    };
  } else if (daysSince === 1) {
    reminder = {
      tone: "nudge",
      title: "Streak ko zinda rakhein 🔥",
      body: "Aik din ho gaya hai. Aaj raat 3 minute ka sabaq aadat ko zinda rakhega.",
    };
  } else if (daysSince !== null && daysSince > 1) {
    reminder = {
      tone: "nudge",
      title: `${daysSince} din ho gaye — pyar se dobara shuru karein?`,
      body: "Koi dabao nahi. Aik chhota sabaq mil kar karein — raftaar jaldi wapas aati hai.",
    };
  }

  const toneStyles = {
    celebrate: "bg-accent-soft text-accent-foreground",
    nudge: "bg-primary-soft text-primary",
    welcome: "bg-muted text-foreground",
  } as const;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
      <div className="grid gap-5 md:grid-cols-3">
        {/* Streak card */}
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent-foreground">
                <Flame className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Haftawar streak
                </p>
                <p className="font-display text-2xl font-extrabold">
                  {streak} {streak === 1 ? "din" : "din"} musalsal
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">{activeThisWeek}</span> / 7 din is hafte active
            </p>
          </div>

          <div className="mt-5 grid grid-cols-7 gap-2">
            {week.map((d, i) => {
              const isToday = d.key === todayKey;
              return (
                <div key={d.key} className="flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {DAY_LABELS[d.date.getDay()]}
                  </span>
                  <div
                    className={[
                      "grid h-10 w-full place-items-center rounded-xl text-xs font-bold transition-all",
                      d.active
                        ? "bg-gradient-primary text-primary-foreground shadow-soft"
                        : "bg-muted text-muted-foreground",
                      isToday && !d.active ? "ring-2 ring-primary/40" : "",
                      isToday ? "scale-105" : "",
                    ].join(" ")}
                    aria-label={`${d.key} ${d.active ? "active" : "inactive"}`}
                  >
                    {d.active ? <Flame className="h-4 w-4" /> : d.date.getDate()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reminder card */}
        <div className={`rounded-3xl border border-border p-6 shadow-soft ${toneStyles[reminder.tone]}`}>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-background/60">
              {reminder.tone === "celebrate" ? (
                <Heart className="h-4.5 w-4.5" />
              ) : (
                <Bell className="h-4.5 w-4.5" />
              )}
            </span>
            <p className="text-xs font-bold uppercase tracking-wider opacity-80">Pyar bhari yaad-dahani</p>
          </div>
          <h3 className="mt-4 font-display text-xl font-extrabold leading-tight">{reminder.title}</h3>
          <p className="mt-2 text-sm opacity-90">{reminder.body}</p>
          <Button asChild variant="soft" size="sm" className="mt-5">
            <Link to="/lessons">{daysSince === 0 ? "Kal ka sabaq chunein" : "Sabaq ka Lab kholein"}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
