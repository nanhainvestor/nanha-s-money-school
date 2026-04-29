// Canonical lesson catalog — single source of truth for ordering, tracks,
// XP rewards, and badge milestones. Used by both UI and server logic.

export type Track = "beginner" | "intermediate" | "advanced";

export type LessonMeta = {
  id: string;        // matches route slug + lesson_id in DB
  title: string;
  track: Track;
  order: number;     // global order across all tracks (1-indexed)
  trackOrder: number; // order within the track (1-indexed)
  xp: number;        // base XP for completion
};

export const LESSONS: LessonMeta[] = [
  // Beginner (Ages 6–8)
  { id: "needs-vs-wants",          title: "Needs vs. Wants",            track: "beginner", trackOrder: 1, order: 1, xp: 20 },
  { id: "where-money-comes-from",  title: "Where Money Comes From",     track: "beginner", trackOrder: 2, order: 2, xp: 20 },
  { id: "piggy-bank-magic",        title: "The Magic of the Piggy Bank",track: "beginner", trackOrder: 3, order: 3, xp: 20 },
  { id: "counting-coins",          title: "Counting Coins",             track: "beginner", trackOrder: 4, order: 4, xp: 20 },
  { id: "sharing-giving",          title: "Sharing & Giving",           track: "beginner", trackOrder: 5, order: 5, xp: 20 },

  // Intermediate (Ages 9–11)
  { id: "purpose-of-money",            title: "The Purpose of Money",       track: "intermediate", trackOrder: 1, order: 6,  xp: 30 },
  { id: "budgeting-like-a-boss",       title: "Budgeting Like a Boss",      track: "intermediate", trackOrder: 2, order: 7,  xp: 30 },
  { id: "what-is-a-bank",              title: "What Is a Bank?",            track: "intermediate", trackOrder: 3, order: 8,  xp: 30 },
  { id: "earning-beyond-pocket-money", title: "Earning Beyond Pocket Money",track: "intermediate", trackOrder: 4, order: 9,  xp: 30 },

  // Advanced (Ages 12–14)
  { id: "what-is-inflation",      title: "What Is Inflation?",      track: "advanced", trackOrder: 1, order: 10, xp: 40 },
  { id: "stocks-made-simple",     title: "Stocks Made Simple",      track: "advanced", trackOrder: 2, order: 11, xp: 40 },
  { id: "compound-interest",      title: "Compound Interest",       track: "advanced", trackOrder: 3, order: 12, xp: 40 },
  { id: "smart-online-spending",  title: "Smart Online Spending",   track: "advanced", trackOrder: 4, order: 13, xp: 40 },
];

export const LESSON_BY_ID = Object.fromEntries(LESSONS.map((l) => [l.id, l]));

export function getLesson(id: string): LessonMeta | undefined {
  return LESSON_BY_ID[id];
}

export function nextLessonAfter(id: string): LessonMeta | undefined {
  const cur = LESSON_BY_ID[id];
  if (!cur) return undefined;
  return LESSONS.find((l) => l.order === cur.order + 1);
}

export const TRACKS: { key: Track; label: string; age: string }[] = [
  { key: "beginner",     label: "Beginner",     age: "Umar 6–8 saal" },
  { key: "intermediate", label: "Intermediate", age: "Umar 9–11 saal" },
  { key: "advanced",     label: "Advanced",     age: "Umar 12–14 saal" },
];

export const BADGES: { code: string; label: string; emoji: string; description: string }[] = [
  { code: "first-step",        label: "First Step",          emoji: "🌱", description: "Pehla sabaq mukammal!" },
  { code: "beginner-champ",    label: "Beginner Champion",   emoji: "🎉", description: "Beginner track mukammal." },
  { code: "intermediate-champ",label: "Intermediate Master", emoji: "🏆", description: "Intermediate track mukammal." },
  { code: "advanced-champ",    label: "Money Pro",           emoji: "💎", description: "Advanced track mukammal." },
  { code: "perfect-quiz",      label: "Perfect Score",       emoji: "💯", description: "Quiz mein 100%!" },
  { code: "streak-3",          label: "3-Day Streak",        emoji: "🔥", description: "3 din lagatar." },
  { code: "streak-7",          label: "Week Warrior",        emoji: "⚡", description: "7 din lagatar." },
];
