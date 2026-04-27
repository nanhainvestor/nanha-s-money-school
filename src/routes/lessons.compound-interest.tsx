import { createFileRoute } from "@tanstack/react-router";
import { LessonTemplate, type LessonContent } from "@/components/LessonTemplate";

const content: LessonContent = {
  id: "compound-interest",
  title: "Compound Interest",
  level: "Advanced",
  lessonNumber: "03",
  age: "Ages 12–14",
  duration: "5 min",
  intro: "Duniya ka 8 wan ajooba — sach mein! Paisay jab paisay kamayein, to jaadu shuru hota hai.",
  steps: [
    { caption: "Bunyaad", bubble: "Simple interest sirf asal raqam par milta hai. Compound mein interest par bhi interest." },
    { caption: "Misal", bubble: "Rs 10,000 par 10% saalana, 10 saal mein lagbhag Rs 25,937 ban jaayein." },
    { caption: "Waqt", bubble: "Jitna jaldi shuru, utna bara jaadu. Waqt = compound ka best friend." },
    { caption: "Sabaq", bubble: "Chhoti raqam + lambay arsay = badi daulat. Yeh formula amir banata hai." },
  ],
  flowTitle: "Compound Map",
  flowSubtitle: "Paisay ka snowball effect.",
  flow: [
    { title: "Asal raqam rakhein" },
    { title: "Interest milay" },
    { title: "Interest par interest" },
    { title: "Snowball banta jaaye" },
  ],
  quizTitle: "Quick check",
  quizSubtitle: "Compound ke jaadu ko samjhein.",
  quiz: [
    {
      q: "Compound interest mein asal cheez?",
      options: ["Bara raqam", "Lamba waqt", "Mehnat", "Luck"],
      answer: 1,
      explain: "Lamba waqt compound ka sab se bara dost hai.",
    },
    {
      q: "Rs 1,000 par 10% saalana, 1 saal baad?",
      options: ["Rs 1,100", "Rs 1,010", "Rs 1,000", "Rs 1,200"],
      answer: 0,
      explain: "10% of 1,000 = 100. Total = Rs 1,100.",
    },
    {
      q: "Compound shuru karne ka behtareen waqt?",
      options: ["50 saal ki umar", "Jitna jaldi mumkin", "Jab bahut paisa ho", "Kabhi nahi"],
      answer: 1,
      explain: "Aaj se acha din nahi — waqt sab kuch hai.",
    },
  ],
  missionTitle: "The Compound Calculator",
  missionBody: "Online aik compound interest calculator dhoondhein aur Rs 5,000 par 20 saal ka hisaab dekhein.",
  missionSteps: [
    "Calculator open karein.",
    "Rs 5,000, 10% saalana, 20 saal dalein.",
    "Result dekhein aur hairan ho jayein!",
  ],
  next: { title: "Smart Online Spending", to: "/lessons/smart-online-spending" },
};

export const Route = createFileRoute("/lessons/compound-interest")({
  head: () => ({
    meta: [
      { title: "Compound Interest — Nanha Investor" },
      { name: "description", content: "Bachon ke liye compound interest ka asaan jaadu — Rs ki misalon ke saath." },
    ],
  }),
  component: () => <LessonTemplate content={content} />,
});
