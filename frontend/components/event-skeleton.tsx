"use client"

export default function EventSkeleton() {
  return (
    <div className="h-full animate-pulse rounded-lg border border-border/50 bg-card/40 p-4 backdrop-blur">
      <div className="mb-4 h-5 w-24 rounded bg-muted/50" />
      <div className="mb-3 flex items-center justify-between gap-4">
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 rounded-full bg-muted/50" />
          <div className="h-3 w-16 rounded bg-muted/50" />
        </div>
        <div className="h-4 w-8 rounded bg-muted/50" />
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 rounded-full bg-muted/50" />
          <div className="h-3 w-16 rounded bg-muted/50" />
        </div>
      </div>
      <div className="mb-4 h-4 w-40 rounded bg-muted/50" />
      <div className="grid grid-cols-3 gap-2">
        <div className="h-10 rounded bg-muted/50" />
        <div className="h-10 rounded bg-muted/50" />
        <div className="h-10 rounded bg-muted/50" />
      </div>
    </div>
  )
}
