import { createFileRoute } from "@tanstack/react-router";
import { LessonTemplate, type LessonContent } from "@/components/LessonTemplate";

const content: LessonContent = {
  id: "sharing-giving",
  title: "Sharing & Giving",
  level: "Beginner",
  lessonNumber: "05",
  age: "Ages 6–8",
  duration: "3 min",
  intro: "Paisay sirf apne liye nahi — baantna aur dena bhi ek qisam ki daulat hai.",
  steps: [
    { caption: "Khushi", bubble: "Jab hum doosron ko dete hain, dil ki khushi alag hi hoti hai." },
    { caption: "Sadqa", bubble: "Hamare deen mein kamai ka kuch hissa zarurat mandon ke liye hota hai." },
    { caption: "Tareeqa", bubble: "Aik chota usool: 70% kharch, 20% bachat, 10% dena." },
    { caption: "Asar", bubble: "Aap ka chhota Rs 50 kisi bachay ki copy ban sakta hai." },
  ],
  flowTitle: "Daulat ka chakra",
  flowSubtitle: "Paisay aaye, baantay, badhe.",
  flow: [
    { title: "Kamai karein ya milein" },
    { title: "Apni zarurat poori karein" },
    { title: "Thora bachayein" },
    { title: "Kisi ko zarur dein" },
  ],
  quizTitle: "Quick check",
  quizSubtitle: "Dil aur dimagh dono se sochain.",
  quiz: [
    {
      q: "Dene se kya milta hai?",
      options: ["Bas paisay kam", "Sukoon aur khushi", "Kuch nahi", "Thakawat"],
      answer: 1,
      explain: "Dena dil ko sukoon aur khushi deta hai.",
    },
    {
      q: "Agar mahana Rs 1,000 milein, 10% kitna hua?",
      options: ["Rs 10", "Rs 100", "Rs 50", "Rs 200"],
      answer: 1,
      explain: "10% of 1,000 = Rs 100.",
    },
    {
      q: "Dene ka sab se acha tareeqa kya hai?",
      options: ["Sirf eid par", "Thora chhota lekin har mahine", "Sab aik dafa", "Sirf jab koi dekhe"],
      answer: 1,
      explain: "Continuous chhoti madad sab se asar wali hoti hai.",
    },
  ],
  missionTitle: "The Kindness Jar",
  missionBody: "Ek alag dabba banayein — 'Madad Jar' — aur har hafte usme thora paisa dalain.",
  missionSteps: [
    "Aik dabba 'Madad' ka likh kar tayyar karein.",
    "Har hafte Rs 20–50 dalain.",
    "Mahine baad walidain ke saath kisi haqdar ko dein.",
  ],
  next: { title: "The Purpose of Money", to: "/lessons/purpose-of-money" },
};

export const Route = createFileRoute("/lessons/sharing-giving")({
  head: () => ({
    meta: [
      { title: "Sharing & Giving — Nanha Investor" },
      { name: "description", content: "Bachon ke liye dene ki aadat — sadqa, madad aur khushi ka sabaq." },
    ],
  }),
  component: () => <LessonTemplate content={content} />,
});
