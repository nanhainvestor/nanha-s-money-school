import { createFileRoute, Link } from "@tanstack/react-router";
import { Cookie, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookies Policy — Nanha Investor" },
      { name: "description", content: "Hum kaun se cookies istemal karte hain aur kyun — Roman Urdu mein wazeh." },
      { property: "og:title", content: "Cookies Policy — Nanha Investor" },
      { property: "og:description", content: "Cookies istemal ka mukammal tareeqa." },
    ],
  }),
  component: CookiesPage,
});

const rows = [
  { name: "session", purpose: "Aap ka login aur progress yaad rakhna", duration: "Browser band hone tak", type: "Zaruri" },
  { name: "preferences", purpose: "Theme aur zaban yaad rakhna", duration: "1 saal", type: "Zaruri" },
  { name: "analytics", purpose: "Anonymously yeh dekhna kaun se sabaq pasand kiye gaye", duration: "30 din", type: "Performance" },
];

function CookiesPage() {
  return (
    <div>
      <section className="bg-hero">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            <Cookie className="h-3.5 w-3.5" /> Cookies Policy
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold sm:text-5xl">Cookies kya hain?</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Cookies chhoti files hain jo browser mein save hoti hain taake site ko behtar tareeqe se istemal kar saken. Yeh aap ka koi raaz nahi pakarteen.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold">Hum kaun se cookies istemal karte hain</h2>
        <div className="mt-6 overflow-x-auto rounded-3xl border border-border bg-card shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {["Naam", "Maqsad", "Muddat", "Qisam"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-bold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name} className="border-t border-border">
                  <td className="px-4 py-3 font-bold text-primary">{r.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.purpose}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.duration}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-bold text-primary">{r.type}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <h3 className="mt-3 font-bold">Aap ka control</h3>
            <p className="mt-2 text-sm text-muted-foreground">Browser settings se aap kabhi bhi cookies block ya delete kar sakte hain. Lekin kuch features kaam karna chhor sakte hain.</p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <Cookie className="h-6 w-6 text-primary" />
            <h3 className="mt-3 font-bold">Lessons ke andar</h3>
            <p className="mt-2 text-sm text-muted-foreground">Sabaq ke andar koi advertising cookie, social plugin ya tracker nahi hota — sirf khaalis seekhna.</p>
          </div>
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Mazid maloomat ke liye <Link to="/privacy" className="text-primary underline">Privacy Policy</Link> dekhein.
        </p>
      </section>
    </div>
  );
}
