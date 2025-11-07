import { UserRole } from '@/types/Enum';

// Define route permissions
export const ROUTE_PERMISSIONS = {
  // Public routes (no auth required)
  public: [
    '/',
    '/sign-in',
    '/sign-up',
  ],

  // Protected routes by role
  protected: {
    // Participant routes
    [UserRole.PARTICIPANT]: [
      '/dashboard',
      '/dashboard/submit',
      '/dashboard/projects',
      '/dashboard/settings',
    ],

    // Judge routes
    [UserRole.JUDGE]: [
      '/dashboard/judge',
      '/dashboard/judge/evaluations',
      '/dashboard/judge/history',
      '/dashboard/settings',
    ],

    // Organizer routes
    [UserRole.ORGANIZER]: [
      '/dashboard/organizer',
      '/dashboard/organizer/submissions',
      '/dashboard/organizer/judges',
      '/dashboard/organizer/settings',
      '/dashboard/settings',
    ],

    // Admin routes (can access everything)
    [UserRole.ADMIN]: [
      '/dashboard',
      '/dashboard/*', // Wildcard for all dashboard routes
    ],
  },
} as const;

// Helper to check if a route is public
export function isPublicRoute(path: string): boolean {
  return ROUTE_PERMISSIONS.public.some(route =>
    path === route || path.startsWith(`${route}/`),
  );
}

// Helper to check if a user has access to a route
export function canAccessRoute(path: string, role?: UserRole | null): boolean {
  // Public routes are always accessible
  if (isPublicRoute(path)) {
    return true;
  }

  // If no role, can't access protected routes
  if (!role) {
    return false;
  }

  // Admin can access everything
  if (role === UserRole.ADMIN) {
    return true;
  }

  // Check if the route is in the user's allowed routes
  const allowedRoutes = ROUTE_PERMISSIONS.protected[role] || [];
  return allowedRoutes.some((route) => {
    if (route.endsWith('*')) {
      // Handle wildcard routes
      const baseRoute = route.slice(0, -1);
      return path.startsWith(baseRoute);
    }
    return path === route;
  });
}
