import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Lock, Sparkles, Trophy } from "lucide-react";
import { LESSONS, TRACKS, type LessonMeta } from "@/lib/lessons-catalog";
import { useLMS, lessonState } from "@/hooks/useLMS";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/lessons/")({
  head: () => ({
    meta: [
      { title: "Sabaq — Bachon ke Liye Paisay ki Taleem | Nanha Investor" },
      { name: "description", content: "Nanha ke kahani par mabni sabaq — Beginner, Intermediate aur Advanced — har sabaq ke baad agla unlock." },
      { property: "og:title", content: "Sabaq ka Lab — Mini LMS" },
      { property: "og:description", content: "Bachon ke liye sequential paisay ki taleem, XP aur streak ke saath." },
    ],
  }),
  component: LessonsPage,
});

const trackAccent: Record<LessonMeta["track"], string> = {
  beginner: "bg-primary-soft text-primary",
  intermediate: "bg-accent-soft text-accent-foreground",
  advanced: "bg-foreground text-background",
};

function LessonsPage() {
  const { user } = useAuth();
  const { data, loading } = useLMS();

  return (
    <div>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Sabaq ka Lab
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">Track chunein. Kahani shuru karein.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Har sabaq aik 3 minute ki kahani hai. Ek sabaq mukammal karein — agla khud unlock ho jaye ga.
          </p>
          {user && !loading && (
            <div className="mt-6 inline-flex items-center gap-4 rounded-full border border-border bg-card px-5 py-2 text-sm shadow-soft">
              <span className="inline-flex items-center gap-1.5 font-bold text-primary">
                <Trophy className="h-4 w-4" /> {data.stats.total_xp} XP
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold text-orange-500">
                🔥 {data.stats.current_streak} din streak
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold">
                ✓ {data.progress.filter((p) => p.completed).length}/{LESSONS.length}
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6">
        {TRACKS.map((track) => {
          const trackLessons = LESSONS.filter((l) => l.track === track.key);
          return (
            <div key={track.key}>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${trackAccent[track.key]}`}>{track.label}</span>
                  <h2 className="mt-3 font-display text-3xl font-extrabold">{track.label} Track</h2>
                  <p className="text-sm text-muted-foreground">{track.age} · {trackLessons.length} sabaq</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {trackLessons.map((l) => {
                  const state = user ? lessonState(l.id, data.progress) : "available";
                  const row = data.progress.find((p) => p.lesson_id === l.id);
                  const isLocked = state === "locked";
                  const isDone = state === "completed";
                  const inner = (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-3xl font-extrabold text-muted-foreground/40">
                          {String(l.trackOrder).padStart(2, "0")}
                        </span>
                        {isLocked ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                            <Lock className="h-3 w-3" /> Locked
                          </span>
                        ) : isDone ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-bold uppercase text-green-700 dark:bg-green-950/40 dark:text-green-300">
                            <CheckCircle2 className="h-3 w-3" /> Done
                          </span>
                        ) : (
                          <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase text-accent-foreground">+{l.xp} XP</span>
                        )}
                      </div>
                      <h3 className="mt-4 text-lg font-bold">{l.title}</h3>
                      {row?.completed && row.quiz_total > 0 && (
                        <p className="mt-1 text-xs text-muted-foreground">Quiz: {row.quiz_correct}/{row.quiz_total}</p>
                      )}
                      <div className={`mt-5 flex items-center gap-2 text-sm font-bold ${isLocked ? "text-muted-foreground" : "text-primary"}`}>
                        {isLocked ? "Pehle wala mukammal karein" : isDone ? "Review" : state === "in-progress" ? "Continue" : "Start Lesson"}
                        {!isLocked && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                      </div>
                    </>
                  );

                  if (isLocked) {
                    return (
                      <div
                        key={l.id}
                        aria-disabled
                        className="group relative flex cursor-not-allowed flex-col rounded-3xl border border-dashed border-border bg-muted/30 p-6 opacity-70"
                      >
                        {inner}
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={l.id}
                      to={`/lessons/${l.id}` as string}
                      className="group relative flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-pop"
                    >
                      {inner}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-gradient-primary p-10 text-center text-primary-foreground shadow-pop md:p-14">
          <h2 className="font-display text-3xl font-extrabold">Mukammal curriculum chahiye?</h2>
          <p className="mt-3 text-primary-foreground/90">Sirf Rs 499 / mahina. Walidain syllabus aur weekly tips bhi shamil.</p>
          <Button asChild variant="sun" size="xl" className="mt-6">
            <Link to="/parents">Open Parents Center</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
