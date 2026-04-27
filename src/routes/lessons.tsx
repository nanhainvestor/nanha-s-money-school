import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Sparkles } from "lucide-react";

export const Route = createFileRoute("/lessons")({
  head: () => ({
    meta: [
      { title: "Sabaq — Bachon ke Liye Paisay ki Taleem | Nanha Investor" },
      { name: "description", content: "Nanha ke kahani par mabni sabaq — Beginner, Intermediate aur Advanced levels — umar 6 se 14 saal." },
      { property: "og:title", content: "Sabaq — Sabaq ka Lab" },
      { property: "og:description", content: "Bachon ke liye paisay ke kahani sabaq, umar 6–14." },
    ],
  }),
  component: LessonsPage,
});

const tracks = [
  {
    level: "Beginner",
    age: "Umar 6–8 saal",
    accent: "bg-primary-soft text-primary",
    lessons: [
      { title: "Needs vs. Wants", desc: "Nanha cycle chahta hai magar uske paas sirf Rs 50 hain. Ab kya kare?", slug: "needs-vs-wants", free: true },
      { title: "Where Money Comes From", desc: "Ammi abu kaam kyun karte hain — aur naukri kya hoti hai?", slug: "where-money-comes-from", free: true },
      { title: "The Magic of the Piggy Bank", desc: "Bachat = mustaqbil ka aap khud aap ka shukriya.", slug: "piggy-bank-magic", free: true },
      { title: "Counting Coins", desc: "Aik mazedaar bazar ki sair (Rs aur paisay).", slug: "counting-coins", free: true },
      { title: "Sharing & Giving", desc: "Meharbani bhi ek qisam ki daulat hai.", slug: "sharing-giving", free: true },
    ],
  },
  {
    level: "Intermediate",
    age: "Umar 9–11 saal",
    accent: "bg-accent-soft text-accent-foreground",
    lessons: [
      { title: "The Purpose of Money", desc: "Baray khwab + chhote haftawar qadam.", slug: "purpose-of-money", free: true },
      { title: "Budgeting Like a Boss", desc: "50-30-20 ka usool, lekin bachon ke saiz mein.", slug: "budgeting-like-a-boss", free: true },
      { title: "What Is a Bank?", desc: "Aik dosthana imarat jo aap ke paisay ki nigrani karti hai.", slug: "what-is-a-bank", free: true },
      { title: "Earning Beyond Pocket Money", desc: "Aise side-hustle khayalat jo lemonade stand nahi hain.", slug: "earning-beyond-pocket-money", free: true },
    ],
  },
  {
    level: "Advanced",
    age: "Umar 12–14 saal",
    accent: "bg-foreground text-background",
    lessons: [
      { title: "What Is Inflation?", desc: "Wahi chocolate aglay saal mehngi kyun hoti hai? (Rs 50 → Rs 70)", slug: "what-is-inflation", free: true },
      { title: "Stocks Made Simple", desc: "Aik bohat bari company ka chhota sa hissa rakhna.", slug: "stocks-made-simple", free: true },
      { title: "Compound Interest", desc: "Duniya ka 8 wan ajooba — sach mein.", slug: "compound-interest", free: true },
      { title: "Smart Online Spending", desc: "Hype, ads aur 'too good to be true' pehchanna.", slug: "smart-online-spending", free: true },
    ],
  },
];

function LessonsPage() {
  return (
    <div>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Sabaq ka Lab
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">Track chunein. Kahani shuru karein.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Har sabaq aik 3 minute ki kahani hai — aik chhota khayal, aik tasveer, aur aik kal ka mission.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:px-6">
        {tracks.map((track) => (
          <div key={track.level}>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${track.accent}`}>{track.level}</span>
                <h2 className="mt-3 font-display text-3xl font-extrabold">{track.level} Track</h2>
                <p className="text-sm text-muted-foreground">{track.age} · {track.lessons.length} sabaq</p>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {track.lessons.map((l, i) => {
                const isLive = l.title === "Needs vs. Wants";
                const Wrapper: React.ElementType = isLive ? Link : "article";
                const wrapperProps = isLive ? { to: "/lessons/needs-vs-wants" } : {};
                return (
                  <Wrapper
                    key={l.title}
                    {...wrapperProps}
                    className="group relative flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-pop"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-3xl font-extrabold text-muted-foreground/40">{String(i + 1).padStart(2, "0")}</span>
                      {l.free ? (
                        <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold uppercase text-accent-foreground">Free</span>
                      ) : (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <h3 className="mt-4 text-lg font-bold">{l.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{l.desc}</p>
                    <div className="mt-5 flex items-center gap-2 text-sm font-bold text-primary">
                      {isLive ? "Start Lesson" : l.free ? "Coming soon" : "Save my spot"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-gradient-primary p-10 text-center text-primary-foreground shadow-pop md:p-14">
          <h2 className="font-display text-3xl font-extrabold">Mukammal curriculum chahiye?</h2>
          <p className="mt-3 text-primary-foreground/90">Sirf Rs 499 / mahina. Walidain syllabus aur weekly tips bhi shamil.</p>
          <Button asChild variant="sun" size="xl" className="mt-6">
            <Link to="/parents">Open Parents Center</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
