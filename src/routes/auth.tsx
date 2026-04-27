import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const { signIn, signUp, user, role, loading, roleLoading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (loading || roleLoading) return;
    if (user && role) {
      const dest = role === "admin" ? "/admin" : role === "parent" ? "/dashboard/parent" : "/dashboard/child";
      navigate({ to: dest });
    }
  }, [user, role, loading, roleLoading, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = mode === "login"
      ? await signIn(email, password)
      : await signUp(email, password, displayName || email.split("@")[0]);
    if (error) {
      setBusy(false);
      toast.error(error);
    } else {
      toast.success(mode === "login" ? "Welcome back!" : "Account banaya gaya!");
      // keep busy=true; redirect effect will navigate once role loads
    }
  };

  const fillDemo = (kind: "admin" | "parent" | "child") => {
    setEmail(`${kind}@demo.com`);
    setPassword("Demo@1234");
    setMode("login");
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-10">
      <Card className="p-6">
        <h1 className="font-display text-2xl font-extrabold">
          {mode === "login" ? "Login" : "Sign Up"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "login" ? "Apne dashboard tak rasayi hasil karein." : "Naya account banayein."}
        </p>

        <form onSubmit={onSubmit} className="mt-5 space-y-4">
          {mode === "signup" && (
            <div>
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" variant="hero" className="w-full" disabled={busy}>
            {busy ? "Please wait..." : mode === "login" ? "Login" : "Create Account"}
          </Button>
        </form>

        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-4 block w-full text-center text-sm text-primary hover:underline"
        >
          {mode === "login" ? "Naya account chahiye? Sign up karein" : "Pehle se account hai? Login karein"}
        </button>

        <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Demo accounts</p>
          <p className="mt-1 text-xs text-muted-foreground">Password sab ke liye: <code className="font-mono">Demo@1234</code></p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => fillDemo("admin")}>Admin</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => fillDemo("parent")}>Parent</Button>
            <Button type="button" variant="outline" size="sm" onClick={() => fillDemo("child")}>Child</Button>
          </div>
        </div>

        <Link to="/" className="mt-4 block text-center text-xs text-muted-foreground hover:text-foreground">← Home par wapas jayein</Link>
      </Card>
    </div>
  );
}
