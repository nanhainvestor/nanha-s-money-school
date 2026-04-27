import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, MapPin, Send, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Rabta Karein — Nanha Investor" },
      { name: "description", content: "Sawal, tajweez ya madad — hum se Roman Urdu mein rabta karein. 24 ghante mein jawab." },
      { property: "og:title", content: "Rabta — Nanha Investor" },
      { property: "og:description", content: "Walidain aur ustaad hum se rabta kar sakte hain." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <MessageCircle className="h-3.5 w-3.5" /> Rabta
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">Aap ki baat sun-ne ko tayyar hain</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Sawal, mashwara, ya bachay ki kahani — hum sab kuch parhte hain. Aam tor par 24 ghante mein jawab.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1fr_1.5fr]">
        <div className="space-y-5">
          <InfoCard icon={<Mail className="h-5 w-5" />} title="Email" value="hello@nanhainvestor.pk" />
          <InfoCard icon={<MessageCircle className="h-5 w-5" />} title="WhatsApp" value="+92 300 1234567" />
          <InfoCard icon={<MapPin className="h-5 w-5" />} title="Daftar" value="Lahore, Pakistan" />
          <div className="rounded-3xl bg-primary-soft/60 p-5 text-sm text-muted-foreground">
            School ya madrasa ke liye bulk pricing chahiye? Email mein "School Plan" likhein — qeemat Rs mein bhejte hain.
          </div>
        </div>

        <form
          className="rounded-3xl border border-border bg-card p-7 shadow-soft"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          {sent ? (
            <div className="text-center py-8">
              <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
              <h2 className="mt-4 font-display text-2xl font-extrabold">Shukriya!</h2>
              <p className="mt-2 text-muted-foreground">Aap ka paigham mil gaya. Hum jaldi jawab denge.</p>
              <Button asChild variant="soft" className="mt-6">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl font-extrabold">Hamein paigham bhejein</h2>
              <div className="mt-5 grid gap-4">
                <Field label="Aap ka naam">
                  <input required type="text" className="h-11 w-full rounded-xl border border-border bg-background px-4 outline-none focus:ring-2 focus:ring-primary" placeholder="Ayesha Khan" />
                </Field>
                <Field label="Email">
                  <input required type="email" className="h-11 w-full rounded-xl border border-border bg-background px-4 outline-none focus:ring-2 focus:ring-primary" placeholder="ayesha@email.com" />
                </Field>
                <Field label="Mauzoo">
                  <select className="h-11 w-full rounded-xl border border-border bg-background px-4 outline-none focus:ring-2 focus:ring-primary">
                    <option>Aam sawal</option>
                    <option>Sabaq ke baray mein</option>
                    <option>School plan (Rs pricing)</option>
                    <option>Technical madad</option>
                  </select>
                </Field>
                <Field label="Aap ka paigham">
                  <textarea required rows={5} className="w-full rounded-xl border border-border bg-background p-4 outline-none focus:ring-2 focus:ring-primary" placeholder="Yahan likhein..." />
                </Field>
                <Button type="submit" variant="hero" size="lg">
                  Send Message <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </form>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-bold">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function InfoCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">{icon}</span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</p>
        <p className="font-bold">{value}</p>
      </div>
    </div>
  );
}
