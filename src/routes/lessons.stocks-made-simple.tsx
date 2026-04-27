import { createFileRoute } from "@tanstack/react-router";
import { LessonTemplate, type LessonContent } from "@/components/LessonTemplate";

const content: LessonContent = {
  id: "stocks-made-simple",
  title: "Stocks Made Simple",
  level: "Advanced",
  lessonNumber: "02",
  age: "Ages 12–14",
  duration: "5 min",
  intro: "Aik bohat bari company ka chhota sa hissa rakhna — yeh hai stock. Aaiye samjhein.",
  steps: [
    { caption: "Pizza", bubble: "Sochain aik bara pizza — har slice aik 'share' hai. Stock bhi bilkul aise hai." },
    { caption: "Company", bubble: "Aap kisi company ka share khareed kar uske chhote malik ban jaate hain." },
    { caption: "Faida", bubble: "Company badhe to aap ke share ki qeemat bhi badhti hai." },
    { caption: "Khatra", bubble: "Stocks neechay bhi ja sakte hain — isi liye sabar aur soch zaruri hai." },
  ],
  flowTitle: "Stocks Map",
  flowSubtitle: "Share kharidne ka silsila.",
  flow: [
    { title: "Acchi company chunein" },
    { title: "Uska share khareedein" },
    { title: "Lambay arsay tak rakhein" },
    { title: "Faida ya seekh hasil karein" },
  ],
  quizTitle: "Quick check",
  quizSubtitle: "Stocks ki bunyaad samjhein.",
  quiz: [
    {
      q: "Stock ka matlab?",
      options: ["Khilauna", "Company ka chhota hissa", "Bank account", "Property"],
      answer: 1,
      explain: "Stock = company ka chhota hissa.",
    },
    {
      q: "Pakistan ka stock exchange?",
      options: ["PSX", "PCB", "NHA", "PIA"],
      answer: 0,
      explain: "PSX = Pakistan Stock Exchange.",
    },
    {
      q: "Stocks mein sab se zaruri cheez?",
      options: ["Jaldi", "Sabar aur research", "Doosron ki baat", "Luck"],
      answer: 1,
      explain: "Lambay arsay ka sabar aur research kamai laata hai.",
    },
  ],
  missionTitle: "The Company Watch",
  missionBody: "3 mashhoor Pakistani companies (jaise Lucky Cement, Engro, MCB) chunein aur aik mahine unki khabrein parhain.",
  missionSteps: [
    "3 companies chunein.",
    "Roz aik khabar parhain.",
    "Hafte ke aakhir likhein — kya seekha?",
  ],
  next: { title: "Compound Interest", to: "/lessons/compound-interest" },
};

export const Route = createFileRoute("/lessons/stocks-made-simple")({
  head: () => ({
    meta: [
      { title: "Stocks Made Simple — Nanha Investor" },
      { name: "description", content: "Bachon ke liye stock market ki asaan samajh — PSX aur Pakistani companies." },
    ],
  }),
  component: () => <LessonTemplate content={content} />,
});
