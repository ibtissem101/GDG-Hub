// Initialize MSW based on environment
export async function initMocks() {
  if (typeof window === 'undefined') {
    // Server-side (Next.js SSR)
    const { server } = await import('./server');
    server.listen({ onUnhandledRequest: 'bypass' });
  } else {
    // Client-side (Browser)
    const { worker } = await import('./browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    });
  }
}
