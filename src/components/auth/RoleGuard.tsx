'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/Enum';
import { hasAnyRole } from '@/utils/RoleHelpers';

type RoleGuardProps = {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
};

export function RoleGuard({
  children,
  allowedRoles,
  redirectTo = '/sign-in',
}: RoleGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Store the attempted URL for redirect after login
        localStorage.setItem('redirectAfterLogin', pathname);
        router.replace(redirectTo);
        return;
      }

      if (!hasAnyRole(user.role, allowedRoles)) {
        // If user is logged in but doesn't have the right role,
        // redirect to their appropriate dashboard
        switch (user.role) {
          case UserRole.PARTICIPANT:
            router.replace('/dashboard');
            break;
          case UserRole.JUDGE:
            router.replace('/dashboard/judge');
            break;
          case UserRole.ORGANIZER:
            router.replace('/dashboard/organizer');
            break;
          default:
            router.replace('/dashboard');
        }
      }
    }
  }, [user, loading, allowedRoles, router, pathname, redirectTo]);

  // Show nothing while checking authentication
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="size-8 animate-spin rounded-full border-4 border-primary border-r-transparent"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated or wrong role, render nothing (redirect will happen)
  if (!user || !hasAnyRole(user.role, allowedRoles)) {
    return null;
  }

  // If authenticated and has correct role, render children
  return <>{children}</>;
}
