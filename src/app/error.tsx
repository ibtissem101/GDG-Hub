'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f0f0f0] via-white to-[#f0f0f0]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#ea4335]">Oops!</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
          Something went wrong
        </h2>
        <p className="mt-2 text-gray-600">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={reset}
          className="mt-6 rounded-lg bg-[#4285f4] px-6 py-3 text-white transition-colors hover:bg-[#1967d2]"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
