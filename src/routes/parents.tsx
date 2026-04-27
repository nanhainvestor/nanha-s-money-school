import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, ShieldCheck, CheckCircle2, Sparkles, TrendingUp, Trophy, Clock } from "lucide-react";
import { getLessonProgress, type LessonProgress } from "@/lib/progress";

export const Route = createFileRoute("/parents")({
  head: () => ({
    meta: [
      { title: "Parent Center — Curriculum, Safety & Resources | Nanha Investor" },
      { name: "description", content: "Everything parents need to confidently teach money: full curriculum roadmap, FAQ, safety promise, and downloadable starter kit." },
      { property: "og:title", content: "Parent Center — Nanha Investor" },
      { property: "og:description", content: "Curriculum, safety, and downloadables for parents." },
    ],
  }),
  component: ParentsPage,
});

const faqs = [
  { q: "Is there any real money involved?", a: "No. Nanha never asks for bank logins, real money, or in-app purchases. Lessons are purely educational." },
  { q: "What ages is this for?", a: "Designed for ages 6–14, split into Beginner, Intermediate, and Advanced tracks." },
  { q: "How long does each lesson take?", a: "About 3–5 minutes of reading + a 5-minute real-world mini-mission to do together." },
  { q: "Do I need an account?", a: "Not for the free lessons. Accounts are coming soon for progress tracking." },
  { q: "Is the site safe for unsupervised reading?", a: "Yes — no chat, no ads, no third-party links inside lessons." },
];

function ParentsPage() {
  return (
    <div>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Parent Center
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">A plug-and-play money curriculum you can trust</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            See exactly what your child is learning, in what order, and why.
          </p>
        </div>
      </section>

      {/* Roadmap */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-extrabold">Curriculum roadmap</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { t: "Module 1 — Money Basics", items: ["Needs vs. Wants", "Where money comes from", "Coins & bills"] },
            { t: "Module 2 — Saving & Goals", items: ["Setting a goal", "Budgeting basics", "Patience pays"] },
            { t: "Module 3 — Growing Money", items: ["Banks explained", "Inflation", "Intro to investing"] },
          ].map((m) => (
            <div key={m.t} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <h3 className="font-bold">{m.t}</h3>
              <ul className="mt-4 space-y-2">
                {m.items.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Safety */}
      <section className="bg-primary-soft/40">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
          <div>
            <ShieldCheck className="h-10 w-10 text-primary" />
            <h2 className="mt-3 font-display text-3xl font-extrabold">Our safety promise</h2>
            <p className="mt-3 text-muted-foreground">
              Nanha Investor is ad-free, chat-free, purchase-free, and bank-free. We collect your email only if you choose to receive the starter kit — and you can unsubscribe in one click.
            </p>
          </div>
          <ul className="space-y-3">
            {[
              "No real-money transactions, ever",
              "No third-party ads or trackers in lessons",
              "No social features or peer chat",
              "COPPA-aligned data handling",
            ].map((s) => (
              <li key={s} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm font-semibold">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-extrabold text-center">Parent FAQ</h2>
        <div className="mt-8 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-border bg-card p-5 shadow-soft open:shadow-pop">
              <summary className="cursor-pointer list-none font-bold marker:hidden">
                <span className="flex items-center justify-between">
                  {f.q}
                  <span className="ml-4 text-primary transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Download */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-gradient-primary p-10 text-center text-primary-foreground shadow-pop md:p-14">
          <Download className="mx-auto h-10 w-10 text-accent" />
          <h2 className="mt-4 font-display text-3xl font-extrabold">Download the full syllabus</h2>
          <p className="mt-3 text-primary-foreground/90">A printable PDF with every lesson, age group, and at-home mission.</p>
          <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="parent@email.com"
              className="h-12 flex-1 rounded-full border-0 bg-background px-5 text-foreground outline-none ring-2 ring-transparent focus:ring-accent"
            />
            <Button type="submit" variant="sun" size="lg">Download Syllabus</Button>
          </form>
        </div>
      </section>
    </div>
  );
}
