import { SkeletonCard } from "@/components/generic/SkeletonCard";

export default function CarDetailLoading() {
  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/30 px-4 py-8 sm:px-6 sm:py-12">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        <div className="h-4 w-32 rounded bg-muted animate-pulse" />
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          <div className="aspect-video w-full rounded-3xl bg-muted animate-pulse" />
          <div className="bg-card border border-border/50 rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col gap-6">
            <div className="space-y-2">
              <div className="h-8 w-3/4 rounded bg-muted animate-pulse" />
              <div className="h-4 w-1/3 rounded bg-muted animate-pulse" />
            </div>
            <div className="h-10 w-1/2 rounded bg-muted animate-pulse" />
            <div className="grid grid-cols-2 gap-4 border-t border-border/50 pt-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <div className="h-3 w-16 rounded bg-muted animate-pulse" />
                  <div className="h-5 w-24 rounded bg-muted animate-pulse" />
                </div>
              ))}
            </div>
            <div className="h-12 w-48 rounded-full bg-muted animate-pulse" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
