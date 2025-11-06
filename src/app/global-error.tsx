'use client';

export default function GlobalError(props: {
  error: Error & { digest?: string };
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#ea4335]">Oops!</h1>
          <h2 className="mt-4 text-2xl font-semibold text-gray-900">
            Something went wrong
          </h2>
          <p className="mt-2 text-gray-600">
            {props.error.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-[#4285f4] px-6 py-3 text-white hover:bg-[#357ae8]"
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}

