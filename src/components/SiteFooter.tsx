import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-5">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-primary text-primary-foreground">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-extrabold">
              Nanha <span className="text-primary">Investor</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Bachon ke liye sukoon bhare, kahani par mabni paisay ke sabaq — aur un walidain ke liye jo unhein pyar karte hain.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Tamam qeematein Pakistani Rupees (Rs / PKR) mein hain.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-foreground">Sair Karein</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/lessons" className="hover:text-primary">Sabaq</Link></li>
            <li><Link to="/notebook" className="hover:text-primary">Nanha ki Note Book</Link></li>
            <li><Link to="/parents" className="hover:text-primary">Walidain Center</Link></li>
            <li><Link to="/about" className="hover:text-primary">Hamara Taaruf</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-foreground">Madad</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/faq" className="hover:text-primary">Sawal Jawab</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Rabta Karein</Link></li>
            <li><Link to="/safety" className="hover:text-primary">Bachon ki Hifazat</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-foreground">Qanoon</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary">Terms of Service</Link></li>
            <li><Link to="/cookies" className="hover:text-primary">Cookies Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/70 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Nanha Investor. Pakistan ke nanhe investors ke liye mohabbat se banaya gaya.
      </div>
    </footer>
  );
}
