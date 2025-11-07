'use client';

import { Bell, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

import { RoleGuard } from '@/components/auth/RoleGuard';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { useAuth } from '@/hooks/useAuth';
import { RoleInfo, UserRole } from '@/types/Enum';

import { DashboardSidebar } from './DashboardSidebar';

function useCountdownTimer(endTime: Date) {
  const [remaining, setRemaining] = useState(() => endTime.getTime() - Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(endTime.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [endTime]);
  return remaining > 0 ? remaining : 0;
}

type DashboardLayoutProps = {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  userRole?: UserRole;
  userEmail?: string;
  userName?: string;
};

export function DashboardLayout({
  children,
  requiredRoles = [UserRole.PARTICIPANT, UserRole.JUDGE, UserRole.ORGANIZER, UserRole.ADMIN],
}: DashboardLayoutProps) {
  const { user, logout } = useAuth();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  // Set your hackathon end date/time here:
  const hackathonEnd = new Date('2025-11-10T18:00:00');
  const msLeft = useCountdownTimer(hackathonEnd);
  const hours = Math.floor(msLeft / 1000 / 60 / 60);
  const minutes = Math.floor((msLeft / 1000 / 60) % 60);
  const seconds = Math.floor((msLeft / 1000) % 60);

  const handleSignOut = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <RoleGuard allowedRoles={requiredRoles}>
      <div className="flex h-screen overflow-hidden bg-gradient-to-br from-[#f0f0f0] via-white to-[#f0f0f0] dark:from-[#1e1e1e] dark:via-slate-900 dark:to-[#1e1e1e]">
        {/* Sidebar */}
        <DashboardSidebar
          userRole={user?.role}
          isCollapsed={isSidebarCollapsed}
          onToggleAction={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top Header */
          }
          <header className="px-8 py-4 ">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  Welcome back,
                  {' '}
                  {user?.name || 'User'}
                  !
                  <span className="ml-2 inline-block animate-pulse">👋</span>
                </h1>
                <p className="mt-0.5 text-sm text-muted-foreground">{user?.email || 'user@gdg.dev'}</p>
              </div>
              <div className="flex items-center gap-3">
                {/* Hackathon Countdown Timer */}
                <div className="select-none rounded-xl border border-border/40 bg-background/80 px-4 py-2 font-mono text-sm text-muted-foreground">
                  {msLeft > 0
                    ? `Time left: ${hours.toString().padStart(2, '0')}:${minutes
                      .toString()
                      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
                    : 'Hackathon ended!'}
                </div>
                {/* Notifications */}
                <button type="button" className="relative rounded-xl border border-border/40 bg-background/80 p-2.5 transition-all hover:bg-accent hover:shadow-sm">
                  <Bell className="size-[18px] text-muted-foreground" />
                  <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-gradient-to-r from-[#4285f4] to-[#ea4335]"></span>
                </button>

                {/* Sign Out */}
                <button
                  type="button"
                  onClick={handleSignOut}
                  className={buttonVariants({
                    variant: 'outline',
                    size: 'sm',
                    className: 'gap-2 rounded-xl border-border/40 bg-background/80 transition-all hover:bg-accent hover:shadow-sm',
                  })}
                >
                  <LogOut className="size-4" />
                  Sign Out
                </button>
              </div>
            </div>
            {/* Role-specific banner (CTA shown only for Participant) */}
            {user?.role && (
              <div className="mt-4 rounded-xl border border-border/40 bg-background/80 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">
                      {RoleInfo[user.role]?.emoji}
                    </span>
                    <span className="text-sm font-semibold">
                      {RoleInfo[user.role]?.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {RoleInfo[user.role]?.description}
                    </span>
                  </div>
                  {user.role === UserRole.PARTICIPANT && (
                    <div className="flex items-center gap-2">
                      <a href="/dashboard/submit" className={buttonVariants({ size: 'sm', className: 'bg-[#4285f4] hover:bg-[#1967d2]' })}>
                        Submit project
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto px-8 py-6">
            <div className="mx-auto max-w-[1600px]">
              {children}
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
