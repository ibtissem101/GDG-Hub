// Initialize MSW based on environment
export async function initMocks() {
  if (typeof window === 'undefined') {
    // Server-side (Next.js SSR)
    const { server } = await import('./server');
    server.listen({
      onUnhandledRequest: 'bypass',
    });
    console.log('🎭 [MSW] Server-side mocking enabled');
  } else {
    // Client-side (Browser)
    const { worker } = await import('./browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
      quiet: false, // Show console logs
    });
    console.log('🎭 [MSW] Browser mocking enabled');
    console.log('🎭 [MSW] Available endpoints:');
    console.log('  - GET /api/projects');
    console.log('  - GET /api/leaderboard');
    console.log('  - GET /api/organizer/stats');
    console.log('  - GET /api/evaluations');
    console.log('  - GET /api/judges');
    console.log('  - And more... (see API_ROUTES.md)');
  }
}
