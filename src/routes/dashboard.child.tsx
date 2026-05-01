import { createFileRoute, Link } from "@tanstack/react-router";
import { RoleGuard } from "@/components/RoleGuard";
import { useAuth } from "@/hooks/useAuth";
import { requireRole } from "@/lib/route-guards";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLMS, lessonState } from "@/hooks/useLMS";
import { LESSONS, BADGES, TRACKS } from "@/lib/lessons-catalog";
import { BookOpen, Flame, Trophy, NotebookPen, LogOut, Lock, CheckCircle2, Star } from "lucide-react";

export const Route = createFileRoute("/dashboard/child")({
  beforeLoad: () => requireRole(["child"]),
  component: () => (
    <RoleGuard allow={["child"]}>
      <ChildDashboard />
    </RoleGuard>
  ),
});

function ChildDashboard() {
  const { user, signOut } = useAuth();
  const { data, loading } = useLMS();
  const progress = data?.progress ?? [];
  const stats = data?.stats ?? { total_xp: 0, current_streak: 0, longest_streak: 0, last_active_date: null };
  const badges = data?.badges ?? [];

  const completed = progress.filter((p) => p.completed).length;
  const pct = Math.round((completed / LESSONS.length) * 100);
  const next = LESSONS.find((l) => lessonState(l.id, progress) !== "completed");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Child Dashboard</p>
          <h1 className="font-display text-3xl font-extrabold">Assalam-o-Alaikum, {user?.email?.split("@")[0]} 👋</h1>
          <p className="mt-1 text-muted-foreground">Aaj kuch naya seekho aur apni streak barhao!</p>
        </div>
        <Button variant="outline" size="sm" onClick={signOut}><LogOut className="mr-2 h-4 w-4" />Logout</Button>
      </div>

      {next && !loading && (
        <Card className="mt-6 flex flex-wrap items-center justify-between gap-4 bg-gradient-primary p-6 text-primary-foreground shadow-pop">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider opacity-80">Aglay sabaq</p>
            <p className="font-display text-2xl font-extrabold">{next.title}</p>
            <p className="mt-1 text-sm opacity-90">+{next.xp} XP earn karein</p>
          </div>
          <Button asChild variant="sun" size="lg">
            <Link to={`/lessons/${next.id}` as string}>Continue →</Link>
          </Button>
        </Card>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-center gap-3"><BookOpen className="h-5 w-5 text-primary" /><span className="text-sm text-muted-foreground">Lessons</span></div>
          <p className="mt-2 text-3xl font-bold">{completed}/{LESSONS.length}</p>
          <Progress value={pct} className="mt-3 h-2" />
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3"><Star className="h-5 w-5 text-yellow-500" /><span className="text-sm text-muted-foreground">Total XP</span></div>
          <p className="mt-2 text-3xl font-bold">{data.stats.total_xp}</p>
          <p className="mt-1 text-xs text-muted-foreground">Khud kamaye hue points</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3"><Flame className="h-5 w-5 text-orange-500" /><span className="text-sm text-muted-foreground">Streak</span></div>
          <p className="mt-2 text-3xl font-bold">{data.stats.current_streak} <span className="text-base font-normal text-muted-foreground">din</span></p>
          <p className="mt-1 text-xs text-muted-foreground">Best: {data.stats.longest_streak}</p>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3"><Trophy className="h-5 w-5 text-amber-500" /><span className="text-sm text-muted-foreground">Badges</span></div>
          <p className="mt-2 text-3xl font-bold">{data.badges.length}/{BADGES.length}</p>
          <p className="mt-1 text-xs text-muted-foreground">Inami nishaniyaan</p>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <h2 className="font-display text-xl font-bold">My Lessons</h2>
          <div className="mt-4 space-y-4">
            {TRACKS.map((track) => {
              const trackLessons = LESSONS.filter((l) => l.track === track.key);
              const trackDone = trackLessons.filter((l) => data.progress.find((p) => p.lesson_id === l.id && p.completed)).length;
              return (
                <div key={track.key}>
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{track.label} · {track.age}</p>
                    <p className="text-xs font-bold">{trackDone}/{trackLessons.length}</p>
                  </div>
                  <div className="space-y-2">
                    {trackLessons.map((l) => {
                      const state = lessonState(l.id, data.progress);
                      const row = data.progress.find((p) => p.lesson_id === l.id);
                      return (
                        <div key={l.id} className={`flex items-center justify-between rounded-lg border p-3 ${state === "locked" ? "border-dashed bg-muted/30 opacity-60" : "border-border"}`}>
                          <div className="min-w-0">
                            <p className="truncate font-semibold">{l.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {state === "completed" && row ? `✓ Mukammal · Quiz ${row.quiz_correct}/${row.quiz_total} · +${row.xp_earned} XP` :
                               state === "locked" ? "Locked — pehle wala mukammal karein" :
                               "Shuru karein"}
                            </p>
                          </div>
                          {state === "locked" ? (
                            <Lock className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Button asChild size="sm" variant={state === "completed" ? "outline" : "hero"}>
                              <Link to={`/lessons/${l.id}` as string}>{state === "completed" ? "Review" : "Start"}</Link>
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-display text-xl font-bold">Badges</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {BADGES.map((b) => {
                const earned = data.badges.includes(b.code);
                return (
                  <div key={b.code} className={`rounded-xl border p-3 text-center ${earned ? "border-primary/40 bg-primary-soft" : "border-dashed border-border bg-muted/20 opacity-60"}`}>
                    <div className="text-3xl">{earned ? b.emoji : "🔒"}</div>
                    <p className="mt-1 text-xs font-bold">{b.label}</p>
                    <p className="text-[10px] text-muted-foreground">{b.description}</p>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-xl font-bold">Quick Links</h2>
            <div className="mt-4 space-y-2">
              <Button asChild variant="outline" className="w-full justify-start"><Link to="/notebook"><NotebookPen className="mr-2 h-4 w-4" />My Notebook</Link></Button>
              <Button asChild variant="outline" className="w-full justify-start"><Link to="/lessons">All Lessons</Link></Button>
              <Button asChild variant="outline" className="w-full justify-start"><Link to="/faq">Madad / FAQ</Link></Button>
            </div>
            <div className="mt-4 rounded-lg bg-muted/40 p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mera ID (parent ko share karein)</p>
              <p className="mt-1 break-all font-mono text-[11px]">{user?.id}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
