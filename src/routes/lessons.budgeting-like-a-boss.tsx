import { createFileRoute } from "@tanstack/react-router";
import { LessonTemplate, type LessonContent } from "@/components/LessonTemplate";

const content: LessonContent = {
  id: "budgeting-like-a-boss",
  title: "Budgeting Like a Boss",
  level: "Intermediate",
  lessonNumber: "02",
  age: "Ages 9–11",
  duration: "5 min",
  intro: "50-30-20 ka usool — bachon ke saiz mein. Apni pocket money ko boss ki tarah chalayein.",
  steps: [
    { caption: "Usool", bubble: "50% zaruriat, 30% khwahishat, 20% bachat — yeh boss ka formula hai." },
    { caption: "Misal", bubble: "Agar Rs 1,000 milein: Rs 500 zaruri, Rs 300 mazay, Rs 200 bachat." },
    { caption: "Lachak", bubble: "Apni umar aur halat ke mutabiq formula ko thora adjust karein." },
    { caption: "Aadat", bubble: "Har hafte likhein — 'kahan gaya?' Yeh sawal sab kuch badal deta hai." },
  ],
  flowTitle: "Budget Map",
  flowSubtitle: "Char qadam, sukoon ki zindagi.",
  flow: [
    { title: "Apni kamai likhein" },
    { title: "50% zaruriat" },
    { title: "30% khwahishat" },
    { title: "20% bachat" },
  ],
  quizTitle: "Quick check",
  quizSubtitle: "Hisaab kitaab ka maza.",
  quiz: [
    {
      q: "Rs 2,000 ka 20% bachat = ?",
      options: ["Rs 200", "Rs 400", "Rs 100", "Rs 500"],
      answer: 1,
      explain: "20% of 2,000 = Rs 400.",
    },
    {
      q: "50-30-20 mein 30 kis ke liye hai?",
      options: ["Bachat", "Khwahishat", "Zaruriat", "Sadqa"],
      answer: 1,
      explain: "30% mazay aur khwahishat ke liye hai.",
    },
    {
      q: "Budget ka asal faida?",
      options: ["Tang karna", "Control aur sukoon", "Kanjus banna", "Kuch nahi"],
      answer: 1,
      explain: "Budget aap ko apne paisay par control deta hai.",
    },
  ],
  missionTitle: "Aap ka Pehla Budget",
  missionBody: "Is hafte ki pocket money ko 50-30-20 mein baant kar likhein. Hafte ke aakhir mein dekhein.",
  missionSteps: [
    "Apni weekly raqam likhein.",
    "3 hisson mein baantein.",
    "Hafte ke aakhir mein actual kharcha compare karein.",
  ],
  next: { title: "What Is a Bank?", to: "/lessons/what-is-a-bank" },
};

export const Route = createFileRoute("/lessons/budgeting-like-a-boss")({
  head: () => ({
    meta: [
      { title: "Budgeting Like a Boss — Nanha Investor" },
      { name: "description", content: "50-30-20 budget rule, bachon ke liye Rs mein asaan misalon ke saath." },
    ],
  }),
  component: () => <LessonTemplate content={content} />,
});
