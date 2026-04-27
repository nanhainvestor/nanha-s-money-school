import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { HelpCircle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Sawal Jawab (FAQ) — Nanha Investor" },
      { name: "description", content: "Walidain ke aam sawalat ke jawab Roman Urdu mein — qeemat Rs mein, hifazat, umar, aur bohat kuch." },
      { property: "og:title", content: "Sawal Jawab — Nanha Investor" },
      { property: "og:description", content: "Aam sawalat ke jawab walidain ke liye." },
    ],
  }),
  component: FaqPage,
});

const groups = [
  {
    title: "Site ke baray mein",
    faqs: [
      { q: "Nanha Investor kya hai?", a: "Yeh 6 se 14 saal ke bachon ke liye paisay seekhne ki kahani par mabni website hai. Har sabaq 3 minute ka hota hai." },
      { q: "Konsi umar ke liye hai?", a: "6–8 saal (Beginner), 9–11 saal (Intermediate), aur 12–14 saal (Advanced) — teen levels mein." },
      { q: "Konsi zaban mein hai?", a: "Pura content Roman Urdu mein hai taake har Pakistani bachay aur walid samajh sake." },
    ],
  },
  {
    title: "Qeemat aur ada'igi",
    faqs: [
      { q: "Kya yeh muft hai?", a: "Pehlay 5 sabaq mukammal taur par muft hain. Mukammal curriculum sirf Rs 499 / mahina ya Rs 4,499 / saal." },
      { q: "Konsi ada'igi qabool karte hain?", a: "JazzCash, EasyPaisa, debit/credit card aur bank transfer (HBL, Meezan, UBL). Sab Rs / PKR mein." },
      { q: "Kya refund milta hai?", a: "Haan — pehlay 7 din mein 100% refund. Bagair kisi sawal ke." },
      { q: "School ya madrasa ke liye discount?", a: "Haan — 20+ bachon par 40% tak discount. Tafseel ke liye Rabta karein." },
    ],
  },
  {
    title: "Hifazat aur privacy",
    faqs: [
      { q: "Kya bachay ka asli paisay istemal hota hai?", a: "Bilkul nahi. Sab kuch sirf taleemi hai. Koi bank, koi card, koi in-app purchase nahi." },
      { q: "Kya site mein ads hain?", a: "Sabaq ke andar bilkul nahi. Bachay ki tawajju kabhi nahi tortee." },
      { q: "Mera bachay akela istemal kar sakta hai?", a: "Haan — koi chat, koi ajnabi, koi external link nahi. Mukammal mehfooz." },
    ],
  },
  {
    title: "Sabaq aur seekhna",
    faqs: [
      { q: "Ek sabaq kitna lamba hota hai?", a: "3–5 minute parhne ka, aur 5 minute ka real-life mission jo aap bachay ke saath karte hain." },
      { q: "Account chahiye?", a: "Free sabaq ke liye nahi. Progress tracking ke liye chhota account banana padta hai (sirf email)." },
      { q: "Bachay ki progress kaise dekhain?", a: "Walidain Center mein streak, quiz score aur lessons ka pura record dikhta hai." },
    ],
  },
];

function FaqPage() {
  return (
    <div>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <HelpCircle className="h-3.5 w-3.5" /> Sawal Jawab
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">Aam sawalat ke jawab</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Jo cheez aap puchhna chahte hain — shayad doosre walidain pehle hi puchh chuke hain.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-12 px-4 py-16 sm:px-6">
        {groups.map((g) => (
          <div key={g.title}>
            <h2 className="font-display text-2xl font-extrabold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> {g.title}
            </h2>
            <div className="mt-5 space-y-3">
              {g.faqs.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-border bg-card p-5 shadow-soft open:shadow-pop">
                  <summary className="cursor-pointer list-none font-bold marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {f.q}
                      <span className="text-primary transition-transform group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div className="rounded-3xl bg-primary-soft/60 p-6 text-center">
          <p className="font-bold">Aap ka sawal yahan nahi mila?</p>
          <Button asChild variant="hero" size="lg" className="mt-4">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
