import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Heart, Lightbulb, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import nanhaHero from "@/assets/nanha-hero.png";
import nanhaTeaching from "@/assets/nanha-teaching.png";
import piggyBank from "@/assets/piggy-bank.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nanha Investor — Bachon ke Liye Paisay ke Sabaq" },
      { name: "description", content: "6 se 14 saal ke Pakistani bachon ke liye kahani par mabni paisay ke sabaq. Sukoon bhare, screen-friendly, walidain ke saath." },
      { property: "og:title", content: "Nanha Investor — Bachon ke Liye Paisay ke Sabaq" },
      { property: "og:description", content: "Pakistani bachon ke liye paisay ki taleem — qeematein Rs / PKR mein." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Umar 6–14 saal
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Milein <span className="text-primary">Nanha</span> se.
              <br />
              Wo dost jo <span className="bg-gradient-accent bg-clip-text text-transparent">paisay ki samajh dilata hai.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Sukoon bhari, kahani par mabni sabaq — jo mushkil paisay ke khayalat ko chhote chhote tukron mein samjhati hain.
              Na bank app, na mushkil alfaaz, na screen ka khauf.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="hero" size="xl">
                <Link to="/lessons">Pehla Sabaq Shuru Karein <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="soft" size="xl">
                <Link to="/parents">Walidain ke Liye</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[0,1,2,3].map(i => (
                  <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-primary to-accent" />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 text-accent">
                  {[...Array(5)].map((_,i)=><Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="font-semibold text-foreground">2,000+ pyaare bachon ka pasandeeda</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-full bg-gradient-accent opacity-20 blur-3xl" />
            <img
              src={nanhaHero}
              alt="Nanha Investor mascot haath hilata hua aur sona ka sikka pakray"
              width={1024}
              height={1024}
              className="mx-auto w-full max-w-md animate-float drop-shadow-xl"
            />
            <div className="absolute left-2 top-6 hidden rounded-2xl bg-card px-4 py-3 shadow-pop md:block">
              <p className="text-sm font-semibold">Salaam! Main Nanha hoon 👋</p>
              <p className="text-xs text-muted-foreground">Aayo paisay ke baray mein seekhein!</p>
            </div>
            <div className="absolute -bottom-2 right-0 hidden rounded-2xl bg-accent px-4 py-2 text-accent-foreground shadow-sun md:block">
              <p className="text-sm font-bold">+ Rs 50 aaj bachay</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Nanha kaise sikhata hai</h2>
          <p className="mt-4 text-muted-foreground">Teen chhote qadam. Ek bara aadat. Bachon ki tawajju aur baray sawalat ke liye banaya gaya.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: BookOpen, title: "1. Chhoti kahani parhein", desc: "Har sabaq ek 3 minute ki kahani hai — Nanha cycle chahta hai magar uske paas Rs 50 hain. Ab kya kare?" },
            { icon: Lightbulb, title: "2. Khayal pakrein", desc: "Tasveer wale flowchart aur pyare icons kahani ke andar chhupa idea dikhate hain." },
            { icon: Heart, title: "3. Kal try karein", desc: "Har sabaq ke akhir mein ek chhota mission hota hai jo bachay ghar par karte hain." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-pop">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-soft text-primary transition-colors group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CURRICULUM PEEK */}
      <section className="bg-primary-soft/40">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
          <img src={nanhaTeaching} alt="Nanha whiteboard ki taraf ishaara karta hua" loading="lazy" width={1024} height={1024} className="mx-auto w-full max-w-sm animate-bob" />
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
              Sabaq ka Lab
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">Piggy bank se portfolio tak ka safar</h2>
            <p className="mt-4 text-muted-foreground">Teen levels, bees kahaniyan. Ustaadon ne banayi, fankaaron ne sajayi.</p>
            <div className="mt-6 space-y-3">
              {[
                { tag: "Beginner", color: "bg-primary-soft text-primary", title: "Zaruriat aur Khwahishat", note: "Umar 6–8 · 5 sabaq" },
                { tag: "Intermediate", color: "bg-accent-soft text-accent-foreground", title: "Bachat aur Maqsad", note: "Umar 9–11 · 8 sabaq" },
                { tag: "Advanced", color: "bg-foreground text-background", title: "Sarmaya Kari ki Bunyaad", note: "Umar 12–14 · 7 sabaq" },
              ].map((l) => (
                <div key={l.title} className="flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-4 shadow-soft">
                  <div className="flex items-center gap-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${l.color}`}>{l.tag}</span>
                    <div>
                      <p className="font-bold">{l.title}</p>
                      <p className="text-xs text-muted-foreground">{l.note}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </div>
            <Button asChild variant="hero" size="lg" className="mt-8">
              <Link to="/lessons">Lab Dekhein</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PRICING TEASE */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Pakistani jeb dosti qeematein</h2>
          <p className="mt-4 text-muted-foreground">Pehlay 5 sabaq bilkul muft. Mukammal curriculum bohat asaan qeemat par.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { plan: "Free", price: "Rs 0", period: "hamesha", features: ["5 muft sabaq", "Walidain center", "Streak tracker"], cta: "Shuru Karein", to: "/lessons" as const, variant: "soft" as const },
            { plan: "Mahana", price: "Rs 499", period: "/ mahina", features: ["Sare 20+ sabaq", "Quiz aur certificate", "Walidain ke weekly tips"], cta: "Plan Lein", to: "/parents" as const, variant: "hero" as const, highlight: true },
            { plan: "Salana", price: "Rs 4,499", period: "/ saal", features: ["Mahana plan ke sare features", "2 mahine muft", "Printable starter kit"], cta: "Bachat ke Sath Lein", to: "/parents" as const, variant: "sun" as const },
          ].map((p) => (
            <div key={p.plan} className={`rounded-3xl border bg-card p-7 shadow-soft ${p.highlight ? "border-primary shadow-pop ring-2 ring-primary/20" : "border-border"}`}>
              {p.highlight && <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">Sab se Mashhoor</span>}
              <h3 className="mt-3 font-display text-xl font-extrabold">{p.plan}</h3>
              <p className="mt-2"><span className="font-display text-4xl font-extrabold text-primary">{p.price}</span> <span className="text-sm text-muted-foreground">{p.period}</span></p>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {p.features.map((f) => <li key={f}>• {f}</li>)}
              </ul>
              <Button asChild variant={p.variant} size="lg" className="mt-6 w-full">
                <Link to={p.to}>{p.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="bg-primary-soft/40">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="font-display text-3xl font-extrabold text-center sm:text-4xl">Walidain kya kehte hain</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { quote: "Mera 8 saal ka beta ab har cheez ke baray mein puchhta hai — yeh zarurat hai ya khwahish? Kamaal!", name: "Ayesha, Lahore" },
              { quote: "Aakhirkar ek site jo bachon ke liye casino app jaisi nahi lagti.", name: "Bilal, Karachi" },
              { quote: "Mujhe Nanha bohat pasand hai! Wo paisay ki sab se achi kahaniyan sunata hai.", name: "Hamza, 9 saal" },
            ].map((t) => (
              <figure key={t.name} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                <div className="flex gap-0.5 text-accent">
                  {[...Array(5)].map((_,i)=><Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="mt-4 text-foreground">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-muted-foreground">— {t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / EMAIL */}
      <section className="px-4 py-20 sm:px-6">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-primary p-10 text-primary-foreground shadow-pop md:p-16">
          <img src={piggyBank} alt="" loading="lazy" width={1024} height={1024} className="absolute -bottom-8 -right-8 hidden w-64 opacity-90 md:block" />
          <div className="relative max-w-xl">
            <ShieldCheck className="h-8 w-8 text-accent" />
            <h2 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">Muft "Money-Smart Bachay Starter Kit" hasil karein</h2>
            <p className="mt-3 text-primary-foreground/90">12 safhaat ka printable PDF — 5 chhote sabaq jo aap is weekend bachay ke saath kar sakte hain. Bilkul muft (Rs 0).</p>
            <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="walid@email.com"
                className="h-12 flex-1 rounded-full border-0 bg-background px-5 text-foreground outline-none ring-2 ring-transparent focus:ring-accent"
              />
              <Button type="submit" variant="sun" size="lg">Muft Kit Bhejein</Button>
            </form>
            <p className="mt-3 text-xs text-primary-foreground/80">Koi spam nahi. Ek click se unsubscribe.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
