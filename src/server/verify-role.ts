import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AppRole = "admin" | "parent" | "child";

/**
 * Server-side role verification. Reads the role from the database using the
 * caller's authenticated Supabase client (RLS enforced). Cannot be spoofed
 * from the client because it relies on the verified JWT from the middleware.
 */
export const verifyRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("verifyRole error:", error.message);
      return { userId, role: null as AppRole | null };
    }
    return { userId, role: (data?.role as AppRole | null) ?? null };
  });
