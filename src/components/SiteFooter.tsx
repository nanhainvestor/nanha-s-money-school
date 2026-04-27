import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold">
              Nanha <span className="text-primary">Investor</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Calm, story-driven money lessons for curious kids — and the parents who love them.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-foreground">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/lessons" className="hover:text-primary">Learning Lab</Link></li>
            <li><Link to="/notebook" className="hover:text-primary">Nanha's Notebook</Link></li>
            <li><Link to="/parents" className="hover:text-primary">Parent Center</Link></li>
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-foreground">Coming Soon</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Progress Dashboard</li>
            <li>Quizzes & Certificates</li>
            <li>Parent Masterclasses</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Nanha Investor. Made with care for the next generation of money-smart kids.
      </div>
    </footer>
  );
}
