import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Setup MSW server for Node.js (Next.js SSR)
export const server = setupServer(...handlers);
