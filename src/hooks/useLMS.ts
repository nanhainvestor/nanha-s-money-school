// React hook + helpers around the LMS server functions. Caches data in
// component state and exposes a refresh() helper. Use from pages/components.

import { useCallback, useEffect, useState } from "react";
import { getMyProgress, completeLesson, type LMSData, type ProgressRow } from "@/server/lms.functions";
import { LESSONS, getLesson } from "@/lib/lessons-catalog";
import { useAuth } from "@/hooks/useAuth";

const EMPTY: LMSData = {
  progress: [],
  stats: { total_xp: 0, current_streak: 0, longest_streak: 0, last_active_date: null },
  badges: [],
};

export function useLMS() {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState<LMSData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!user) {
      setData(EMPTY);
      setLoading(false);
      return;
    }
    try {
      const next = await getMyProgress();
      setData(next);
      setError(null);
    } catch (e: any) {
      console.error("LMS load failed", e);
      setError(e?.message ?? "Failed to load progress");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (authLoading) return;
    setLoading(true);
    refresh();
  }, [authLoading, refresh]);

  useEffect(() => {
    const onUpdate = () => refresh();
    window.addEventListener("nanha:lms-updated", onUpdate);
    return () => window.removeEventListener("nanha:lms-updated", onUpdate);
  }, [refresh]);

  return { data, loading, error, refresh };
}

/* -------------------- Pure helpers -------------------- */

export type LessonState = "locked" | "available" | "in-progress" | "completed";

export function progressMap(rows: ProgressRow[]): Record<string, ProgressRow> {
  const out: Record<string, ProgressRow> = {};
  for (const r of rows) out[r.lesson_id] = r;
  return out;
}

/** Lock state with sequential unlock (next unlocks when previous completed). */
export function lessonState(lessonId: string, rows: ProgressRow[]): LessonState {
  const meta = getLesson(lessonId);
  if (!meta) return "locked";
  const map = progressMap(rows);
  const own = map[lessonId];
  if (own?.completed) return "completed";
  if (meta.order === 1) return own ? "in-progress" : "available";
  const prev = LESSONS.find((l) => l.order === meta.order - 1);
  if (!prev) return "available";
  if (map[prev.id]?.completed) return own ? "in-progress" : "available";
  return "locked";
}

export async function markLessonComplete(input: {
  lessonId: string;
  quizCorrect: number;
  quizTotal: number;
}) {
  const res = await completeLesson({ data: input });
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("nanha:lms-updated"));
  }
  return res;
}
