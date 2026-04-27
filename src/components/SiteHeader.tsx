import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/lessons", label: "Lessons" },
  { to: "/notebook", label: "Notebook" },
  { to: "/parents", label: "Parents" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-soft">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">
            Nanha <span className="text-primary">Investor</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary bg-primary-soft" }}
              inactiveProps={{ className: "text-foreground/70 hover:text-foreground hover:bg-muted" }}
              className="rounded-full px-3 py-2 text-sm font-semibold transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="hero" size="sm">
            <Link to="/lessons">Start First Lesson</Link>
          </Button>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-xl border border-border lg:hidden"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-primary bg-primary-soft" }}
                inactiveProps={{ className: "text-foreground/80" }}
                className="rounded-xl px-4 py-3 text-base font-semibold"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild variant="hero" className="mt-2">
              <Link to="/lessons" onClick={() => setOpen(false)}>Start First Lesson</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
