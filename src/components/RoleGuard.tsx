import { ReactNode, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { getDashboardPath, useAuth, type AppRole } from "@/hooks/useAuth";
import { DashboardSkeleton } from "@/components/DashboardSkeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
      navigate({ to: getDashboardPath(role), replace: true });
    }
  }, [user, role, loading, roleLoading, allow, navigate]);

  // Show skeleton while auth/role loading or while redirecting unauthenticated users
  if (loading || roleLoading || !user) {
    return <DashboardSkeleton />;
  }

  if (!role) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <Card className="p-6 text-center">
          <h1 className="font-display text-2xl font-extrabold">Dashboard role missing</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Is account ke liye role abhi assign nahi hua. Demo account dobara select karke login karein.
          </p>
          <Button asChild variant="hero" className="mt-5">
            <Link to="/auth">Back to Login</Link>
          </Button>
        </Card>
      </div>
    );
  }

  if (!allow.includes(role)) {
    // Redirect in flight — keep skeleton visible to avoid flash
    return <DashboardSkeleton />;
  }

  return <div className="animate-in fade-in duration-300">{children}</div>;
}
