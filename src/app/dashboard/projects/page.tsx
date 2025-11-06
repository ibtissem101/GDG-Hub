import Link from 'next/link';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { UserRole } from '@/types/Enum';

export async function generateMetadata() {
  return {
    title: 'My Projects - GDG Hackathon Hub',
    description: 'View and manage your submitted projects',
  };
}

const MyProjectsPage = async () => {
  const userRole = UserRole.PARTICIPANT;

  return (
    <DashboardLayout userRole={userRole}>
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Submissions</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage and track your hackathon projects
          </p>
        </div>
        <Link
          href="/dashboard/submit"
          className={buttonVariants({ 
            className: 'gap-2 rounded-xl'
          })}
        >
          + Submit New Project
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex items-center gap-2">
        <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors">
          All
        </button>
        <button className="rounded-xl border border-border/40 bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          Draft
        </button>
        <button className="rounded-xl border border-border/40 bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          Submitted
        </button>
        <button className="rounded-xl border border-border/40 bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          Under Review
        </button>
        <button className="rounded-xl border border-border/40 bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          Winner
        </button>
      </div>

      {/* Projects Table */}
      <div className="rounded-2xl border border-border/40 bg-card/50 shadow-sm backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/40">
              <tr className="text-left text-sm text-muted-foreground">
                <th className="px-6 py-4 font-medium">Project Title</th>
                <th className="px-6 py-4 font-medium">Hackathon Event</th>
                <th className="px-6 py-4 font-medium">Submission Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {/* Project 1 */}
              <tr className="group transition-colors hover:bg-accent/30">
                <td className="px-6 py-4">
                  <p className="font-semibold">AI-Powered Code Reviewer</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-muted-foreground">GDG DevFest 2024</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-muted-foreground">Oct 15, 2024</p>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-lg border border-[#34a853]/20 bg-[#ccf6c5] px-2.5 py-1 text-xs font-medium text-[#34a853]">
                    Submitted
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="text-sm font-medium text-primary hover:underline">
                      View
                    </button>
                    <span className="text-muted-foreground">|</span>
                    <button className="text-sm font-medium text-primary hover:underline">
                      Edit
                    </button>
                  </div>
                </td>
              </tr>

              {/* Project 2 */}
              <tr className="group transition-colors hover:bg-accent/30">
                <td className="px-6 py-4">
                  <p className="font-semibold">Eco-Friendly Route Planner</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-muted-foreground">Sustainability Hack 2024</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-muted-foreground">Sep 18, 2024</p>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-lg border border-[#f9ab00]/20 bg-[#ffe7a5] px-2.5 py-1 text-xs font-medium text-[#f9ab00]">
                    Winner
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="text-sm font-medium text-primary hover:underline">
                      View
                    </button>
                    <span className="text-muted-foreground">|</span>
                    <button className="text-sm font-medium text-primary hover:underline">
                      Edit
                    </button>
                  </div>
                </td>
              </tr>

              {/* Project 3 */}
              <tr className="group transition-colors hover:bg-accent/30">
                <td className="px-6 py-4">
                  <p className="font-semibold">Real-time Collab Whiteboard</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-muted-foreground">Future of Work Challenge</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-muted-foreground">Aug 04, 2024</p>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-lg border border-[#4285f4]/20 bg-[#c3ecf6] px-2.5 py-1 text-xs font-medium text-[#4285f4]">
                    Under Review
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="text-sm font-medium text-primary hover:underline">
                      View
                    </button>
                    <span className="text-muted-foreground">|</span>
                    <button className="text-sm font-medium text-primary hover:underline">
                      Edit
                    </button>
                  </div>
                </td>
              </tr>

              {/* Project 4 */}
              <tr className="group transition-colors hover:bg-accent/30">
                <td className="px-6 py-4">
                  <p className="font-semibold">My Next Big Idea</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-muted-foreground">Internal Hack Day</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-muted-foreground">Jul 20, 2024</p>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300">
                    Draft
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="text-sm font-medium text-primary hover:underline">
                      View
                    </button>
                    <span className="text-muted-foreground">|</span>
                    <button className="text-sm font-medium text-primary hover:underline">
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 border-t border-border/40 px-6 py-4">
          <button className="flex size-8 items-center justify-center rounded-lg border border-border/40 text-sm text-muted-foreground transition-colors hover:bg-accent">
            ‹
          </button>
          <button className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground">
            1
          </button>
          <button className="flex size-8 items-center justify-center rounded-lg border border-border/40 text-sm text-muted-foreground transition-colors hover:bg-accent">
            2
          </button>
          <button className="flex size-8 items-center justify-center rounded-lg border border-border/40 text-sm text-muted-foreground transition-colors hover:bg-accent">
            3
          </button>
          <button className="flex size-8 items-center justify-center rounded-lg border border-border/40 text-sm text-muted-foreground transition-colors hover:bg-accent">
            ›
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyProjectsPage;
