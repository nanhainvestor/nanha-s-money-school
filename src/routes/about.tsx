import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, BookOpen, ShieldCheck } from "lucide-react";
import nanhaTeaching from "@/assets/nanha-teaching.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Hamara Taaruf — Nanha Investor ka Maqsad" },
      { name: "description", content: "Nanha kyun mojood hai: Pakistani bachon ke liye sukoon bhara, kahani par mabni paisay seekhne ka tareeqa." },
      { property: "og:title", content: "Hamara Taaruf — Nanha Investor" },
      { property: "og:description", content: "Pakistani bachon ke liye paisay ki taleem ka naya andaaz." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Hamari kahani
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Paisay zindagi ka hunar hai.
            <br /> <span className="text-primary">Hum bhi isay aise hi sikhate hain.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Pakistan ke schools mein financial literacy bohat kam parhayi jati hai. Bank apps mushkil hain. Game apps shor wale hain.
            Nanha beech mein bethta hai — taleemi tor par durust, character par mabni, aur itna chhota ke khanay aur sonay ke darmiyan ho jaye.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
        <img src={nanhaTeaching} alt="Nanha whiteboard par" loading="lazy" width={1024} height={1024} className="mx-auto w-full max-w-sm" />
        <div>
          <h2 className="font-display text-3xl font-extrabold">Nanha ka usool</h2>
          <p className="mt-4 text-muted-foreground">
            Bachay ko aqalmand seekhne wala samjho. Mushkil alfaaz ki jagah kahaniyan do. Sirf screen ke liye screen nahi — har din ek chhota khayal.
          </p>
          <ul className="mt-6 space-y-4">
            {[
              { icon: BookOpen, t: "Pehle kahani", d: "Har sabaq aik kahani se shuru hota hai, definition se nahi." },
              { icon: Heart, t: "Sukoon bhara andaaz", d: "Koi flashing inaam nahi. Koi naqli paisay nahi. Sirf khaalis samajh." },
              { icon: ShieldCheck, t: "Walidain ka aitmaad", d: "Koi asli paisay, koi bank link, koi in-app purchase. Kabhi nahi." },
            ].map(({ icon: Icon, t, d }) => (
              <li key={t} className="flex gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
                <div>
                  <p className="font-bold">{t}</p>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-primary-soft/40">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h2 className="font-display text-3xl font-extrabold">Bachay Nanha ke saath kya seekhte hain</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { n: "20+", l: "Kahani sabaq" },
              { n: "3", l: "Hunar levels" },
              { n: "Rs 0", l: "Asli paisay ka khatra" },
            ].map((s) => (
              <div key={s.l} className="rounded-3xl border border-border bg-card p-8 shadow-soft">
                <p className="font-display text-5xl font-extrabold text-primary">{s.n}</p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
          <Button asChild variant="hero" size="xl" className="mt-10">
            <Link to="/lessons">Andar jhank kar dekhein</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
