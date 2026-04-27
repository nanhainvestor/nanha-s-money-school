import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/notebook")({
  head: () => ({
    meta: [
      { title: "Nanha ki Note Book — Bachon aur Walidain ke Liye Tips" },
      { name: "description", content: "Money-smart bachay parwarish ke chhote, kaam ki padhayi — Roman Urdu mein." },
      { property: "og:title", content: "Nanha ki Note Book" },
      { property: "og:description", content: "Bachon ke liye paisay ki taleem par chhote articles." },
    ],
  }),
  component: NotebookPage,
});

const posts = [
  { tag: "Walidain ke Liye", title: "Inflation 10 saal ke bachay ko kaise samjhayein", read: "4 min", excerpt: "Aik chocolate, aik calendar, aur aik chhoti misaal jo waqai zehan mein bait jati hai." },
  { tag: "Kitaab List", title: "Bachon ko paisay sikhane ki 5 behtareen kitaabein", read: "6 min", excerpt: "Umar ke hisaab se chuni gayi tasveer wali kitaabein aur chapter books." },
  { tag: "Activity", title: "Rs 500 ka Saturday challenge", read: "3 min", excerpt: "Aik weekend game jo chupkay se budgeting, faislay aur sabar sikhata hai." },
  { tag: "Bachon ke Liye", title: "'Stock' asal mein hota kya hai?", read: "2 min", excerpt: "Sochain aik bohat bara pizza jiska aap ek chhota sa tukra rakh sakte hain..." },
  { tag: "Walidain ke Liye", title: "Pocket money: kaam ke badle ya yun hi?", read: "5 min", excerpt: "Do soch, aur aik teesra option jo zyada families miss karti hain." },
  { tag: "Activity", title: "10 minute mein Maqsad Jar banayein", read: "2 min", excerpt: "Sirf aik jar, aik marker, aur aik chhota khwab chahiye." },
];

function NotebookPage() {
  return (
    <div>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Nanha ki Note Book
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">Chhoti padhayi. Baray khayalat.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Chhote articles, family activities, aur kitaab ki tajaweez ka barhta hua silsila.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <article key={p.title} className="group flex flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-pop">
              <div className={`mb-5 h-32 rounded-2xl ${i % 3 === 0 ? "bg-gradient-primary" : i % 3 === 1 ? "bg-gradient-accent" : "bg-primary-soft"}`} />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{p.tag}</span>
              <h3 className="mt-2 text-lg font-bold leading-snug">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{p.read}</span>
                <span className="flex items-center gap-1 font-bold text-primary">Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
