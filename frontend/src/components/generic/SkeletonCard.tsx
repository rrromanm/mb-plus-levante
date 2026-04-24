export function SkeletonCard() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-md">
      <div className="aspect-video w-full bg-muted" />
      <div className="flex flex-col gap-3 p-5">
        <div className="h-5 w-2/3 rounded bg-muted" />
        <div className="flex gap-4">
          <div className="h-4 w-16 rounded bg-muted" />
          <div className="h-4 w-20 rounded bg-muted" />
        </div>
        <div className="mt-auto border-t border-border pt-3">
          <div className="h-7 w-24 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}