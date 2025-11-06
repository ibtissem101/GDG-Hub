'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Upload, 
  FolderOpen, 
  Award, 
  Users, 
  Settings,
  Trophy,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { cn } from '@/utils/Helpers';
import { UserRole } from '@/types/Enum';

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: UserRole[];
}

const sidebarLinks: SidebarLink[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: Home,
  },
  {
    href: '/dashboard/submit',
    label: 'Submit Project',
    icon: Upload,
    roles: [UserRole.PARTICIPANT, UserRole.ORGANIZER, UserRole.ADMIN],
  },
  {
    href: '/dashboard/projects',
    label: 'My Projects',
    icon: FolderOpen,
    roles: [UserRole.PARTICIPANT, UserRole.ORGANIZER, UserRole.ADMIN],
  },
  {
    href: '/dashboard/judge',
    label: 'Evaluate Projects',
    icon: Award,
    roles: [UserRole.JUDGE, UserRole.ORGANIZER, UserRole.ADMIN],
  },
  {
    href: '/dashboard/leaderboard',
    label: 'Leaderboard',
    icon: Trophy,
  },
  {
    href: '/dashboard/organizer',
    label: 'Manage Hackathon',
    icon: Users,
    roles: [UserRole.ORGANIZER, UserRole.ADMIN],
  },
  {
    href: '/dashboard/archive',
    label: 'Project Archive',
    icon: FileText,
  },
  {
    href: '/dashboard/settings',
    label: 'Settings',
    icon: Settings,
  },
];

interface DashboardSidebarProps {
  userRole?: UserRole;
  isCollapsed: boolean;
  onToggleAction: () => void;
}

export function DashboardSidebar({ userRole, isCollapsed, onToggleAction }: DashboardSidebarProps) {
  const pathname = usePathname();

  const filteredLinks = sidebarLinks.filter(link => {
    if (!link.roles) return true;
    if (!userRole) return false;
    return link.roles.includes(userRole);
  });

  return (
    <aside className={cn(
      "border-r border-border/40 bg-background transition-all duration-300 ease-in-out",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="flex h-full flex-col">
        {/* Logo + Toggle */}
        <div className="border-b border-border/40 px-4 py-4">
          <div className="flex items-center gap-3">
            {/* Collapse Toggle on the left of the logo */}
            <button
              onClick={onToggleAction}
              className={cn(
                "flex items-center justify-center rounded-lg border border-border/40 bg-background p-2 transition-all hover:bg-accent hover:shadow-sm",
                isCollapsed ? "w-10" : ""
              )}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="size-4 text-muted-foreground" />
              ) : (
                <ChevronLeft className="size-4 text-muted-foreground" />
              )}
            </button>

            <Link href="/" className={cn("group flex items-center gap-3 transition-transform hover:scale-105", isCollapsed ? "justify-center w-full" : "") }>
              {!isCollapsed ? (
                <>
                  <Image
                    src="/assets/images/GDG LOGO.png"
                    alt="GDG Logo"
                    width={45}
                    height={28}
                  />
                  <div>
                    <h2 className="text-base font-bold leading-tight tracking-tight">
                      <span className="text-[#4285F4]">G</span>
                      <span className="text-[#EA4335]">D</span>
                      <span className="text-[#FBBC04]">G</span>
                      <span className="text-foreground"> Hackathon</span>
                    </h2>
                    <p className="text-xs font-semibold text-[#34A853]">
                      Hub
                    </p>
                  </div>
                </>
              ) : (
                <Image
                  src="/assets/images/GDG LOGO.png"
                  alt="GDG Logo"
                  width={40}
                  height={25}
                  className="mx-auto"
                />
              )}
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5 px-4 py-10">
          {filteredLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'group flex items-center rounded-xl px-4 py-3 text-[13px] font-medium transition-all duration-200',
                  isCollapsed ? 'justify-center' : 'gap-3',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground hover:shadow-sm'
                )}
                title={isCollapsed ? link.label : undefined}
              >
                <Icon className={cn(
                  "size-[18px] transition-transform duration-200",
                  isActive ? "scale-110" : "group-hover:scale-110"
                )} />
                {!isCollapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="border-t border-border/40 px-6 py-5">
            <p className="text-[11px] text-muted-foreground/70">
              © 2025 GDG Hackathon Hub
            </p>
            <p className="mt-0.5 text-[10px] text-muted-foreground/50">
              Powered by Google Developer Groups
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
