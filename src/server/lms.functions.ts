// Server functions for the mini LMS: progress fetch, lesson completion,
// streak/XP/badge bookkeeping, and parent → child viewing.

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { LESSONS, LESSON_BY_ID, getLesson } from "@/lib/lessons-catalog";

export type ProgressRow = {
  lesson_id: string;
  completed: boolean;
  quiz_correct: number;
  quiz_total: number;
  xp_earned: number;
  completed_at: string | null;
};

export type StatsRow = {
  total_xp: number;
  current_streak: number;
  longest_streak: number;
  last_active_date: string | null;
};

export type LMSData = {
  progress: ProgressRow[];
  stats: StatsRow;
  badges: string[];
};

const EMPTY_STATS: StatsRow = {
  total_xp: 0,
  current_streak: 0,
  longest_streak: 0,
  last_active_date: null,
};

async function loadFor(supabase: any, userId: string): Promise<LMSData> {
  const [progressRes, statsRes, badgesRes] = await Promise.all([
    supabase
      .from("lesson_progress")
      .select("lesson_id, completed, quiz_correct, quiz_total, xp_earned, completed_at")
      .eq("user_id", userId),
    supabase
      .from("user_stats")
      .select("total_xp, current_streak, longest_streak, last_active_date")
      .eq("user_id", userId)
      .maybeSingle(),
    supabase
      .from("user_badges")
      .select("badge_code")
      .eq("user_id", userId),
  ]);

  return {
    progress: (progressRes.data ?? []) as ProgressRow[],
    stats: (statsRes.data as StatsRow | null) ?? EMPTY_STATS,
    badges: ((badgesRes.data ?? []) as { badge_code: string }[]).map((b) => b.badge_code),
  };
}

/* -------------------------- GET MY PROGRESS -------------------------- */

export const getMyProgress = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    return loadFor(supabase, userId);
  });

/* -------------------------- COMPLETE LESSON -------------------------- */

const completeSchema = z.object({
  lessonId: z.string().min(1).max(64),
  quizCorrect: z.number().int().min(0).max(100),
  quizTotal: z.number().int().min(0).max(100),
});

function dayKey(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function diffDays(a: string, b: string) {
  const da = new Date(a + "T00:00:00").getTime();
  const db = new Date(b + "T00:00:00").getTime();
  return Math.round((db - da) / 86400000);
}

export const completeLesson = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => completeSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const meta = getLesson(data.lessonId);
    if (!meta) throw new Error(`Unknown lesson: ${data.lessonId}`);

    // Sequential unlock check: previous lesson must be completed
    if (meta.order > 1) {
      const prev = LESSONS.find((l) => l.order === meta.order - 1);
      if (prev) {
        const { data: prevRow } = await supabase
          .from("lesson_progress")
          .select("completed")
          .eq("user_id", userId)
          .eq("lesson_id", prev.id)
          .maybeSingle();
        if (!prevRow?.completed) {
          throw new Error("Previous lesson not completed yet.");
        }
      }
    }

    // Already completed? Update quiz score only (no double XP).
    const { data: existing } = await supabase
      .from("lesson_progress")
      .select("completed, xp_earned")
      .eq("user_id", userId)
      .eq("lesson_id", data.lessonId)
      .maybeSingle();

    const wasCompleted = !!existing?.completed;
    const xpToAdd = wasCompleted ? 0 : meta.xp;

    const { error: upsertErr } = await supabase
      .from("lesson_progress")
      .upsert(
        {
          user_id: userId,
          lesson_id: data.lessonId,
          completed: true,
          quiz_correct: data.quizCorrect,
          quiz_total: data.quizTotal,
          xp_earned: (existing?.xp_earned ?? 0) + xpToAdd,
          completed_at: wasCompleted ? undefined : new Date().toISOString(),
        },
        { onConflict: "user_id,lesson_id" },
      );
    if (upsertErr) throw upsertErr;

    // Update stats / streak
    const today = dayKey(new Date());
    const { data: stats } = await supabase
      .from("user_stats")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    let current = stats?.current_streak ?? 0;
    const longest = stats?.longest_streak ?? 0;
    if (stats?.last_active_date) {
      const d = diffDays(stats.last_active_date, today);
      if (d === 0) {
        // same day — streak unchanged
      } else if (d === 1) {
        current = current + 1;
      } else {
        current = 1;
      }
    } else {
      current = 1;
    }
    const newLongest = Math.max(longest, current);
    const newTotalXp = (stats?.total_xp ?? 0) + xpToAdd;

    const { error: statsErr } = await supabase
      .from("user_stats")
      .upsert(
        {
          user_id: userId,
          total_xp: newTotalXp,
          current_streak: current,
          longest_streak: newLongest,
          last_active_date: today,
        },
        { onConflict: "user_id" },
      );
    if (statsErr) throw statsErr;

    // Badges
    const badgesToGrant: string[] = [];
    if (!wasCompleted) badgesToGrant.push("first-step");
    if (data.quizTotal > 0 && data.quizCorrect === data.quizTotal) {
      badgesToGrant.push("perfect-quiz");
    }
    if (current >= 3) badgesToGrant.push("streak-3");
    if (current >= 7) badgesToGrant.push("streak-7");

    // Track-completion badges
    const { data: progressRows } = await supabase
      .from("lesson_progress")
      .select("lesson_id, completed")
      .eq("user_id", userId)
      .eq("completed", true);
    const completedSet = new Set((progressRows ?? []).map((p: any) => p.lesson_id));
    completedSet.add(data.lessonId);
    const trackDone = (track: string) =>
      LESSONS.filter((l) => l.track === track).every((l) => completedSet.has(l.id));
    if (trackDone("beginner")) badgesToGrant.push("beginner-champ");
    if (trackDone("intermediate")) badgesToGrant.push("intermediate-champ");
    if (trackDone("advanced")) badgesToGrant.push("advanced-champ");

    if (badgesToGrant.length) {
      await supabase
        .from("user_badges")
        .upsert(
          badgesToGrant.map((badge_code) => ({ user_id: userId, badge_code })),
          { onConflict: "user_id,badge_code", ignoreDuplicates: true },
        );
    }

    return { ok: true, xpEarned: xpToAdd, streak: current };
  });

/* -------------------------- LINK PARENT → CHILD -------------------------- */

const linkSchema = z.object({ childEmail: z.string().email().max(255) });

export const linkChildByEmail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => linkSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    // Look up child by email via profiles → we don't have email in profiles,
    // so use auth admin via RPC isn't available. Instead, parents enter the
    // child's user_id (UUID). Provide both: try email lookup first via a public
    // RPC-style by display_name match would be unsafe. We accept user_id input
    // form alternative below.
    return { ok: false, error: "Use linkChildById with the child's account ID." };
    // (kept for future: would need a SECURITY DEFINER lookup function)
  });

const linkByIdSchema = z.object({ childId: z.string().uuid() });

export const linkChildById = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => linkByIdSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    // Verify the target user has a 'child' role
    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.childId)
      .eq("role", "child")
      .maybeSingle();
    if (!roleRow) throw new Error("That account is not a child account.");

    const { error } = await supabase
      .from("parent_child_links")
      .upsert(
        { parent_id: userId, child_id: data.childId },
        { onConflict: "parent_id,child_id", ignoreDuplicates: true },
      );
    if (error) throw error;
    return { ok: true };
  });

const unlinkSchema = z.object({ childId: z.string().uuid() });

export const unlinkChild = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => unlinkSchema.parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { error } = await supabase
      .from("parent_child_links")
      .delete()
      .eq("parent_id", userId)
      .eq("child_id", data.childId);
    if (error) throw error;
    return { ok: true };
  });

/* -------------------------- GET MY CHILDREN (parent) -------------------------- */

export const getMyChildren = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: links } = await supabase
      .from("parent_child_links")
      .select("child_id")
      .eq("parent_id", userId);
    const ids = (links ?? []).map((l: any) => l.child_id);
    if (ids.length === 0) return { children: [] as { id: string; display_name: string | null; data: LMSData }[] };

    const [{ data: profiles }] = await Promise.all([
      supabase.from("profiles").select("user_id, display_name").in("user_id", ids),
    ]);

    const children = await Promise.all(
      ids.map(async (id: string) => ({
        id,
        display_name:
          (profiles ?? []).find((p: any) => p.user_id === id)?.display_name ?? null,
        data: await loadFor(supabase, id),
      })),
    );
    return { children };
  });
