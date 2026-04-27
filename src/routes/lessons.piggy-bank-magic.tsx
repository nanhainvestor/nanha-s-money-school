import { createFileRoute } from "@tanstack/react-router";
import { LessonTemplate, type LessonContent } from "@/components/LessonTemplate";

const content: LessonContent = {
  id: "piggy-bank-magic",
  title: "The Magic of the Piggy Bank",
  level: "Beginner",
  lessonNumber: "03",
  age: "Ages 6–8",
  duration: "3 min",
  intro: "Bachat ka jaadu — chhote sikkay milkar bara khwab ban jaate hain.",
  steps: [
    { caption: "Khwab", bubble: "Nanha ko Rs 1,000 ki cricket ball chahiye, lekin paas sirf Rs 50 hain." },
    { caption: "Plan", bubble: "Roz Rs 10 piggy bank mein dalein. 100 din baad — Rs 1,000!" },
    { caption: "Sabar", bubble: "Bachat ka matlab abhi ruk jana, taake kal kuch bara mil sake." },
    { caption: "Khushi", bubble: "Jab apni bachat se kuch lo, to mazaa double ho jata hai." },
  ],
  flowTitle: "Bachat ka tareeqa",
  flowSubtitle: "Char chhote qadam — bara inaam.",
  flow: [
    { title: "Apna khwab chunein" },
    { title: "Roz thora paisa rakhein" },
    { title: "Piggy bank na kholein" },
    { title: "Apni bachat se khareedein" },
  ],
  quizTitle: "Quick check",
  quizSubtitle: "Bachat ke baray mein soch ke jawab dein.",
  quiz: [
    {
      q: "Bachat karne ka sab se acha tareeqa kya hai?",
      options: ["Roz thora rakhna", "Sab kuch foran kharchna", "Doosron se mangna", "Khona"],
      answer: 0,
      explain: "Chhoti chhoti bachat milkar bari raqam banti hai.",
    },
    {
      q: "Agar Rs 10 roz bachayein to 10 din mein kitne ho jayenge?",
      options: ["Rs 50", "Rs 100", "Rs 200", "Rs 1,000"],
      answer: 1,
      explain: "10 × 10 = Rs 100. Chhoti raqam bhi bari banti hai.",
    },
    {
      q: "Piggy bank ka asal faida kya hai?",
      options: ["Awaz karna", "Sabar sikhana", "Bhari hona", "Chamakna"],
      answer: 1,
      explain: "Piggy bank hamein sabar aur planning sikhata hai.",
    },
  ],
  missionTitle: "The Rs 100 Mission",
  missionBody: "Aglay 10 din mein Rs 100 bachao — chahay roz Rs 10 ya hafte mein Rs 70.",
  missionSteps: [
    "Aik chhoti dabba ya jar dhoondhein.",
    "Roz aik sikka dalain — chahay Rs 5 ho.",
    "10 din baad ginti karein aur khushi manayein.",
  ],
  next: { title: "Counting Coins", to: "/lessons/counting-coins" },
};

export const Route = createFileRoute("/lessons/piggy-bank-magic")({
  head: () => ({
    meta: [
      { title: "The Magic of the Piggy Bank — Nanha Investor" },
      { name: "description", content: "Bachon ke liye bachat ka asaan sabaq, Rs 10 roz se Rs 1,000 tak." },
    ],
  }),
  component: () => <LessonTemplate content={content} />,
});
