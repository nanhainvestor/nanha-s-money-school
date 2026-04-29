import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Download, Gift, Sparkles, CheckCircle2, LogIn } from "lucide-react";

export const Route = createFileRoute("/starter-kit")({
  head: () => ({
    meta: [
      { title: "Muft Money-Smart Bachay Starter Kit — Nanha Investor" },
      { name: "description", content: "Beginner Financial Guide PDF muft download karein — paisay, bachat aur investing ki asaan samajh Roman Urdu mein." },
      { property: "og:title", content: "Muft Starter Kit — Nanha Investor" },
      { property: "og:description", content: "16-page Beginner Financial Guide PDF — Save, Invest, Mindset." },
    ],
  }),
  component: StarterKitPage,
});

const PDF_PATH = "/nanha-investor-starter-kit.pdf";

const HIGHLIGHTS = [
  "Paisa asal mein kya hai — aur kya nahi",
  "Saving vs Investing — asaan farq",
  "Rs 100 Rule aur 3-Day Money Challenge",
  "Rich vs Poor mindset shift",
  "Financial journey ka 5-step roadmap",
  "Bonus: Money Journal + Saving Tracker tips",
];

function StarterKitPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Auto-trigger download once user is logged in and lands here
  useEffect(() => {
    if (!loading && user && typeof window !== "undefined") {
      const t = setTimeout(() => {
        const a = document.createElement("a");
        a.href = PDF_PATH;
        a.download = "Nanha-Investor-Starter-Kit.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
      }, 400);
      return () => clearTimeout(t);
    }
  }, [user, loading]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
          <Gift className="h-3.5 w-3.5" /> Bilkul Muft
        </span>
        <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
          Money-Smart Bachay <span className="text-primary">Starter Kit</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          16-page Beginner Financial Guide PDF — paisa samajhna, bachana aur grow karna seekhein, asaan Roman Urdu mein.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-display text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" /> Andar kya hai?
          </h2>
          <ul className="mt-4 space-y-2">
            {HIGHLIGHTS.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary-soft/40 to-accent/10">
          <h2 className="font-display text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" /> Hasil karein
          </h2>

          {loading ? (
            <p className="mt-4 text-sm text-muted-foreground">Loading…</p>
          ) : user ? (
            <div className="mt-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Shukriya! Aap ka download abhi shuru ho raha hai. Agar khud-ba-khud na ho, neeche button dabayein.
              </p>
              <Button asChild variant="hero" size="lg" className="w-full">
                <a href={PDF_PATH} download="Nanha-Investor-Starter-Kit.pdf">
                  <Download className="h-4 w-4" /> PDF Download Karein
                </a>
              </Button>
              <p className="text-xs text-muted-foreground">
                Ya seedha <Link to="/lessons" className="text-primary underline">lessons</Link> shuru karein.
              </p>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              <p className="text-sm text-muted-foreground">
                Muft PDF hasil karne ke liye sirf account banayein ya login karein — 30 second ka kaam.
              </p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  variant="hero"
                  size="lg"
                  className="flex-1"
                  onClick={() => navigate({ to: "/auth", search: { redirect: "/starter-kit" } as any })}
                >
                  <LogIn className="h-4 w-4" /> Sign Up / Login
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Login ke baad aap yahin wapas aayenge aur PDF khud-ba-khud download hogi.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
