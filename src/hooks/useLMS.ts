// React hook + helpers around the LMS server functions.
// Uses a module-level cache + in-flight promise so navigating between lessons
// doesn't re-fetch progress on every mount (which caused long loading spinners
// and perceived "redirects" between lesson pages).

import { useCallback, useEffect, useState } from "react";
import { getMyProgress, completeLesson, type LMSData, type ProgressRow } from "@/server/lms.functions";
import { LESSONS, getLesson } from "@/lib/lessons-catalog";
import { useAuth } from "@/hooks/useAuth";

const EMPTY: LMSData = {
  progress: [],
  stats: { total_xp: 0, current_streak: 0, longest_streak: 0, last_active_date: null },
  badges: [],
};

// ---- module-level shared state ----
let cache: { userId: string | null; data: LMSData } | null = null;
let inflight: Promise<LMSData> | null = null;
const subscribers = new Set<(d: LMSData) => void>();

function notify(d: LMSData) {
  for (const s of subscribers) s(d);
}

async function loadProgress(userId: string): Promise<LMSData> {
  if (cache && cache.userId === userId) return cache.data;
  if (inflight) return inflight;
  inflight = getMyProgress()
    .then((d) => {
      cache = { userId, data: d };
      notify(d);
      return d;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

export function invalidateLMS() {
  cache = null;
}

export function useLMS() {
  const { user, loading: authLoading } = useAuth();
  const initial = cache && user && cache.userId === user.id ? cache.data : EMPTY;
  const [data, setData] = useState<LMSData>(initial);
  // Only show loading when we truly have nothing cached for this user.
  const [loading, setLoading] = useState<boolean>(
    !!user && !(cache && cache.userId === user.id),
  );
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!user) {
      cache = null;
      setData(EMPTY);
      setLoading(false);
      return;
    }
    try {
      // Force refresh: drop cache for this user
      if (cache?.userId === user.id) cache = null;
      const next = await loadProgress(user.id);
      setData(next);
      setError(null);
    } catch (e: any) {
      console.error("LMS load failed", e);
      setError(e?.message ?? "Failed to load progress");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Initial / user-change load
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setData(EMPTY);
      setLoading(false);
      return;
    }
    if (cache && cache.userId === user.id) {
      setData(cache.data);
      setLoading(false);
      return;
    }
    setLoading(true);
    loadProgress(user.id)
      .then((d) => {
        setData(d);
        setError(null);
      })
      .catch((e) => {
        console.error("LMS load failed", e);
        setError(e?.message ?? "Failed to load progress");
      })
      .finally(() => setLoading(false));
  }, [authLoading, user]);

  // Subscribe to cross-component updates (e.g. after completing a lesson).
  useEffect(() => {
    const onData = (d: LMSData) => setData(d);
    subscribers.add(onData);
    return () => {
      subscribers.delete(onData);
    };
  }, []);

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
  // Drop cache so next read pulls fresh stats/badges/progress.
  cache = null;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("nanha:lms-updated"));
  }
  return res;
}
