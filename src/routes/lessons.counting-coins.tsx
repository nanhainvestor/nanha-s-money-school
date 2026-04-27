import { createFileRoute } from "@tanstack/react-router";
import { LessonTemplate, type LessonContent } from "@/components/LessonTemplate";

const content: LessonContent = {
  id: "counting-coins",
  title: "Counting Coins",
  level: "Beginner",
  lessonNumber: "04",
  age: "Ages 6–8",
  duration: "3 min",
  intro: "Sikkay aur note ginna seekhein — Pakistani Rupees (Rs) ke saath ek mazedaar bazar ki sair.",
  steps: [
    { caption: "Sikkay", bubble: "Pakistan mein Rs 1, Rs 2, Rs 5 aur Rs 10 ke sikkay hote hain." },
    { caption: "Note", bubble: "Note Rs 10, 20, 50, 100, 500, 1000 aur 5000 ke hote hain." },
    { caption: "Jodna", bubble: "5 sikkay × Rs 10 = Rs 50. 2 note × Rs 100 = Rs 200." },
    { caption: "Bazar", bubble: "Dukandar ko theek paisay dena bhi aik hunar hai." },
  ],
  flowTitle: "Money Map",
  flowSubtitle: "Sikkay aur note pehchanne ka asaan tareeqa.",
  flow: [
    { title: "Sikkay alag karein" },
    { title: "Note alag rakhein" },
    { title: "Bari raqam pehle ginein" },
    { title: "Total likh lein" },
  ],
  quizTitle: "Quick check",
  quizSubtitle: "Apni ginti ki maharat dikhayen.",
  quiz: [
    {
      q: "5 × Rs 20 = ?",
      options: ["Rs 50", "Rs 100", "Rs 200", "Rs 25"],
      answer: 1,
      explain: "5 × 20 = Rs 100.",
    },
    {
      q: "2 note Rs 500 + 1 note Rs 100 = ?",
      options: ["Rs 600", "Rs 1,100", "Rs 1,000", "Rs 700"],
      answer: 1,
      explain: "1000 + 100 = Rs 1,100.",
    },
    {
      q: "Sab se bara Pakistani note konsa hai?",
      options: ["Rs 1,000", "Rs 5,000", "Rs 500", "Rs 100"],
      answer: 1,
      explain: "Rs 5,000 sab se bara note hai.",
    },
  ],
  missionTitle: "The Bazar Mission",
  missionBody: "Ammi ya abu ke saath jaakar Rs 200 ka kuch kharidein aur khud paisay dein.",
  missionSteps: [
    "Khud note ginein.",
    "Dukandar ko paisay dein.",
    "Bachi hui raqam (change) check karein.",
  ],
  next: { title: "Sharing & Giving", to: "/lessons/sharing-giving" },
};

export const Route = createFileRoute("/lessons/counting-coins")({
  head: () => ({
    meta: [
      { title: "Counting Coins — Nanha Investor" },
      { name: "description", content: "Pakistani sikkay aur note ginna seekhein, bachon ke liye Rs ka mazedaar sabaq." },
    ],
  }),
  component: () => <LessonTemplate content={content} />,
});
