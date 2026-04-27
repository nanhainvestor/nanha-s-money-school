import { createFileRoute } from "@tanstack/react-router";
import { LessonTemplate, type LessonContent } from "@/components/LessonTemplate";

const content: LessonContent = {
  id: "what-is-inflation",
  title: "What Is Inflation?",
  level: "Advanced",
  lessonNumber: "01",
  age: "Ages 12–14",
  duration: "5 min",
  intro: "Wahi chocolate aglay saal mehngi kyun ho jati hai? Yeh hai inflation ka jaadu (ya jhaadu).",
  steps: [
    { caption: "Misal", bubble: "Pichle saal Rs 50 ki chocolate, ab Rs 70 ki — yeh inflation hai." },
    { caption: "Wajah", bubble: "Cheezein banane ka kharcha barhta hai, demand barhti hai, paisay ki value girti hai." },
    { caption: "Asar", bubble: "Aaj ke Rs 1,000 5 saal baad utni cheez nahi khareed sakte." },
    { caption: "Hifazat", bubble: "Inflation se bachne ke liye sirf bachat kaafi nahi — sarmaya kari zaruri hai." },
  ],
  flowTitle: "Inflation Map",
  flowSubtitle: "Paisay ki value kaise girti hai.",
  flow: [
    { title: "Cheez ki demand barhi" },
    { title: "Banane ka kharcha barha" },
    { title: "Qeemat barhi (Rs zyada)" },
    { title: "Paisay ki taqat kam hui" },
  ],
  quizTitle: "Quick check",
  quizSubtitle: "Asal duniya ki misalein dekhein.",
  quiz: [
    {
      q: "Inflation ka matlab?",
      options: ["Cheezein sasti hona", "Cheezein mehngi hona", "Paisay barhna", "Bank band hona"],
      answer: 1,
      explain: "Inflation matlab cheezein mehngi hoti hain aur paisay ki value girti hai.",
    },
    {
      q: "Agar inflation 10% hai, to Rs 100 ki cheez aglay saal kitni?",
      options: ["Rs 90", "Rs 110", "Rs 100", "Rs 200"],
      answer: 1,
      explain: "100 + 10% = Rs 110.",
    },
    {
      q: "Inflation se bachne ka behtareen tareeqa?",
      options: ["Sirf jeb mein rakhna", "Sarmaya kari", "Kharch karna", "Kuch nahi karna"],
      answer: 1,
      explain: "Sarmaya kari (investment) inflation se aage rehne mein madad karti hai.",
    },
  ],
  missionTitle: "The Price Tracker Mission",
  missionBody: "5 cheezein chunein (chocolate, doodh, etc.) aur 4 hafte unki qeemat note karein.",
  missionSteps: [
    "5 cheezein chunein.",
    "Har hafte qeemat (Rs) likhein.",
    "Aakhir mein farak compare karein.",
  ],
  next: { title: "Stocks Made Simple", to: "/lessons/stocks-made-simple" },
};

export const Route = createFileRoute("/lessons/what-is-inflation")({
  head: () => ({
    meta: [
      { title: "What Is Inflation? — Nanha Investor" },
      { name: "description", content: "Bachon ke liye inflation ki asaan samajh, Rs ki misalon ke saath." },
    ],
  }),
  component: () => <LessonTemplate content={content} />,
});
