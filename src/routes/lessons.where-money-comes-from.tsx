import { createFileRoute } from "@tanstack/react-router";
import { LessonTemplate, type LessonContent } from "@/components/LessonTemplate";

const content: LessonContent = {
  id: "where-money-comes-from",
  title: "Where Money Comes From",
  level: "Beginner",
  lessonNumber: "02",
  age: "Ages 6–8",
  duration: "3 min",
  intro: "Ammi abu kaam kyun karte hain? Aaj Nanha hamein bataye ga ke paisay asal mein kahan se aate hain.",
  steps: [
    { caption: "Sawal", bubble: "Nanha ne pucha — Ammi, paisay tree par lagte hain kya?" },
    { caption: "Jawab", bubble: "Nahi! Paisay kaam karne se milte hain. Log apna waqt aur hunar dete hain." },
    { caption: "Naukri", bubble: "Doctor, teacher, driver, dukandar — sab apna kaam karke paisay kamate hain." },
    { caption: "Business", bubble: "Kuch log apna business karte hain — chai dhaba, online shop, ya app banana." },
    { caption: "Aadat", bubble: "Paisay ki qadar tabhi hoti hai jab hum samjhein ke yeh mehnat se aate hain." },
  ],
  flowTitle: "Money Map",
  flowSubtitle: "Paisay ki yatra — kaam se jeb tak.",
  flow: [
    { title: "Mehnat ya hunar dein" },
    { title: "Kisi ki madad karein" },
    { title: "Badle mein paisay milein" },
    { title: "Soch samajh kar kharch karein" },
  ],
  quizTitle: "Quick check",
  quizSubtitle: "Apna jawab chunein — galat ho to bhi seekhna hota hai.",
  quiz: [
    {
      q: "Paisay sab se zyada kis cheez se aate hain?",
      options: ["Ped se", "Mehnat aur kaam se", "Asmaan se", "Khilaune se"],
      answer: 1,
      explain: "Paisay log apni mehnat aur waqt ke badle kamate hain.",
    },
    {
      q: "In mein se kaun naukri kar ke paisay kamata hai?",
      options: ["Doctor", "Patang", "Cycle", "Bag"],
      answer: 0,
      explain: "Doctor mareez ka ilaaj karte hain aur uske badle salary milti hai.",
    },
    {
      q: "Apna business karne wala kaun hai?",
      options: ["Student", "Chai dhaba walla", "Khilauna", "Tree"],
      answer: 1,
      explain: "Chai dhaba walla apni dukan aur mehnat se kamai karta hai.",
    },
  ],
  missionTitle: "The 'Kaam Detective' Mission",
  missionBody: "Kal aap 3 logon se puchhein ke wo apna kaam kaise karte hain aur unhein kya pasand hai.",
  missionSteps: [
    "3 baray logon ka kaam pucho.",
    "Har ek se aik cheez seekho jo wo karte hain.",
    "Bonus: jo kaam aap ko sab se mazedaar lage, uska tasveer banayein.",
  ],
  next: { title: "The Magic of the Piggy Bank", to: "/lessons/piggy-bank-magic" },
};

export const Route = createFileRoute("/lessons/where-money-comes-from")({
  head: () => ({
    meta: [
      { title: "Where Money Comes From — Nanha Investor" },
      { name: "description", content: "Bachon ke liye paisay ki kahani — kaam, naukri aur business ka taaruf." },
    ],
  }),
  component: () => <LessonTemplate content={content} />,
});
