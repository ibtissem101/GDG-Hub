import { Bell, Calendar, Clock, Megaphone, Users } from 'lucide-react';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { UserRole } from '@/types/Enum';

export async function generateMetadata() {
  return {
    title: 'Announcements - GDG Hackathon Hub',
    description: 'View all hackathon announcements',
  };
}

const AnnouncementsPage = async () => {
  const userRole = UserRole.PARTICIPANT;

  return (
    <DashboardLayout userRole={userRole}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Stay updated with the latest hackathon news and updates.
        </p>
      </div>

      <div className="space-y-4">
        {/* Announcement 1 */}
        <div className="group rounded-2xl border border-border/40 bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md">
          <div className="flex gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f8d8d8] to-[#f8d8d8] dark:from-red-900/30 dark:to-red-800/30">
              <Megaphone className="size-6 text-[#ea4335] dark:text-red-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-lg border border-[#ea4335]/20 bg-[#f8d8d8] px-2 py-0.5 text-xs font-medium text-[#ea4335]">
                  Important
                </span>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              <h3 className="text-lg font-bold">Opening Ceremony Kick-off!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Join us for the official start of the hackathon. Check the schedule for details. The ceremony will begin at 9:00 AM sharp in the main auditorium. Don't miss it!
              </p>
            </div>
          </div>
        </div>

        {/* Announcement 2 */}
        <div className="group rounded-2xl border border-border/40 bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md">
          <div className="flex gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#c3ecf6] to-[#c3ecf6] dark:from-blue-900/30 dark:to-blue-800/30">
              <Clock className="size-6 text-[#4285f4] dark:text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-lg border border-[#4285f4]/20 bg-[#c3ecf6] px-2 py-0.5 text-xs font-medium text-[#4285f4]">
                  Workshop
                </span>
                <span className="text-xs text-muted-foreground">1 day ago</span>
              </div>
              <h3 className="text-lg font-bold">API Workshop at 2 PM</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Don't miss the workshop on leveraging our sponsor's new API. A great opportunity to level up your project. The workshop will be held in Room 203.
              </p>
            </div>
          </div>
        </div>

        {/* Announcement 3 */}
        <div className="group rounded-2xl border border-border/40 bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md">
          <div className="flex gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ffe7a5] to-[#ffe7a5] dark:from-yellow-900/30 dark:to-yellow-800/30">
              <Users className="size-6 text-[#f9ab00] dark:text-yellow-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-lg border border-[#f9ab00]/20 bg-[#ffe7a5] px-2 py-0.5 text-xs font-medium text-[#f9ab00]">
                  General
                </span>
                <span className="text-xs text-muted-foreground">3 days ago</span>
              </div>
              <h3 className="text-lg font-bold">Lunch is Served</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Pizza has arrived in the main hall. Come and grab a slice! We have vegetarian and vegan options available.
              </p>
            </div>
          </div>
        </div>

        {/* Announcement 4 */}
        <div className="group rounded-2xl border border-border/40 bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md">
          <div className="flex gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#c3ecf6] to-[#c3ecf6] dark:from-blue-900/30 dark:to-blue-800/30">
              <Calendar className="size-6 text-[#4285f4] dark:text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-lg border border-[#4285f4]/20 bg-[#c3ecf6] px-2 py-0.5 text-xs font-medium text-[#4285f4]">
                  Reminder
                </span>
                <span className="text-xs text-muted-foreground">5 days ago</span>
              </div>
              <h3 className="text-lg font-bold">Team Registration Deadline Extended</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Good news! We've extended the team registration deadline by 24 hours. Make sure to finalize your teams by tomorrow midnight.
              </p>
            </div>
          </div>
        </div>

        {/* Announcement 5 */}
        <div className="group rounded-2xl border border-border/40 bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md">
          <div className="flex gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ccf6c5] to-[#ccf6c5] dark:from-green-900/30 dark:to-green-800/30">
              <Bell className="size-6 text-[#34a853] dark:text-green-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-lg border border-[#34a853]/20 bg-[#ccf6c5] px-2 py-0.5 text-xs font-medium text-[#34a853]">
                  Info
                </span>
                <span className="text-xs text-muted-foreground">1 week ago</span>
              </div>
              <h3 className="text-lg font-bold">Welcome to GDG Hackathon Hub!</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We're excited to have you here! This is your central hub for all hackathon activities. Submit projects, track progress, and stay connected with the community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnnouncementsPage;
