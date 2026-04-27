import { ReactNode, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth, type AppRole } from "@/hooks/useAuth";
import { DashboardSkeleton } from "@/components/DashboardSkeleton";

export function RoleGuard({ allow, children }: { allow: AppRole[]; children: ReactNode }) {
  const { user, role, loading, roleLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading || roleLoading) return;
    if (!user) {
      navigate({ to: "/auth" });
      return;
    }
    if (!role) return;
    if (!allow.includes(role)) {
      const dest = role === "admin" ? "/admin" : role === "parent" ? "/dashboard/parent" : "/dashboard/child";
      navigate({ to: dest });
    }
  }, [user, role, loading, roleLoading, allow, navigate]);

  // Show skeleton while auth/role loading or while redirecting unauthenticated users
  if (loading || roleLoading || !user || !role) {
    return <DashboardSkeleton />;
  }

  if (!allow.includes(role)) {
    // Redirect in flight — keep skeleton visible to avoid flash
    return <DashboardSkeleton />;
  }

  return <div className="animate-in fade-in duration-300">{children}</div>;
}
