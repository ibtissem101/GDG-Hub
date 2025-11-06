'use client';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f0f0f0] via-white to-[#f0f0f0] dark:from-[#1e1e1e] dark:via-slate-900 dark:to-[#1e1e1e]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#ea4335]">Error</h1>
        <h2 className="mt-4 text-2xl font-semibold">
          Something went wrong in the dashboard
        </h2>
        <p className="mt-2 text-muted-foreground">
          {error.message || 'An unexpected error occurred'}
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={reset}
            className="rounded-lg bg-[#4285f4] px-6 py-3 text-white transition-colors hover:bg-[#1967d2]"
          >
            Try Again
          </button>
          <a
            href="/"
            className="rounded-lg border border-border bg-background px-6 py-3 transition-colors hover:bg-accent"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
