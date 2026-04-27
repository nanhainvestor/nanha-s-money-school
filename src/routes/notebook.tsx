import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/notebook")({
  head: () => ({
    meta: [
      { title: "Nanha's Notebook — Money Tips for Kids & Parents" },
      { name: "description", content: "Short, practical reads on raising money-smart kids — from explaining inflation to picking a child's first book about finance." },
      { property: "og:title", content: "Nanha's Notebook" },
      { property: "og:description", content: "Short, practical reads on raising money-smart kids." },
    ],
  }),
  component: NotebookPage,
});

const posts = [
  { tag: "For Parents", title: "How to explain inflation to a 10-year-old", read: "4 min read", excerpt: "A chocolate bar, a calendar, and one tiny analogy that actually sticks." },
  { tag: "Book List", title: "5 best books to teach kids about money", read: "6 min read", excerpt: "Hand-picked picture books and chapter books, sorted by age." },
  { tag: "Activity", title: "The $20 Saturday challenge", read: "3 min read", excerpt: "A weekend game that quietly teaches budgeting, trade-offs, and patience." },
  { tag: "For Kids", title: "What is a 'stock', really?", read: "2 min read", excerpt: "Imagine a giant pizza you can own one tiny slice of…" },
  { tag: "For Parents", title: "Allowance: pay for chores or not?", read: "5 min read", excerpt: "The two schools of thought, and a third option most families miss." },
  { tag: "Activity", title: "Make a goal jar in 10 minutes", read: "2 min read", excerpt: "All you need is a jar, a marker, and a tiny dream." },
];

function NotebookPage() {
  return (
    <div>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Nanha&apos;s Notebook
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">Tiny reads. Big ideas.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A growing library of short articles, family activities, and book recommendations.
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
