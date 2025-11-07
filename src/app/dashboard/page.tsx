'use client';

import { Calendar, Clock, Folder, Megaphone, TrendingUp, Trophy, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { UserRole } from '@/types/Enum';

type Project = {
  id: number;
  name: string;
  status: string;
  category: string;
  submittedAt: string | null;
  technologies: string[];
};

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const userRole = UserRole.PARTICIPANT;

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/sign-in');
      return;
    }
    setUser(JSON.parse(userData));

    // Fetch user's projects and stats
    async function fetchData() {
      try {
        // Get user's projects (filter by userId in real app)
        const projectsRes = await fetch('/api/projects?userId=user-1');
        const projectsData = await projectsRes.json();
        setMyProjects(projectsData);

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, [router]);

  if (!user || loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  const myProjectCount = myProjects.length;
  const submittedCount = myProjects.filter(p => p.status === 'submitted' || p.status === 'reviewed').length;
  const draftCount = myProjects.filter(p => p.status === 'draft').length;

  return (
    <DashboardLayout requiredRoles={[UserRole.PARTICIPANT, UserRole.ADMIN]} userRole={userRole} userEmail={user.email} userName={user.name}>
      {/* Stats Cards */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        {/* My Projects Card */}
        <div className="group rounded-2xl border border-border/50 bg-gradient-to-br from-[#c3ecf6] to-[#e8f5fd] p-6 shadow-sm transition-all hover:shadow-lg dark:from-blue-950/50 dark:to-blue-900/30">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#4285f4] dark:text-blue-400">My Projects</p>
              <h3 className="mt-2 text-4xl font-bold text-[#1967d2] dark:text-blue-100">{myProjectCount}</h3>
              <p className="mt-2 text-xs text-[#5f6368] dark:text-slate-400">
                {submittedCount}
                {' '}
                submitted,
                {draftCount}
                {' '}
                draft
                {draftCount !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="rounded-xl bg-white/80 p-3 dark:bg-blue-900/40">
              <Folder className="size-6 text-[#4285f4]" />
            </div>
          </div>
        </div>

        {/* Team Members Card */}
        <div className="group rounded-2xl border border-border/50 bg-gradient-to-br from-[#ccf6c5] to-[#e6f9e3] p-6 shadow-sm transition-all hover:shadow-lg dark:from-green-950/50 dark:to-green-900/30">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#34a853] dark:text-green-400">Team Members</p>
              <h3 className="mt-2 text-4xl font-bold text-[#188038] dark:text-green-100">1</h3>
              <p className="mt-2 text-xs text-[#5f6368] dark:text-slate-400">Just you</p>
            </div>
            <div className="rounded-xl bg-white/80 p-3 dark:bg-green-900/40">
              <Users className="size-6 text-[#34a853]" />
            </div>
          </div>
        </div>

        {/* Your Rank Card */}
        <div className="group rounded-2xl border border-border/50 bg-gradient-to-br from-[#ffe7a5] to-[#fff4d6] p-6 shadow-sm transition-all hover:shadow-lg dark:from-yellow-950/50 dark:to-yellow-900/30">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-[#f9ab00] dark:text-yellow-400">Your Rank</p>
              <h3 className="mt-2 text-4xl font-bold text-[#e37400] dark:text-yellow-100">-</h3>
              <p className="mt-2 text-xs text-[#5f6368] dark:text-slate-400">Not ranked yet</p>
            </div>
            <div className="rounded-xl bg-white/80 p-3 dark:bg-yellow-900/40">
              <TrendingUp className="size-6 text-[#f9ab00]" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - 2/3 width */}
        <div className="space-y-6 lg:col-span-2">
          {/* My Projects Section */}
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">My Projects</h2>
                <p className="mt-1 text-sm text-muted-foreground">Your hackathon submissions</p>
              </div>
              <Link
                href="/dashboard/submit"
                className={buttonVariants({
                  size: 'sm',
                  className: 'gap-2 bg-[#4285f4] hover:bg-[#1967d2]',
                })}
              >
                + New Project
              </Link>
            </div>

            {/* Projects List or Empty State */}
            {myProjects.length === 0
              ? (
                  <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/50 bg-muted/20 py-16 text-center">
                    <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-[#c3ecf6] dark:bg-blue-900/30">
                      <Folder className="size-8 text-[#4285f4]" strokeWidth={1.5} />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold">No projects yet</h3>
                    <p className="mb-6 max-w-sm text-sm text-muted-foreground">
                      Ready to showcase your innovation? Submit your first project and join the competition!
                    </p>
                    <Link
                      href="/dashboard/submit"
                      className={buttonVariants({
                        className: 'bg-[#4285f4] hover:bg-[#1967d2]',
                      })}
                    >
                      Submit Your First Project
                    </Link>
                  </div>
                )
              : (
                  <div className="space-y-4">
                    {myProjects.map(project => (
                      <div
                        key={project.id}
                        className="group rounded-xl border border-border/50 bg-background p-5 transition-all hover:border-[#4285f4]/30 hover:shadow-md"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-semibold">{project.name}</h3>
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                  project.status === 'submitted'
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                    : project.status === 'reviewed'
                                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                }`}
                              >
                                {project.status}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                              Category:
                              {' '}
                              {project.category || 'Uncategorized'}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {project.technologies.slice(0, 3).map(tech => (
                                <span
                                  key={tech}
                                  className="rounded-md bg-muted px-2 py-1 text-xs"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 3 && (
                                <span className="rounded-md bg-muted px-2 py-1 text-xs">
                                  +
                                  {project.technologies.length - 3}
                                  {' '}
                                  more
                                </span>
                              )}
                            </div>
                          </div>
                          <Link
                            href={`/dashboard/projects/${project.id}`}
                            className={buttonVariants({ variant: 'outline', size: 'sm' })}
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
          </div>

          {/* Latest Announcements */}
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-bold">Latest Announcements</h2>
              <p className="mt-1 text-sm text-muted-foreground">Stay updated with event news</p>
            </div>

            <div className="space-y-4">
              {/* Announcement 1 */}
              <div className="group rounded-xl border border-border/50 bg-background p-4 transition-all hover:border-[#ea4335]/30 hover:shadow-md">
                <div className="flex gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#f8d8d8] dark:bg-red-900/30">
                    <Megaphone className="size-6 text-[#ea4335]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Opening Ceremony Kick-off!</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Join us for the official start of the hackathon. Check the schedule for details.
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              </div>

              {/* Announcement 2 */}
              <div className="group rounded-xl border border-border/50 bg-background p-4 transition-all hover:border-[#4285f4]/30 hover:shadow-md">
                <div className="flex gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#c3ecf6] dark:bg-blue-900/30">
                    <Clock className="size-6 text-[#4285f4]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">API Workshop at 2 PM</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Don't miss the workshop on leveraging our sponsor's new API.
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </div>

              {/* Announcement 3 */}
              <div className="group rounded-xl border border-border/50 bg-background p-4 transition-all hover:border-[#f9ab00]/30 hover:shadow-md">
                <div className="flex gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#ffe7a5] dark:bg-yellow-900/30">
                    <Users className="size-6 text-[#f9ab00]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Networking Session</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Meet fellow participants and potential team members in the lounge area.
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/dashboard/announcements"
                className="text-sm font-medium text-[#4285f4] hover:text-[#1967d2] hover:underline"
              >
                View all announcements ?
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold">Upcoming Deadlines</h2>
              <p className="mt-1 text-xs text-muted-foreground">Don't miss these dates</p>
            </div>

            <div className="space-y-4">
              {/* Deadline 1 */}
              <div className="rounded-lg border border-border/50 bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#c3ecf6] dark:bg-blue-900/30">
                    <Calendar className="size-5 text-[#4285f4]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">Team Formation</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Oct 28 - 11:59 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Deadline 2 */}
              <div className="rounded-lg border border-border/50 bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#ccf6c5] dark:bg-green-900/30">
                    <Folder className="size-5 text-[#34a853]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">Project Submission</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Oct 30 - 9:00 AM
                    </p>
                  </div>
                </div>
              </div>

              {/* Deadline 3 */}
              <div className="rounded-lg border border-border/50 bg-background p-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#ffe7a5] dark:bg-yellow-900/30">
                    <Trophy className="size-5 text-[#f9ab00]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">Finalist Announcement</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Oct 31 - 12:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-bold">Event Stats</h2>
              <p className="mt-1 text-xs text-muted-foreground">Live hackathon data</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Participants</span>
                <span className="text-2xl font-bold text-[#4285f4]">156</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Projects Submitted</span>
                <span className="text-2xl font-bold text-[#34a853]">42</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Teams Formed</span>
                <span className="text-2xl font-bold text-[#f9ab00]">38</span>
              </div>

              <Link
                href="/dashboard/leaderboard"
                className={buttonVariants({
                  variant: 'outline',
                  className: 'mt-4 w-full border-border/50 hover:bg-accent',
                  size: 'sm',
                })}
              >
                View Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
