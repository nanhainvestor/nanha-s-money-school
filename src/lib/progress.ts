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
  // Notify listeners on the same tab (storage event only fires across tabs).
  window.dispatchEvent(new CustomEvent("nanha:progress-updated"));
}
