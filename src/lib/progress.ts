// Lightweight client-side progress store for lesson completion + quiz scores.
// No backend required — values persist to localStorage on the device used.

export type LessonProgress = {
  lessonId: string;
  title: string;
  completed: boolean;
  quizCorrect: number;
  quizTotal: number;
  updatedAt: string; // ISO
};

const STORAGE_KEY = "nanha:progress:v1";

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getAllProgress(): Record<string, LessonProgress> {
  if (!isBrowser()) return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, LessonProgress>) : {};
  } catch {
    return {};
  }
}

export function getLessonProgress(lessonId: string): LessonProgress | undefined {
  return getAllProgress()[lessonId];
}

export function saveLessonProgress(p: LessonProgress) {
  if (!isBrowser()) return;
  const all = getAllProgress();
  all[p.lessonId] = { ...p, updatedAt: new Date().toISOString() };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  recordActivity();
  // Notify listeners on the same tab (storage event only fires across tabs).
  window.dispatchEvent(new CustomEvent("nanha:progress-updated"));
}

/* -------------------- Activity / Streak tracking -------------------- */

const ACTIVITY_KEY = "nanha:activity:v1";

function dayKey(d: Date): string {
  // Local YYYY-MM-DD
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function getActivityDays(): string[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(ACTIVITY_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function recordActivity(date: Date = new Date()) {
  if (!isBrowser()) return;
  const k = dayKey(date);
  const days = new Set(getActivityDays());
  if (days.has(k)) return;
  days.add(k);
  window.localStorage.setItem(ACTIVITY_KEY, JSON.stringify(Array.from(days).sort()));
  window.dispatchEvent(new CustomEvent("nanha:progress-updated"));
}

/** Returns array of last 7 days (oldest first) with active flag. */
export function getWeekActivity(today: Date = new Date()): { date: Date; key: string; active: boolean }[] {
  const set = new Set(getActivityDays());
  const out: { date: Date; key: string; active: boolean }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const k = dayKey(d);
    out.push({ date: d, key: k, active: set.has(k) });
  }
  return out;
}

/** Consecutive days of activity ending today (or yesterday if today not yet active). */
export function getCurrentStreak(today: Date = new Date()): number {
  const set = new Set(getActivityDays());
  let streak = 0;
  const cursor = new Date(today);
  // If today not active, streak can still be alive if yesterday was — start from yesterday.
  if (!set.has(dayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (set.has(dayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Days since last activity. Returns null if no activity ever. */
export function getDaysSinceLastActivity(today: Date = new Date()): number | null {
  const days = getActivityDays();
  if (days.length === 0) return null;
  const last = new Date(days[days.length - 1] + "T00:00:00");
  const t = new Date(dayKey(today) + "T00:00:00");
  return Math.round((t.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
}
