import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { RoleGuard } from "@/components/RoleGuard";
import { useAuth, type AppRole } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogOut, Users, Shield, BookOpen } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  component: () => (
    <RoleGuard allow={["admin"]}>
      <AdminDashboard />
    </RoleGuard>
  ),
});

type Row = { user_id: string; display_name: string | null; email: string; role: AppRole };

function AdminDashboard() {
  const { user, signOut } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data: profiles } = await supabase.from("profiles").select("user_id, display_name");
    const { data: roles } = await supabase.from("user_roles").select("user_id, role");
    const roleMap = new Map<string, AppRole>();
    roles?.forEach((r: any) => roleMap.set(r.user_id, r.role));
    const merged: Row[] = (profiles ?? []).map((p: any) => ({
      user_id: p.user_id,
      display_name: p.display_name,
      email: p.display_name ? `${p.display_name}` : p.user_id.slice(0, 8),
      role: roleMap.get(p.user_id) ?? "child",
    }));
    setRows(merged);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const changeRole = async (userId: string, newRole: AppRole) => {
    const { error: delErr } = await supabase.from("user_roles").delete().eq("user_id", userId);
    if (delErr) return toast.error(delErr.message);
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: newRole });
    if (error) toast.error(error.message);
    else { toast.success("Role updated"); load(); }
  };

  const counts = {
    admin: rows.filter((r) => r.role === "admin").length,
    parent: rows.filter((r) => r.role === "parent").length,
    child: rows.filter((r) => r.role === "child").length,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Admin Dashboard</p>
          <h1 className="font-display text-3xl font-extrabold">Control Panel</h1>
          <p className="mt-1 text-muted-foreground">Logged in as {user?.email}</p>
        </div>
        <Button variant="outline" size="sm" onClick={signOut}><LogOut className="mr-2 h-4 w-4" />Logout</Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <Card className="p-5"><div className="flex items-center gap-3"><Users className="h-5 w-5 text-primary" /><span className="text-sm text-muted-foreground">Total Users</span></div><p className="mt-2 text-3xl font-bold">{rows.length}</p></Card>
        <Card className="p-5"><div className="flex items-center gap-3"><Shield className="h-5 w-5 text-rose-500" /><span className="text-sm text-muted-foreground">Admins</span></div><p className="mt-2 text-3xl font-bold">{counts.admin}</p></Card>
        <Card className="p-5"><div className="flex items-center gap-3"><Users className="h-5 w-5 text-blue-500" /><span className="text-sm text-muted-foreground">Parents</span></div><p className="mt-2 text-3xl font-bold">{counts.parent}</p></Card>
        <Card className="p-5"><div className="flex items-center gap-3"><BookOpen className="h-5 w-5 text-green-500" /><span className="text-sm text-muted-foreground">Children</span></div><p className="mt-2 text-3xl font-bold">{counts.child}</p></Card>
      </div>

      <Card className="mt-6 p-6">
        <h2 className="font-display text-xl font-bold">User Management</h2>
        <p className="mt-1 text-sm text-muted-foreground">Yahan se users ke roles tabdeel karein.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase text-muted-foreground">
                <th className="py-2">Name</th>
                <th className="py-2">User ID</th>
                <th className="py-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={3} className="py-6 text-center text-muted-foreground">Loading...</td></tr>
              ) : rows.map((r) => (
                <tr key={r.user_id} className="border-b border-border/60">
                  <td className="py-3 font-semibold">{r.display_name ?? "—"}</td>
                  <td className="py-3 font-mono text-xs text-muted-foreground">{r.user_id.slice(0, 8)}…</td>
                  <td className="py-3">
                    <Select value={r.role} onValueChange={(v) => changeRole(r.user_id, v as AppRole)}>
                      <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
