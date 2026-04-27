import { createFileRoute } from "@tanstack/react-router";
import { LessonTemplate, type LessonContent } from "@/components/LessonTemplate";

const content: LessonContent = {
  id: "purpose-of-money",
  title: "The Purpose of Money",
  level: "Intermediate",
  lessonNumber: "01",
  age: "Ages 9–11",
  duration: "4 min",
  intro: "Paisay khud manzil nahi — aik zariya hai. Aaj samjhein ke aap ke khwab tak yeh kaise pahunchata hai.",
  steps: [
    { caption: "Sawal", bubble: "Paisay agar khatam ho jayein to bhi khwab khatam nahi hote." },
    { caption: "Maqsad", bubble: "Har bara khwab — ghar, taleem, safar — chhote haftawar qadam mangta hai." },
    { caption: "Goal", bubble: "Aik khwab chunein, qeemat likhein, aur weekly bachat tay karein." },
    { caption: "Misal", bubble: "Rs 12,000 ki cycle = Rs 500 weekly × 24 hafte. Bas itna asaan!" },
  ],
  flowTitle: "Goal Map",
  flowSubtitle: "Bara khwab → chhote qadam mein todna.",
  flow: [
    { title: "Khwab likhein" },
    { title: "Qeemat ka pata karein" },
    { title: "Hafte ki bachat tay karein" },
    { title: "Har hafte progress check" },
  ],
  quizTitle: "Quick check",
  quizSubtitle: "Goal banane ka asool yad rakhein.",
  quiz: [
    {
      q: "Rs 6,000 ka khwab, har hafte Rs 500 — kitne hafte?",
      options: ["6", "12", "24", "10"],
      answer: 1,
      explain: "6,000 ÷ 500 = 12 hafte.",
    },
    {
      q: "Goal kis tareeqe se behtar banta hai?",
      options: ["Sirf socha jaye", "Likh kar aur qadam tay kar ke", "Doosron ko bata kar", "Ignore kar ke"],
      answer: 1,
      explain: "Likha hua goal hamesha zyada poora hota hai.",
    },
    {
      q: "Paisay kya hain?",
      options: ["Manzil", "Zariya", "Khilauna", "Mushkil"],
      answer: 1,
      explain: "Paisay zariya hain — manzil aap ke khwab hain.",
    },
  ],
  missionTitle: "The Goal Card Mission",
  missionBody: "Aaj aik card par apna khwab, qeemat, aur weekly amount likhein. Fridge par lagayein.",
  missionSteps: [
    "Apna khwab likhein.",
    "Qeemat (Rs) likhein.",
    "Hafte ki bachat aur dates likhein.",
  ],
  next: { title: "Budgeting Like a Boss", to: "/lessons/budgeting-like-a-boss" },
};

export const Route = createFileRoute("/lessons/purpose-of-money")({
  head: () => ({
    meta: [
      { title: "The Purpose of Money — Nanha Investor" },
      { name: "description", content: "Bachon ke liye goal-setting aur paisay ke maqsad ka sabaq." },
    ],
  }),
  component: () => <LessonTemplate content={content} />,
});
