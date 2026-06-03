import { SkeletonCard } from "@/components/generic/SkeletonCard";

export default function CochesLoading() {
  return (
    <div className="mx-auto max-w-screen-2xl px-6 lg:px-12 pt-14 pb-2">
      <div className="h-4 w-48 rounded bg-muted animate-pulse mb-2" />
      <div className="h-12 w-72 rounded bg-muted animate-pulse mb-10" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
