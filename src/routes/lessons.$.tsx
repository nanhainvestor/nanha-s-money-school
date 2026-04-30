import { createFileRoute, notFound } from "@tanstack/react-router";
import { LESSON_BY_ID } from "@/lib/lessons-catalog";

/**
 * Splat catch-all guard for /lessons/<unknown-slug>.
 *
 * Each known lesson has its own static route file (e.g. lessons.needs-vs-wants.tsx)
 * which takes precedence over this splat. This route only matches when the URL
 * does NOT correspond to a registered lesson route — in that case we throw
 * notFound() so the parent layout's notFoundComponent renders, instead of any
 * accidental fallback to the lessons listing.
 */
export const Route = createFileRoute("/lessons/$")({
  beforeLoad: ({ params }) => {
    const slug = (params as { _splat?: string })._splat ?? "";
    // Defensive: if somehow a known lesson lands here, just 404 — the static
    // route should have matched. Always throw so the listing never shows.
    if (!slug || !LESSON_BY_ID[slug]) {
      throw notFound();
    }
    throw notFound();
  },
  component: () => null,
});
