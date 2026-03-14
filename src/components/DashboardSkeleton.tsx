import { Skeleton } from "@/components/ui/skeleton";

export const BalanceCardSkeleton = () => (
  <div className="rounded-2xl bg-primary/80 p-6 shadow-lg animate-pulse">
    <Skeleton className="h-4 w-24 bg-primary-foreground/20" />
    <Skeleton className="mt-2 h-9 w-40 bg-primary-foreground/20" />
    <div className="mt-4 flex gap-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full bg-primary-foreground/20" />
        <div>
          <Skeleton className="h-3 w-12 bg-primary-foreground/20" />
          <Skeleton className="mt-1 h-4 w-20 bg-primary-foreground/20" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full bg-primary-foreground/20" />
        <div>
          <Skeleton className="h-3 w-14 bg-primary-foreground/20" />
          <Skeleton className="mt-1 h-4 w-20 bg-primary-foreground/20" />
        </div>
      </div>
    </div>
  </div>
);

export const ChartSkeleton = () => (
  <div className="animate-pulse">
    <Skeleton className="mb-3 h-5 w-40" />
    <div className="rounded-xl bg-card p-4 shadow-sm">
      <Skeleton className="mx-auto h-[180px] w-[180px] rounded-full" />
      <div className="mt-3 flex flex-wrap gap-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-4 w-20" />
        ))}
      </div>
    </div>
  </div>
);

export const TransactionsSkeleton = () => (
  <div className="animate-pulse">
    <Skeleton className="mb-3 h-5 w-40" />
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-sm">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="mt-1 h-3 w-16" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  </div>
);
