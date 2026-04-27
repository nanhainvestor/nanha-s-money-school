import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ShieldCheck, CheckCircle2, Lock, Heart } from "lucide-react";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Bachon ki Hifazat — Nanha Investor" },
      { name: "description", content: "Nanha Investor par bachay kis tarah mehfooz hain — hamara hifazati waada walidain ke liye." },
      { property: "og:title", content: "Bachon ki Hifazat — Nanha Investor" },
      { property: "og:description", content: "Hamara hifazati waada walidain aur bachon ke liye." },
    ],
  }),
  component: SafetyPage,
});

const promises = [
  { t: "Koi asli paisay ka len-den nahi", d: "Bank login, credit card, ya in-app purchase kabhi nahi mangtay." },
  { t: "Koi third-party ad nahi", d: "Sabaq ke andar koi ishtihar, popup, ya sponsored content nahi." },
  { t: "Koi chat ya social feature nahi", d: "Bachay kisi ajnabi se baat nahi kar sakte. Site bilkul mehfooz hai." },
  { t: "COPPA aur GDPR-K", d: "Hum bain ul aqwami bachon ki privacy ke usooloon par amal karte hain." },
  { t: "Walidain ka full control", d: "Aap kabhi bhi data dekh, tabdeel, ya delete karwa sakte hain." },
  { t: "Sukoon bhara design", d: "Koi flashing rewards, koi shor, koi addiction patterns. Sirf khaalis seekhna." },
];

function SafetyPage() {
  return (
    <div>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <ShieldCheck className="h-3.5 w-3.5" /> Hifazat ka Waada
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">Aap ka bachay yahan mehfooz hai</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Nanha Investor walidain ki nazar mein, walidain ke usooloon par bana hai.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {promises.map((p) => (
            <div key={p.t} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <h3 className="mt-3 font-bold">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary-soft/40">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div>
            <Lock className="h-10 w-10 text-primary" />
            <h2 className="mt-3 font-display text-3xl font-extrabold">Data hifazat</h2>
            <p className="mt-3 text-muted-foreground">
              Aap ka email encrypted database mein store hota hai. Hum kabhi data bechte ya kisi ko share nahi karte. Tafseel <Link to="/privacy" className="text-primary underline">Privacy Policy</Link> mein.
            </p>
          </div>
          <div>
            <Heart className="h-10 w-10 text-primary" />
            <h2 className="mt-3 font-display text-3xl font-extrabold">Sawal ya tashveesh?</h2>
            <p className="mt-3 text-muted-foreground">
              Walidain hamesha hum se rabta kar sakte hain. Hum 24 ghante mein jawab dete hain.
            </p>
            <Button asChild variant="hero" size="lg" className="mt-4">
              <Link to="/contact">Rabta karein</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
