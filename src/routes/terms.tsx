import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Sparkles } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Nanha Investor" },
      { name: "description", content: "Nanha Investor ke istemal ki shartein — wazeh, asaan aur walidain ke liye." },
      { property: "og:title", content: "Terms of Service — Nanha Investor" },
      { property: "og:description", content: "Site istemal karne ke usool aur shartein." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <FileText className="h-3.5 w-3.5" /> Terms of Service
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">Istemal ki shartein</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Aakhri tabdeeli: 27 April 2026. Yeh shartein qubool kar ke aap site istemal kar sakte hain.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-8 px-4 py-16 sm:px-6">
        <Item n="1" title="Site ka maqsad">
          Nanha Investor sirf taleemi maqsad ke liye hai. Yeh financial advice nahi hai. Asal sarmaya kari ke faislay hamesha kisi licensed mahir se mashwara kar ke karein.
        </Item>
        <Item n="2" title="Bachon ka istemal">
          13 saal se kam umar ke bachay sirf walidain ki nigrani mein site istemal karein. Walidain bachay ke account aur activity ke zimmedar hain.
        </Item>
        <Item n="3" title="Qeematein aur ada'igi">
          Tamam qeematein Rs / PKR mein hain aur tax shamil ho sakta hai. Free content hamesha free rahega. Premium content ki qeemat clearly likhi jayegi.
        </Item>
        <Item n="4" title="Mamnoo istemal">
          Site ko galat tareeqe se, hacking, scraping, ya kisi ko nuqsan pohchanay ke liye istemal karna mana hai.
        </Item>
        <Item n="5" title="Intellectual property">
          Tamam content, character (Nanha mascot samait), aur design Nanha Investor ki milkiyat hain. Bagair ijazat copy karna mana hai.
        </Item>
        <Item n="6" title="Zimmedari ki had">
          Hum site ko behtareen banane ki koshish karte hain lekin "as is" basis par farahem karte hain. Kisi bhi nuqsan ke liye zimmedari mehdood hai.
        </Item>
        <Item n="7" title="Tabdeeliyan">
          Hum yeh shartein kabhi bhi tabdeel kar sakte hain. Bari tabdeeli par email se ittela di jayegi.
        </Item>
        <Item n="8" title="Qanoon">
          Yeh shartein Pakistan ke qanoon ke tehat banai gayi hain.
        </Item>

        <p className="text-sm text-muted-foreground">
          Sawal? <Link to="/contact" className="text-primary underline">Hum se rabta karein</Link>.
        </p>
      </section>
    </div>
  );
}

function Item({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary-soft text-primary font-bold">{n}</span>
        <h2 className="font-display text-xl font-extrabold flex items-center gap-2">{title}</h2>
      </div>
      <p className="mt-3 text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}
