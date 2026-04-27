import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RoleGuard } from "@/components/RoleGuard";
import { useAuth } from "@/hooks/useAuth";
import { requireRole } from "@/lib/route-guards";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getAllProgress, getCurrentStreak, getWeekActivity, type LessonProgress } from "@/lib/progress";
import { BookOpen, Flame, Trophy, NotebookPen, LogOut } from "lucide-react";

export const Route = createFileRoute("/dashboard/child")({
  beforeLoad: () => requireRole(["child"]),
  component: () => (
    <RoleGuard allow={["child"]}>
      <ChildDashboard />
    </RoleGuard>
  ),
});

const LESSONS = [
  { id: "purpose-of-money", title: "Purpose of Money" },
  { id: "needs-vs-wants", title: "Needs vs. Wants" },
  { id: "counting-coins", title: "Counting Coins" },
  { id: "where-money-comes-from", title: "Where Money Comes From" },
  { id: "piggy-bank-magic", title: "Piggy Bank Magic" },
  { id: "what-is-a-bank", title: "What is a Bank?" },
  { id: "budgeting-like-a-boss", title: "Budgeting Like a Boss" },
  { id: "smart-online-spending", title: "Smart Online Spending" },
  { id: "earning-beyond-pocket-money", title: "Earning Beyond Pocket Money" },
  { id: "sharing-giving", title: "Sharing & Giving" },
  { id: "what-is-inflation", title: "What is Inflation?" },
  { id: "compound-interest", title: "Compound Interest" },
  { id: "stocks-made-simple", title: "Stocks Made Simple" },
];

function ChildDashboard() {
  const { user, signOut } = useAuth();
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [streak, setStreak] = useState(0);
  const [week, setWeek] = useState(getWeekActivity());

  useEffect(() => {
    const refresh = () => {
      setProgress(getAllProgress());
      setStreak(getCurrentStreak());
      setWeek(getWeekActivity());
    };
    refresh();
    window.addEventListener("nanha:progress-updated", refresh);
    return () => window.removeEventListener("nanha:progress-updated", refresh);
  }, []);

  const completed = LESSONS.filter((l) => progress[l.id]?.completed).length;
  const pct = Math.round((completed / LESSONS.length) * 100);
  const totalCorrect = Object.values(progress).reduce((s, p) => s + (p.quizCorrect ?? 0), 0);

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

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-3"><BookOpen className="h-5 w-5 text-primary" /><span className="text-sm text-muted-foreground">Lessons Complete</span></div>
          <p className="mt-2 text-3xl font-bold">{completed}/{LESSONS.length}</p>
          <Progress value={pct} className="mt-3 h-2" />
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3"><Flame className="h-5 w-5 text-orange-500" /><span className="text-sm text-muted-foreground">Streak</span></div>
          <p className="mt-2 text-3xl font-bold">{streak} <span className="text-base font-normal text-muted-foreground">din</span></p>
          <div className="mt-3 flex gap-1">
            {week.map((d) => (
              <span key={d.key} className={`h-3 flex-1 rounded ${d.active ? "bg-orange-500" : "bg-muted"}`} title={d.key} />
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3"><Trophy className="h-5 w-5 text-yellow-500" /><span className="text-sm text-muted-foreground">Quiz Score</span></div>
          <p className="mt-2 text-3xl font-bold">{totalCorrect}</p>
          <p className="mt-1 text-xs text-muted-foreground">Total sahi jawabat</p>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <h2 className="font-display text-xl font-bold">My Lessons</h2>
          <div className="mt-4 space-y-2">
            {LESSONS.map((l) => {
              const p = progress[l.id];
              return (
                <Link key={l.id} to={`/lessons/${l.id}` as any} className="flex items-center justify-between rounded-lg border border-border p-3 transition hover:border-primary hover:bg-primary-soft/30">
                  <div>
                    <p className="font-semibold">{l.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {p?.completed ? `✓ Mukammal · ${p.quizCorrect}/${p.quizTotal}` : "Shuru karein"}
                    </p>
                  </div>
                  <Button size="sm" variant={p?.completed ? "outline" : "hero"}>{p?.completed ? "Review" : "Start"}</Button>
                </Link>
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
        </Card>
      </div>
    </div>
  );
}
