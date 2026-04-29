import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RoleGuard } from "@/components/RoleGuard";
import { useAuth } from "@/hooks/useAuth";
import { requireRole } from "@/lib/route-guards";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { LESSONS, BADGES } from "@/lib/lessons-catalog";
import { getMyChildren, linkChildById, unlinkChild, type LMSData } from "@/server/lms.functions";
import { Flame, Bell, BookOpen, LogOut, Heart, UserPlus, Trash2, Star } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/parent")({
  beforeLoad: () => requireRole(["parent"]),
  component: () => (
    <RoleGuard allow={["parent"]}>
      <ParentDashboard />
    </RoleGuard>
  ),
});

type Child = { id: string; display_name: string | null; data: LMSData };

function ParentDashboard() {
  const { user, signOut } = useAuth();
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);
  const [childIdInput, setChildIdInput] = useState("");
  const [adding, setAdding] = useState(false);

  const refresh = async () => {
    try {
      const res = await getMyChildren();
      setChildren(res.children);
    } catch (e: any) {
      console.error(e);
      toast.error("Children load nahi ho sake.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { refresh(); }, []);

  const onAdd = async () => {
    if (!childIdInput.trim()) return;
    setAdding(true);
    try {
      await linkChildById({ data: { childId: childIdInput.trim() } });
      toast.success("Child link ho gaya 🎉");
      setChildIdInput("");
      refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Link nahi ho saka.");
    } finally {
      setAdding(false);
    }
  };

  const onRemove = async (childId: string) => {
    try {
      await unlinkChild({ data: { childId } });
      toast.success("Hata diya.");
      refresh();
    } catch (e: any) {
      toast.error(e?.message ?? "Failed.");
    }
  };

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

      <Card className="mt-6 p-6">
        <div className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-primary" />
          <h2 className="font-display text-xl font-bold">Apne bachay ko link karein</h2>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Bachay ke dashboard se "Mera ID" copy karein aur yahan paste karein. Phir aap unka progress dekh sakein gay.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Input
            value={childIdInput}
            onChange={(e) => setChildIdInput(e.target.value)}
            placeholder="Child ka user ID (UUID)"
            className="flex-1 min-w-[260px] font-mono text-xs"
          />
          <Button onClick={onAdd} disabled={adding || !childIdInput.trim()}>Link karein</Button>
        </div>
      </Card>

      {loading ? (
        <p className="mt-8 text-center text-sm text-muted-foreground">Load ho raha hai…</p>
      ) : children.length === 0 ? (
        <Card className="mt-6 border-orange-300 bg-orange-50 p-5 dark:bg-orange-950/30">
          <div className="flex items-start gap-3">
            <Bell className="mt-0.5 h-5 w-5 text-orange-500" />
            <div>
              <p className="font-semibold">Abhi koi bacha link nahi hai</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Upar wala form bhar ke shuru karein. Bacha pehle apna account banaye, phir wo apna ID share kare.
              </p>
              <Button asChild variant="hero" size="sm" className="mt-3"><Link to="/lessons">Lessons khol kar dekhein</Link></Button>
            </div>
          </div>
        </Card>
      ) : (
        <div className="mt-8 space-y-8">
          {children.map((c) => <ChildCard key={c.id} child={c} onRemove={() => onRemove(c.id)} />)}
        </div>
      )}
    </div>
  );
}

function ChildCard({ child, onRemove }: { child: Child; onRemove: () => void }) {
  const completed = child.data.progress.filter((p) => p.completed).length;
  const pct = Math.round((completed / LESSONS.length) * 100);
  const totalCorrect = child.data.progress.reduce((s, p) => s + p.quiz_correct, 0);
  const totalQ = child.data.progress.reduce((s, p) => s + p.quiz_total, 0);
  const days = child.data.stats.last_active_date
    ? Math.round((new Date().getTime() - new Date(child.data.stats.last_active_date + "T00:00:00").getTime()) / 86400000)
    : null;
  const showReminder = days === null || days >= 2;

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-2xl font-extrabold">{child.display_name ?? "Bacha"}</h3>
          <p className="text-xs text-muted-foreground">Last active: {child.data.stats.last_active_date ?? "abhi tak nahi"}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onRemove}><Trash2 className="mr-2 h-4 w-4" />Hata dein</Button>
      </div>

      {showReminder && (
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-orange-300 bg-orange-50 p-3 dark:bg-orange-950/30">
          <Bell className="mt-0.5 h-4 w-4 text-orange-500" />
          <p className="text-sm">
            {days === null ? "Abhi tak koi sabaq shuru nahi hua. Bachay ke saath pehla sabaq khol kar dekhein!" : `${days} din se koi naya sabaq nahi hua.`}
          </p>
        </div>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" /><span className="text-xs text-muted-foreground">Lessons</span></div>
          <p className="mt-1 text-2xl font-bold">{completed}/{LESSONS.length}</p>
          <Progress value={pct} className="mt-2 h-1.5" />
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2"><Star className="h-4 w-4 text-yellow-500" /><span className="text-xs text-muted-foreground">Total XP</span></div>
          <p className="mt-1 text-2xl font-bold">{child.data.stats.total_xp}</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2"><Flame className="h-4 w-4 text-orange-500" /><span className="text-xs text-muted-foreground">Streak</span></div>
          <p className="mt-1 text-2xl font-bold">{child.data.stats.current_streak} din</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2"><Heart className="h-4 w-4 text-rose-500" /><span className="text-xs text-muted-foreground">Quiz</span></div>
          <p className="mt-1 text-2xl font-bold">{totalQ ? Math.round((totalCorrect / totalQ) * 100) : 0}%</p>
          <p className="text-[10px] text-muted-foreground">{totalCorrect}/{totalQ} sahi</p>
        </div>
      </div>

      {child.data.badges.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Badges</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {child.data.badges.map((code) => {
              const b = BADGES.find((x) => x.code === code);
              if (!b) return null;
              return (
                <span key={code} className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
                  {b.emoji} {b.label}
                </span>
              );
            })}
          </div>
        </div>
      )}

      <details className="mt-4">
        <summary className="cursor-pointer text-sm font-bold text-primary">Lesson-by-lesson dikhayein</summary>
        <div className="mt-3 space-y-1.5">
          {LESSONS.map((l) => {
            const p = child.data.progress.find((x) => x.lesson_id === l.id);
            return (
              <div key={l.id} className="flex items-center justify-between rounded border border-border p-2 text-sm">
                <span className="truncate">{l.title}</span>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${p?.completed ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>
                  {p?.completed ? `✓ ${p.quiz_correct}/${p.quiz_total}` : "—"}
                </span>
              </div>
            );
          })}
        </div>
      </details>
    </Card>
  );
}
