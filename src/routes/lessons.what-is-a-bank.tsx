import { createFileRoute } from "@tanstack/react-router";
import { LessonTemplate, type LessonContent } from "@/components/LessonTemplate";

const content: LessonContent = {
  id: "what-is-a-bank",
  title: "What Is a Bank?",
  level: "Intermediate",
  lessonNumber: "03",
  age: "Ages 9–11",
  duration: "4 min",
  intro: "Bank aik dosthana imarat hai jo aap ke paisay ki nigrani karti hai — aur thora barhati bhi hai.",
  steps: [
    { caption: "Imarat", bubble: "Bank ek mehfooz jagah hai jahan log apne paisay rakhte hain." },
    { caption: "Account", bubble: "Aap ka apna account hota hai — jaise apni alag dabba." },
    { caption: "Profit", bubble: "Bank kuch profit deta hai jab aap apne paisay rakhte hain." },
    { caption: "ATM", bubble: "Card ke zariye aap kabhi bhi apna paisa nikaal sakte hain." },
  ],
  flowTitle: "Bank Map",
  flowSubtitle: "Paisay rakhne ka asaan tareeqa.",
  flow: [
    { title: "Account kholein" },
    { title: "Paisay jama karein" },
    { title: "Profit kamayein" },
    { title: "Zarurat par nikaalein" },
  ],
  quizTitle: "Quick check",
  quizSubtitle: "Bank ke baray mein aap kya jaante hain?",
  quiz: [
    {
      q: "Bank ka asal kaam kya hai?",
      options: ["Khilaune bechna", "Paisay mehfooz rakhna", "Khana bechna", "Khel khilana"],
      answer: 1,
      explain: "Bank logon ke paisay mehfooz rakhta hai aur thora profit deta hai.",
    },
    {
      q: "ATM kis liye hota hai?",
      options: ["Khel ke liye", "Paisay nikalne ke liye", "Sirf dekhne ke liye", "Tasveer khinchne ke liye"],
      answer: 1,
      explain: "ATM se aap kabhi bhi apna paisa nikaal sakte hain.",
    },
    {
      q: "Pakistan ka aik mashhoor bank?",
      options: ["HBL", "PIA", "PTV", "WAPDA"],
      answer: 0,
      explain: "HBL Pakistan ka purana aur bara bank hai.",
    },
  ],
  missionTitle: "The Bank Visit",
  missionBody: "Walidain se kahein ke aap ko apna bank dikhayein — andar jhaank kar dekhein.",
  missionSteps: [
    "Walidain ke saath bank jayein.",
    "Counter aur ATM dekhein.",
    "Aik officer se 'savings account' ka pucho.",
  ],
  next: { title: "Earning Beyond Pocket Money", to: "/lessons/earning-beyond-pocket-money" },
};

export const Route = createFileRoute("/lessons/what-is-a-bank")({
  head: () => ({
    meta: [
      { title: "What Is a Bank? — Nanha Investor" },
      { name: "description", content: "Bachon ke liye bank ki asaan samajh — account, ATM aur savings." },
    ],
  }),
  component: () => <LessonTemplate content={content} />,
});
