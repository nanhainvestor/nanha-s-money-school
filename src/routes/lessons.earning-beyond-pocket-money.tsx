import { createFileRoute } from "@tanstack/react-router";
import { LessonTemplate, type LessonContent } from "@/components/LessonTemplate";

const content: LessonContent = {
  id: "earning-beyond-pocket-money",
  title: "Earning Beyond Pocket Money",
  level: "Intermediate",
  lessonNumber: "04",
  age: "Ages 9–11",
  duration: "5 min",
  intro: "Pocket money ke ilawa bhi aap halal tareeqe se thora kama sakte hain — chhote, asaan kaam.",
  steps: [
    { caption: "Khayal", bubble: "Mehnat ka phal mitha hota hai. Aap ka waqt + hunar = paisa." },
    { caption: "Misalain", bubble: "Padosi ke choti seva, ghar mein madad, ya art bana kar bechna." },
    { caption: "Online", bubble: "Bare bachay tutoring, calligraphy ya simple design ka kaam le sakte hain." },
    { caption: "Ehtiyat", bubble: "Ajnabi se kaam lene se pehle hamesha walidain ko batayein." },
  ],
  flowTitle: "Earning Map",
  flowSubtitle: "Apna chhota hustle shuru karne ka tareeqa.",
  flow: [
    { title: "Apna hunar pehchanein" },
    { title: "Aik chhota service chunein" },
    { title: "Walidain ko batayein" },
    { title: "Pehla customer dhoondhein" },
  ],
  quizTitle: "Quick check",
  quizSubtitle: "Khud kamai ke usool yaad rakhein.",
  quiz: [
    {
      q: "Khud kamai ke liye sab se zaruri cheez?",
      options: ["Bahut paisa", "Hunar aur waqt", "Bara ghar", "Imported cheez"],
      answer: 1,
      explain: "Hunar + waqt sab se asal sarmaya hai.",
    },
    {
      q: "Online kaam lene se pehle?",
      options: ["Foran haan kar dein", "Walidain ko batayein", "Apna address dein", "Picture share karein"],
      answer: 1,
      explain: "Walidain ki ijazat aur nigrani sab se zaruri hai.",
    },
    {
      q: "Halal kamai ki khaas baat?",
      options: ["Sirf bahut", "Sukoon aur barkat", "Jaldi aati hai", "Kabhi nahi rukti"],
      answer: 1,
      explain: "Halal kamai mein barkat aur sukoon hota hai.",
    },
  ],
  missionTitle: "The First Hustle",
  missionBody: "Is hafte aik chhoti service ka khayal likhein aur walidain se mashwara karein.",
  missionSteps: [
    "Apna hunar likhein.",
    "Aik service ka idea sochein.",
    "Walidain se feedback lein.",
  ],
  next: { title: "What Is Inflation?", to: "/lessons/what-is-inflation" },
};

export const Route = createFileRoute("/lessons/earning-beyond-pocket-money")({
  head: () => ({
    meta: [
      { title: "Earning Beyond Pocket Money — Nanha Investor" },
      { name: "description", content: "Bachon ke liye chhote, halal earning ke ideas — walidain ki nigrani mein." },
    ],
  }),
  component: () => <LessonTemplate content={content} />,
});
