'use client';

import { useState, useEffect } from 'react';
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
import { LogOut, Bell } from 'lucide-react';

import { DashboardSidebar } from './DashboardSidebar';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { UserRole } from '@/types/Enum';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole?: UserRole;
  userEmail?: string;
  userName?: string;
}

export function DashboardLayout({ 
  children, 
  userRole = UserRole.PARTICIPANT,
  userEmail = 'demo@gdg.dev',
  userName = 'User',
}: DashboardLayoutProps) {


  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  // Set your hackathon end date/time here:
  const hackathonEnd = new Date('2025-11-10T18:00:00');
  const msLeft = useCountdownTimer(hackathonEnd);
  const hours = Math.floor(msLeft / 1000 / 60 / 60);
  const minutes = Math.floor((msLeft / 1000 / 60) % 60);
  const seconds = Math.floor((msLeft / 1000) % 60);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-[#f0f0f0] via-white to-[#f0f0f0] dark:from-[#1e1e1e] dark:via-slate-900 dark:to-[#1e1e1e]">
      {/* Sidebar */}
      <DashboardSidebar 
        userRole={userRole} 
        isCollapsed={isSidebarCollapsed}
        onToggleAction={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="px-8 py-4 ">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Welcome back, {userName}! 
                <span className="ml-2 inline-block animate-pulse">👋</span>
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">{userEmail}</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Hackathon Countdown Timer */}
              <div className="rounded-xl border border-border/40 bg-background/80 px-4 py-2 font-mono text-sm text-muted-foreground select-none">
                {msLeft > 0
                  ? `Time left: ${hours.toString().padStart(2, '0')}:${minutes
                      .toString()
                      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
                  : 'Hackathon ended!'}
              </div>
              {/* Notifications */}
              <button className="relative rounded-xl border border-border/40 bg-background/80 p-2.5 transition-all hover:bg-accent hover:shadow-sm">
                <Bell className="size-[18px] text-muted-foreground" />
                <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-gradient-to-r from-[#4285f4] to-[#ea4335]"></span>
              </button>


              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                className={buttonVariants({ 
                  variant: 'outline', 
                  size: 'sm',
                  className: 'gap-2 rounded-xl border-border/40 bg-background/80 transition-all hover:bg-accent hover:shadow-sm'
                })}
              >
                <LogOut className="size-4" />
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="mx-auto max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
