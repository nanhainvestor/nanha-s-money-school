import { redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { verifyRole, type AppRole } from "@/server/verify-role";
import { getDashboardPath } from "@/hooks/useAuth";

/**
 * Client-side guard helper used inside route `beforeLoad`. It calls the
 * server function `verifyRole`, forwarding the Supabase access token so the
 * server can authenticate the user and read their role under RLS.
 *
 * This runs BEFORE the route component renders, preventing any flash of
 * protected content and ensuring role checks are enforced server-side.
 */
export async function requireRole(allow: AppRole[]) {
  // SSR pass: skip — auth state is only available in the browser
  if (typeof window === "undefined") return;

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw redirect({ to: "/auth" });
  }

  let result: { userId: string; role: AppRole | null };
  try {
    result = await verifyRole({
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
  } catch (err) {
    console.error("requireRole server check failed", err);
    throw redirect({ to: "/auth" });
  }

  if (!result.role) {
    throw redirect({ to: "/auth" });
  }
  if (!allow.includes(result.role)) {
    throw redirect({ to: getDashboardPath(result.role), replace: true });
  }

  return { userId: result.userId, role: result.role };
}
