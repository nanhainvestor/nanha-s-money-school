import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLMS, markLessonComplete, lessonState } from "@/hooks/useLMS";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react";
import nanhaHero from "@/assets/nanha-hero.png";
import nanhaTeaching from "@/assets/nanha-teaching.png";

export type LessonStep = {
  caption: string;
  bubble: string;
};

export type FlowNode = {
  title: string;
};

export type QuizQ = {
  q: string;
  options: string[];
  answer: number;
  explain: string;
};

export type LessonNext = {
  title: string;
  to: string;
};

export type LessonContent = {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  lessonNumber: string;
  age: string;
  duration: string;
  intro: string;
  steps: LessonStep[];
  flowTitle: string;
  flowSubtitle: string;
  flow: FlowNode[];
  quizTitle: string;
  quizSubtitle: string;
  quiz: QuizQ[];
  missionTitle: string;
  missionBody: string;
  missionSteps: string[];
  next: LessonNext;
};

const levelStyles = {
  Beginner: "bg-primary-soft text-primary",
  Intermediate: "bg-accent-soft text-accent-foreground",
  Advanced: "bg-foreground text-background",
} as const;

export function LessonTemplate({ content }: { content: LessonContent }) {
  return (
    <LessonGate lessonId={content.id}>
      <Header content={content} />
      <Story content={content} />
      <Flow content={content} />
      <Quiz content={content} />
      <Mission content={content} />
      <NextUp content={content} />
    </LessonGate>
  );
}

function LessonGate({ lessonId, children }: { lessonId: string; children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const { data, loading } = useLMS();

  if (authLoading || (user && loading)) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center text-sm text-muted-foreground">
        Sabaq load ho raha hai…
      </div>
    );
  }

  // Guests can preview lessons (no progress saved). Logged-in users get the gate.
  if (!user) return <>{children}</>;

  const state = lessonState(lessonId, data.progress);
  if (state === "locked") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-muted">
          <Lock className="h-7 w-7 text-muted-foreground" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-extrabold">Yeh sabaq abhi locked hai</h1>
        <p className="mt-3 text-muted-foreground">
          Pehle wala sabaq mukammal karein, phir yeh khul jaye ga.
        </p>
        <div className="mt-6">
          <Button asChild variant="hero" size="lg">
            <Link to="/lessons">Lessons par wapas</Link>
          </Button>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}

function Header({ content }: { content: LessonContent }) {
  return (
    <section className="bg-hero">
      <div className="mx-auto max-w-4xl px-4 pt-12 pb-10 sm:px-6">
        <Link
          to="/lessons"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to all lessons
        </Link>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${levelStyles[content.level]}`}
          >
            {content.level} · Lesson {content.lessonNumber}
          </span>
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
            {content.age} · {content.duration}
          </span>
        </div>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl">
          {content.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{content.intro}</p>
      </div>
    </section>
  );
}

function Story({ content }: { content: LessonContent }) {
  const [active, setActive] = useState(0);
  const step = content.steps[active];

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-soft">
              <Sparkles className="h-4 w-4" />
            </span>
            Step {active + 1} of {content.steps.length} · {step.caption}
          </div>
          <p className="mt-4 font-display text-2xl font-extrabold leading-snug sm:text-3xl">
            {step.bubble}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              variant="soft"
              size="sm"
              onClick={() => setActive((i) => Math.max(0, i - 1))}
              disabled={active === 0}
            >
              <ArrowLeft className="h-4 w-4" /> Previous
            </Button>
            <Button
              variant="hero"
              size="sm"
              onClick={() =>
                setActive((i) => Math.min(content.steps.length - 1, i + 1))
              }
              disabled={active === content.steps.length - 1}
            >
              Next <ArrowRight className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1.5">
              {content.steps.map((s, i) => (
                <button
                  key={s.caption}
                  type="button"
                  aria-label={`Go to step ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-8 bg-primary" : "w-3 bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="order-1 flex justify-center md:order-2">
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-full bg-gradient-accent opacity-20 blur-2xl" />
            <img
              src={active % 2 === 0 ? nanhaHero : nanhaTeaching}
              alt="Nanha mascot"
              className="h-56 w-56 animate-bob object-contain sm:h-72 sm:w-72"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Flow({ content }: { content: LessonContent }) {
  return (
    <section className="bg-primary-soft/40 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-background px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Target className="h-3.5 w-3.5" /> {content.flowTitle}
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
            How to think it through
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            {content.flowSubtitle}
          </p>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-4">
          {content.flow.map((n, i) => (
            <li key={n.title} className="relative">
              <div className="flex h-full flex-col items-start gap-3 rounded-3xl border border-border bg-card p-5 shadow-soft">
                <span className="font-display text-3xl font-extrabold text-primary/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-bold leading-snug">{n.title}</p>
              </div>
              {i < content.flow.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-primary md:block" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Quiz({ content }: { content: LessonContent }) {
  const { user } = useAuth();
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const correct = content.quiz.reduce(
    (s, q, i) => s + (picks[i] === q.answer ? 1 : 0),
    0,
  );
  const answered = Object.keys(picks).length;
  const done = answered === content.quiz.length;

  useEffect(() => {
    if (!done || saved || saving || !user) return;
    setSaving(true);
    markLessonComplete({
      lessonId: content.id,
      quizCorrect: correct,
      quizTotal: content.quiz.length,
    })
      .then((res) => {
        setSaved(true);
        if (res.xpEarned > 0) {
          toast.success(`+${res.xpEarned} XP! Sabaq mukammal 🎉`);
        }
      })
      .catch((e) => {
        console.error(e);
        toast.error("Progress save nahi hua. Dobara koshish karein.");
      })
      .finally(() => setSaving(false));
  }, [done, saved, saving, correct, content.id, content.quiz.length, user]);

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground">
          <Sparkles className="h-3.5 w-3.5" /> {content.quizTitle}
        </span>
        <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
          Quick check
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
          {content.quizSubtitle}
        </p>
      </div>

      <div className="mt-8 space-y-5">
        {content.quiz.map((q, qi) => {
          const pick = picks[qi];
          const picked = pick !== undefined;
          return (
            <div
              key={q.q}
              className="rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <p className="font-display text-lg font-extrabold">
                Q{qi + 1}. {q.q}
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, oi) => {
                  const isPick = pick === oi;
                  const isRight = picked && oi === q.answer;
                  const isWrong = isPick && oi !== q.answer;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setPicks((p) => ({ ...p, [qi]: oi }))}
                      className={`flex items-center justify-between gap-2 rounded-2xl border p-4 text-left text-sm font-semibold transition-all ${
                        isRight
                          ? "border-primary bg-primary-soft text-primary"
                          : isWrong
                            ? "border-destructive/40 bg-destructive/5"
                            : isPick
                              ? "border-primary/40 bg-card"
                              : "border-border bg-card hover:border-primary/30"
                      }`}
                    >
                      <span>{opt}</span>
                      {isRight && <CheckCircle2 className="h-4 w-4 shrink-0" />}
                      {isWrong && <XCircle className="h-4 w-4 shrink-0 text-destructive" />}
                    </button>
                  );
                })}
              </div>
              {picked && (
                <p
                  className={`mt-3 text-sm ${
                    pick === q.answer ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {q.explain}
                </p>
              )}
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
            🎉 {correct} / {content.quiz.length} — Nanha is proud!
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            {answered} / {content.quiz.length} answered. Keep going!
          </p>
        )}
      </div>
    </section>
  );
}

function Mission({ content }: { content: LessonContent }) {
  return (
    <section className="px-4 pb-16 sm:px-6">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-gradient-primary p-8 text-primary-foreground shadow-pop md:p-12">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <Target className="h-3.5 w-3.5" /> Try it tomorrow
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">
              {content.missionTitle}
            </h2>
            <p className="mt-3 text-primary-foreground/90">{content.missionBody}</p>
            <ul className="mt-5 space-y-2 text-sm">
              {content.missionSteps.map((t) => (
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

function NextUp({ content }: { content: LessonContent }) {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Up next
          </p>
          <p className="font-display text-xl font-extrabold">{content.next.title}</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="soft" size="lg">
            <Link to="/lessons">All lessons</Link>
          </Button>
          <Button asChild variant="hero" size="lg">
            <Link to={content.next.to}>
              Next lesson <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
