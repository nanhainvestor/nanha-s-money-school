import { ReactNode, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth, type AppRole } from "@/hooks/useAuth";

export function RoleGuard({ allow, children }: { allow: AppRole[]; children: ReactNode }) {
  const { user, role, loading, roleLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || roleLoading) return;
    if (!user) {
      navigate({ to: "/auth" });
      return;
    }
    if (!role) return; // no role assigned yet
    if (!allow.includes(role)) {
      const dest = role === "admin" ? "/admin" : role === "parent" ? "/dashboard/parent" : "/dashboard/child";
      navigate({ to: dest });
    }
  }, [user, role, loading, roleLoading, allow, navigate]);

  if (loading || roleLoading || !user) {
    return <div className="mx-auto max-w-6xl px-4 py-16 text-center text-muted-foreground">Loading...</div>;
  }
  if (!role) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-muted-foreground">Aapke account ka koi role nahi mila. Admin se rabta karein.</p>
      </div>
    );
  }
  if (!allow.includes(role)) return null;
  return <>{children}</>;
}
