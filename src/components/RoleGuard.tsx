import { ReactNode, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth, type AppRole } from "@/hooks/useAuth";

export function RoleGuard({ allow, children }: { allow: AppRole[]; children: ReactNode }) {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/auth" });
      return;
    }
    if (role && !allow.includes(role)) {
      const dest = role === "admin" ? "/admin" : role === "parent" ? "/dashboard/parent" : "/dashboard/child";
      navigate({ to: dest });
    }
  }, [user, role, loading, allow, navigate]);

  if (loading || !user || !role) {
    return <div className="mx-auto max-w-6xl px-4 py-16 text-center text-muted-foreground">Loading...</div>;
  }
  if (!allow.includes(role)) return null;
  return <>{children}</>;
}
