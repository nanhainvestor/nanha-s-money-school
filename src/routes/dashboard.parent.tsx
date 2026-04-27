import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RoleGuard } from "@/components/RoleGuard";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getAllProgress, getCurrentStreak, getDaysSinceLastActivity, getWeekActivity, type LessonProgress } from "@/lib/progress";
import { Flame, Bell, BookOpen, LogOut, Heart } from "lucide-react";

export const Route = createFileRoute("/dashboard/parent")({
  component: () => (
    <RoleGuard allow={["parent"]}>
      <ParentDashboard />
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

function ParentDashboard() {
  const { user, signOut } = useAuth();
  const [progress, setProgress] = useState<Record<string, LessonProgress>>({});
  const [streak, setStreak] = useState(0);
  const [week, setWeek] = useState(getWeekActivity());
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const refresh = () => {
      setProgress(getAllProgress());
      setStreak(getCurrentStreak());
      setWeek(getWeekActivity());
      setDays(getDaysSinceLastActivity());
    };
    refresh();
    window.addEventListener("nanha:progress-updated", refresh);
    return () => window.removeEventListener("nanha:progress-updated", refresh);
  }, []);

  const completed = LESSONS.filter((l) => progress[l.id]?.completed).length;
  const pct = Math.round((completed / LESSONS.length) * 100);
  const totalCorrect = Object.values(progress).reduce((s, p) => s + (p.quizCorrect ?? 0), 0);
  const totalQuestions = Object.values(progress).reduce((s, p) => s + (p.quizTotal ?? 0), 0);
  const showReminder = days === null || days >= 2;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Parent Center</p>
          <h1 className="font-display text-3xl font-extrabold">Assalam-o-Alaikum 🌷</h1>
          <p className="mt-1 text-muted-foreground">{user?.email} — apne bachay ki paisay ki taleem ka jaiza lein.</p>
        </div>
        <Button variant="outline" size="sm" onClick={signOut}><LogOut className="mr-2 h-4 w-4" />Logout</Button>
      </div>

      {showReminder && (
        <Card className="mt-6 border-orange-300 bg-orange-50 p-5 dark:bg-orange-950/30">
          <div className="flex items-start gap-3">
            <Bell className="mt-0.5 h-5 w-5 text-orange-500" />
            <div>
              <p className="font-semibold">Narm yaad-dehani</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {days === null ? "Abhi tak koi sabaq shuru nahi hua. Bachay ke saath pehla sabaq khol kar dekhein!" : `${days} din se koi naya sabaq nahi hua. Aaj 5 minute ka sabaq sath karein.`}
              </p>
              <Button asChild variant="hero" size="sm" className="mt-3"><Link to="/lessons">Lessons khol kar dekhein</Link></Button>
            </div>
          </div>
        </Card>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-3"><BookOpen className="h-5 w-5 text-primary" /><span className="text-sm text-muted-foreground">Lessons</span></div>
          <p className="mt-2 text-3xl font-bold">{completed}/{LESSONS.length}</p>
          <Progress value={pct} className="mt-3 h-2" />
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3"><Flame className="h-5 w-5 text-orange-500" /><span className="text-sm text-muted-foreground">Weekly Streak</span></div>
          <p className="mt-2 text-3xl font-bold">{streak} <span className="text-base font-normal text-muted-foreground">din</span></p>
          <div className="mt-3 flex gap-1">
            {week.map((d) => (<span key={d.key} className={`h-3 flex-1 rounded ${d.active ? "bg-orange-500" : "bg-muted"}`} />))}
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex items-center gap-3"><Heart className="h-5 w-5 text-rose-500" /><span className="text-sm text-muted-foreground">Quiz Accuracy</span></div>
          <p className="mt-2 text-3xl font-bold">{totalQuestions ? Math.round((totalCorrect/totalQuestions)*100) : 0}%</p>
          <p className="mt-1 text-xs text-muted-foreground">{totalCorrect} / {totalQuestions} sahi</p>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <h2 className="font-display text-xl font-bold">Lesson-by-Lesson Progress</h2>
        <div className="mt-4 space-y-2">
          {LESSONS.map((l) => {
            const p = progress[l.id];
            return (
              <div key={l.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="font-semibold">{l.title}</p>
                  <p className="text-xs text-muted-foreground">{p?.completed ? `✓ Mukammal · Quiz ${p.quizCorrect}/${p.quizTotal}` : "Abhi shuru nahi hua"}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${p?.completed ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                  {p?.completed ? "Done" : "Pending"}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
