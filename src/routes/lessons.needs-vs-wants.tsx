import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLMS, markLessonComplete, lessonState } from "@/hooks/useLMS";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Bike,
  CheckCircle2,
  Cookie,
  Heart,
  HelpCircle,
  Lock,
  PiggyBank,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";
import nanhaHero from "@/assets/nanha-hero.png";
import nanhaTeaching from "@/assets/nanha-teaching.png";

export const Route = createFileRoute("/lessons/needs-vs-wants")({
  head: () => ({
    meta: [
      { title: "Needs vs. Wants — A Story with Nanha | Nanha Investor" },
      {
        name: "description",
        content:
          "A 3-minute scrolly-telling lesson where Nanha learns the difference between needs and wants — with a tiny mission to try tomorrow.",
      },
      { property: "og:title", content: "Needs vs. Wants — A Story with Nanha" },
      {
        property: "og:description",
        content: "An interactive money story for kids ages 6–8.",
      },
      { property: "og:image", content: nanhaHero },
      { name: "twitter:image", content: nanhaHero },
    ],
  }),
  component: NeedsVsWantsLesson,
});

type Step = {
  id: string;
  bubble: string;
  caption: string;
  icon: React.ReactNode;
  tone: "primary" | "accent" | "soft";
};

const STEPS: Step[] = [
  {
    id: "intro",
    bubble: "Hi! I'm Nanha. Today I have $5 in my pocket and a BIG question.",
    caption: "Meet Nanha",
    icon: <Sparkles className="h-5 w-5" />,
    tone: "primary",
  },
  {
    id: "want",
    bubble: "I REALLY want a shiny new bike. But… also cookies. Mmm, cookies.",
    caption: "The shiny thing",
    icon: <Bike className="h-5 w-5" />,
    tone: "accent",
  },
  {
    id: "need",
    bubble: "Wait — Mama said I need a notebook for school tomorrow. Uh oh.",
    caption: "The important thing",
    icon: <HelpCircle className="h-5 w-5" />,
    tone: "soft",
  },
  {
    id: "rule",
    bubble: "A NEED is something I must have. A WANT is something nice to have.",
    caption: "The big idea",
    icon: <Wand2 className="h-5 w-5" />,
    tone: "primary",
  },
  {
    id: "choice",
    bubble: "So… notebook first. Cookies can wait. (The bike too — I'll save!)",
    caption: "Nanha decides",
    icon: <PiggyBank className="h-5 w-5" />,
    tone: "accent",
  },
  {
    id: "feel",
    bubble: "Choosing the need first feels grown-up. And kind of awesome.",
    caption: "How it feels",
    icon: <Heart className="h-5 w-5" />,
    tone: "soft",
  },
];

const SORT_ITEMS: { label: string; emoji: string; answer: "need" | "want" }[] = [
  { label: "Drinking water", emoji: "💧", answer: "need" },
  { label: "A new toy car", emoji: "🚗", answer: "want" },
  { label: "Warm jacket in winter", emoji: "🧥", answer: "need" },
  { label: "Ice cream sundae", emoji: "🍨", answer: "want" },
  { label: "Schoolbag", emoji: "🎒", answer: "need" },
  { label: "Video game skin", emoji: "🎮", answer: "want" },
];

function NeedsVsWantsLesson() {
  const { user, loading: authLoading } = useAuth();
  const { data, loading } = useLMS();

  if (authLoading || (user && loading)) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center text-sm text-muted-foreground">
        Sabaq load ho raha hai…
      </div>
    );
  }

  if (user && lessonState("needs-vs-wants", data.progress) === "locked") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-muted">
          <Lock className="h-7 w-7 text-muted-foreground" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-extrabold">Yeh sabaq abhi locked hai</h1>
        <p className="mt-3 text-muted-foreground">Pehla sabaq mukammal karein.</p>
        <Button asChild variant="hero" size="lg" className="mt-6">
          <Link to="/lessons">Lessons par wapas</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <LessonHeader />
      <Scrollytelling />
      <Flowchart />
      <SortGame />
      <Mission />
      <NextLesson />
    </div>
  );
}

function LessonHeader() {
  return (
    <section className="bg-hero">
      <div className="mx-auto max-w-4xl px-4 pt-12 pb-10 sm:px-6">
        <Link
          to="/lessons"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to the Learning Lab
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            Beginner · Lesson 01
          </span>
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
            Ages 6–8 · 3 min
          </span>
        </div>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl">
          Needs vs. Wants
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          A tiny story. One big idea. Scroll slowly — Nanha has things to say.
        </p>
      </div>
    </section>
  );
}

/* -------------------- Scrollytelling -------------------- */

function Scrollytelling() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const step = STEPS[active];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Sticky Nanha + speech bubble */}
        <div className="relative md:sticky md:top-24 md:h-[70vh]">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="relative">
              <SpeechBubble key={step.id} text={step.bubble} tone={step.tone} />
              <img
                src={active % 2 === 0 ? nanhaHero : nanhaTeaching}
                alt="Nanha mascot"
                className="mt-4 h-56 w-56 animate-bob object-contain sm:h-72 sm:w-72"
              />
            </div>
            <div className="mt-4 flex items-center gap-1.5">
              {STEPS.map((s, i) => (
                <span
                  key={s.id}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-8 bg-primary" : "w-3 bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling story panels */}
        <div className="space-y-[40vh] py-[20vh]">
          {STEPS.map((s, i) => (
            <div
              key={s.id}
              data-idx={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className={`rounded-3xl border p-6 shadow-soft transition-all sm:p-8 ${
                i === active
                  ? "border-primary/40 bg-card -translate-y-1 shadow-pop"
                  : "border-border bg-card/60"
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-soft">
                  {s.icon}
                </span>
                Step {i + 1} · {s.caption}
              </div>
              <p className="mt-4 font-display text-2xl font-extrabold leading-snug sm:text-3xl">
                {s.bubble}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpeechBubble({
  text,
  tone,
}: {
  text: string;
  tone: "primary" | "accent" | "soft";
}) {
  const toneClass =
    tone === "primary"
      ? "bg-primary text-primary-foreground"
      : tone === "accent"
        ? "bg-accent text-accent-foreground"
        : "bg-primary-soft text-primary";
  const tailClass =
    tone === "primary"
      ? "bg-primary"
      : tone === "accent"
        ? "bg-accent"
        : "bg-primary-soft";

  return (
    <div className="relative mx-auto max-w-xs animate-fade-up">
      <div
        className={`rounded-3xl px-5 py-4 text-center text-sm font-semibold shadow-pop ${toneClass}`}
      >
        {text}
      </div>
      <div
        className={`absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-sm ${tailClass}`}
      />
    </div>
  );
}

/* -------------------- Flowchart -------------------- */

function Flowchart() {
  const nodes = [
    {
      title: "I see something I'd like.",
      icon: <Cookie className="h-6 w-6" />,
      tone: "bg-accent-soft text-accent-foreground",
    },
    {
      title: "Ask: Do I NEED it, or just WANT it?",
      icon: <HelpCircle className="h-6 w-6" />,
      tone: "bg-primary-soft text-primary",
    },
    {
      title: "Need → take care of it first.",
      icon: <CheckCircle2 className="h-6 w-6" />,
      tone: "bg-primary text-primary-foreground",
    },
    {
      title: "Want → save up, or let it go.",
      icon: <PiggyBank className="h-6 w-6" />,
      tone: "bg-accent text-accent-foreground",
    },
  ];

  return (
    <section className="bg-primary-soft/40 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Target className="h-3.5 w-3.5" /> Nanha's Money Map
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            How to think it through
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            Four little steps. Use them every time money walks into the room.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {nodes.map((n, i) => (
            <li key={n.title} className="relative">
              <div className="flex h-full flex-col items-start gap-3 rounded-3xl border border-border bg-card p-5 shadow-soft">
                <div
                  className={`grid h-12 w-12 place-items-center rounded-2xl ${n.tone}`}
                >
                  {n.icon}
                </div>
                <span className="font-display text-3xl font-extrabold text-muted-foreground/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-bold leading-snug">{n.title}</p>
              </div>
              {i < nodes.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-primary md:block" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------- Sort Game -------------------- */

function SortGame() {
  const { user } = useAuth();
  const [picks, setPicks] = useState<Record<string, "need" | "want" | undefined>>({});
  const [saved, setSaved] = useState(false);
  const correct = SORT_ITEMS.filter((it) => picks[it.label] === it.answer).length;
  const answered = Object.keys(picks).length;
  const done = answered === SORT_ITEMS.length;

  useEffect(() => {
    if (!done || saved || !user) return;
    setSaved(true);
    markLessonComplete({
      lessonId: "needs-vs-wants",
      quizCorrect: correct,
      quizTotal: SORT_ITEMS.length,
    })
      .then((res) => {
        if (res.xpEarned > 0) toast.success(`+${res.xpEarned} XP! Sabaq mukammal 🎉`);
      })
      .catch((e) => {
        console.error(e);
        setSaved(false);
        toast.error("Progress save nahi hua.");
      });
  }, [done, saved, correct, user]);

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground">
          <Sparkles className="h-3.5 w-3.5" /> Try it now
        </span>
        <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
          Tap each one: Need or Want?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          No wrong way to learn. Tap, change your mind, tap again.
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {SORT_ITEMS.map((item) => {
          const pick = picks[item.label];
          const isRight = pick && pick === item.answer;
          const isWrong = pick && pick !== item.answer;
          return (
            <div
              key={item.label}
              className={`flex items-center justify-between gap-3 rounded-2xl border p-4 shadow-soft transition-all ${
                isRight
                  ? "border-primary/40 bg-primary-soft"
                  : isWrong
                    ? "border-destructive/30 bg-destructive/5"
                    : "border-border bg-card"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden>
                  {item.emoji}
                </span>
                <span className="font-bold">{item.label}</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setPicks((p) => ({ ...p, [item.label]: "need" }))
                  }
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                    pick === "need"
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary-soft text-primary hover:brightness-95"
                  }`}
                >
                  Need
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPicks((p) => ({ ...p, [item.label]: "want" }))
                  }
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                    pick === "want"
                      ? "bg-accent text-accent-foreground"
                      : "bg-accent-soft text-accent-foreground hover:brightness-95"
                  }`}
                >
                  Want
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="mt-6 rounded-2xl border border-border bg-card p-5 text-center shadow-soft"
        aria-live="polite"
      >
        {done ? (
          <p className="font-display text-xl font-extrabold text-primary">
            🎉 {correct} of {SORT_ITEMS.length} — Nanha is proud!
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            {answered} of {SORT_ITEMS.length} sorted. Keep going!
          </p>
        )}
      </div>
    </section>
  );
}

/* -------------------- Mission -------------------- */

function Mission() {
  return (
    <section className="px-4 pb-16 sm:px-6">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-gradient-primary p-8 text-primary-foreground shadow-pop md:p-12">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <Target className="h-3.5 w-3.5" /> Try it tomorrow
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
              The 3-Item Mission
            </h2>
            <p className="mt-3 text-primary-foreground/90">
              Tomorrow, find <strong>3 things</strong> in your house. For each one,
              say out loud: <em>"This is a need"</em> or <em>"This is a want."</em>
              Tell a grown-up why. That's it. That's the whole mission.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {[
                "Pick 3 things you can see right now.",
                "Say need or want for each — and why.",
                "Bonus: pick one want you'd save up for.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:block">
            <img
              src={nanhaTeaching}
              alt="Nanha cheering you on"
              className="h-48 w-48 animate-float object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function NextLesson() {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Up next
          </p>
          <p className="font-display text-xl font-extrabold">
            Where Money Comes From
          </p>
        </div>
        <Button asChild variant="hero" size="lg">
          <Link to="/lessons">
            Back to all lessons <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
