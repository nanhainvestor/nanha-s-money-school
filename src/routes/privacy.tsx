import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Nanha Investor" },
      { name: "description", content: "Nanha Investor ki privacy policy: hum bachon aur walidain ka data kis tarah hifazat se istemal karte hain." },
      { property: "og:title", content: "Privacy Policy — Nanha Investor" },
      { property: "og:description", content: "Bachon aur walidain ke data ki hifazat ka tareeqa." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <ShieldCheck className="h-3.5 w-3.5" /> Privacy Policy
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">Aap ka data, aap ki marzi</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Aakhri tabdeeli: 27 April 2026. Hum bachon aur walidain ki privacy ko sab se ahem samajhte hain.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-8 px-4 py-16 sm:px-6">
        <Block title="1. Hum kya jama karte hain">
          Sirf wohi maloomat jo aap khud hamein dete hain — masalan email pata jab aap muft kit download karein. Hum bachay ka naam, school, ya ghar ka pata kabhi nahi mangtay.
        </Block>
        <Block title="2. Hum kyun jama karte hain">
          Sirf is liye ke aap ko sabaq, kit, aur weekly tips bhej saken. Aap kabhi bhi ek click se unsubscribe kar sakte hain.
        </Block>
        <Block title="3. Bachon ki khaas hifazat">
          Site COPPA aur GDPR-K ke usool ke mutabiq banayi gayi hai. 13 saal se kam umar ke bachon ka data hum directly jama nahi karte — sirf walidain ka email hota hai.
        </Block>
        <Block title="4. Cookies aur tracking">
          Hum sirf zaruri cookies aur basic analytics istemal karte hain. Lessons ke andar koi third-party ad ya tracker nahi hota. Tafseel ke liye <Link to="/cookies" className="text-primary underline">Cookies Policy</Link> dekhein.
        </Block>
        <Block title="5. Paisay ka muamla">
          Tamam qeematein Pakistani Rupees (Rs / PKR) mein hain. Hum bachay ke bank account, real money ya in-app purchase kabhi nahi mangte.
        </Block>
        <Block title="6. Aap ke huqooq">
          Aap kisi bhi waqt apna data dekh, theek karwa, ya hamesha ke liye delete karwa sakte hain. Sirf <Link to="/contact" className="text-primary underline">Rabta</Link> page se hamein likhain.
        </Block>
        <Block title="7. Tabdeeliyan">
          Agar policy mein koi badi tabdeeli ho gi to hum aap ko email se ittela denge.
        </Block>

        <div className="rounded-3xl bg-primary-soft/60 p-6 text-center">
          <p className="font-bold">Koi sawal hai?</p>
          <Button asChild variant="hero" size="lg" className="mt-4">
            <Link to="/contact">Hum se rabta karein</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-extrabold flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" /> {title}
      </h2>
      <p className="mt-2 text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}
