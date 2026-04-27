import { createFileRoute } from "@tanstack/react-router";
import { LessonTemplate, type LessonContent } from "@/components/LessonTemplate";

const content: LessonContent = {
  id: "smart-online-spending",
  title: "Smart Online Spending",
  level: "Advanced",
  lessonNumber: "04",
  age: "Ages 12–14",
  duration: "4 min",
  intro: "Internet par har cheez chamakti hai. Asal hunar hai — pehchaanna ke kya zaruri hai aur kya jaal.",
  steps: [
    { caption: "Hype", bubble: "Influencer ya ad jab koi cheez bechte hain, unhein paisay milte hain." },
    { caption: "Sawal", bubble: "Khareedne se pehle puchein: kya yeh meri zarurat hai, ya bas hype?" },
    { caption: "Trick", bubble: "'24 ghante mein khatam!' yeh emotional pressure hota hai — ruk jayein." },
    { caption: "Asool", bubble: "24 ghante ka rule: kuch bhi khareedne se pehle aik raat ka intezaar karein." },
  ],
  flowTitle: "Smart Spend Map",
  flowSubtitle: "Online jaal se bachne ka tareeqa.",
  flow: [
    { title: "Hype pehchanein" },
    { title: "Asli zarurat parkein" },
    { title: "24 ghante intezaar" },
    { title: "Phir faisla karein" },
  ],
  quizTitle: "Quick check",
  quizSubtitle: "Online dimag se kharch karna seekhein.",
  quiz: [
    {
      q: "'Sirf aaj ke liye!' kya hai?",
      options: ["Sach", "Pressure tactic", "Discount", "Ehsan"],
      answer: 1,
      explain: "Yeh emotional pressure dene ki technique hai.",
    },
    {
      q: "Influencer kuch recommend kare to?",
      options: ["Foran khareedein", "Ruk kar khud research karein", "Sab share karein", "Bhool jayein"],
      answer: 1,
      explain: "Khud research aur soch sab se behtar.",
    },
    {
      q: "24 ghante ka rule kya sikhata hai?",
      options: ["Sabar", "Jaldi", "Khareedari", "Kanjusi"],
      answer: 0,
      explain: "Rukne se aksar pata chalta hai ke wo cheez asal mein chahiye nahi thi.",
    },
  ],
  missionTitle: "The Wishlist Test",
  missionBody: "Aaj jo bhi cheez online achi lage, usay aik wishlist mein dalein — 7 din baad dekhein kya wahi pasand hai.",
  missionSteps: [
    "Aik wishlist banayein.",
    "Achi lagi har cheez likhein.",
    "7 din baad review karein — kitni cheez ab bhi chahiye?",
  ],
  next: { title: "Back to all lessons", to: "/lessons" },
};

export const Route = createFileRoute("/lessons/smart-online-spending")({
  head: () => ({
    meta: [
      { title: "Smart Online Spending — Nanha Investor" },
      { name: "description", content: "Bachon ke liye online shopping aur ads se bachne ka sabaq." },
    ],
  }),
  component: () => <LessonTemplate content={content} />,
});
