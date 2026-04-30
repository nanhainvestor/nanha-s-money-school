import { createFileRoute, Link, Outlet, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/lessons")({
  component: LessonsLayout,
  notFoundComponent: LessonNotFound,
});

function LessonsLayout() {
  // Layout for /lessons and all /lessons/<slug> child routes.
  // Always renders <Outlet /> — children NEVER fall back to the listing.
  return <Outlet />;
}

function LessonNotFound() {
  return (
    <main className="container mx-auto max-w-2xl px-4 py-24 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
        404 — Sabaq nahi mila
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        Yeh lesson maujood nahi
      </h1>
      <p className="mt-3 text-muted-foreground">
        Jis sabaq ka link aap ne khola woh ya tou hata diya gaya hai ya URL ghalat hai.
        Saare sabaq dekhne ke liye lesson lab par wapas jayein.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button asChild>
          <Link to="/lessons">Saare sabaq dekhein</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/">Home</Link>
        </Button>
      </div>
    </main>
  );
}

// Re-export so splat route can throw matching notFound()
export { notFound };
