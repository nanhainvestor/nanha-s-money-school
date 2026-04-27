import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-6xl animate-in fade-in px-4 py-10 duration-300">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-9 w-24" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Card key={i} className="p-5">
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="mt-3 h-9 w-20" />
            <Skeleton className="mt-3 h-2 w-full" />
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <Skeleton className="h-6 w-40" />
          <div className="mt-4 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <Skeleton className="h-8 w-16" />
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <Skeleton className="h-6 w-32" />
          <div className="mt-4 space-y-2">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-9 w-full" />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
