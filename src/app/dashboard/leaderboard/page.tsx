import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { UserRole } from '@/types/Enum';
import { Trophy, Medal, Award, Search } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: 'Leaderboard - GDG Hackathon Hub',
    description: 'View project rankings',
  };
}

const LeaderboardPage = async () => {
  const userRole = UserRole.PARTICIPANT;

  return (
    <DashboardLayout userRole={userRole}>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Hackathon Leaderboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          GDG DevFest 2024 Hackathon
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex items-center gap-3">
        <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors">
          All
        </button>
        <button className="rounded-xl border border-border/40 bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          AI/ML
        </button>
        <button className="rounded-xl border border-border/40 bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          Web
        </button>
        <button className="rounded-xl border border-border/40 bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          Mobile
        </button>
        <button className="rounded-xl border border-border/40 bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          Best UI/UX
        </button>
        
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search project or team..."
              className="w-64 rounded-xl border border-border/40 bg-background py-2 pl-9 pr-4 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-2xl border border-border/40 bg-card/50 shadow-sm backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/40">
              <tr className="text-left text-sm text-muted-foreground">
                <th className="px-6 py-4 font-medium">RANK</th>
                <th className="px-6 py-4 font-medium">PROJECT</th>
                <th className="px-6 py-4 font-medium">CATEGORY</th>
                <th className="px-6 py-4 font-medium text-right">SCORE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {/* Rank 1 */}
              <tr className="group transition-colors hover:bg-accent/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                      <Trophy className="size-4" />
                    </div>
                    <span className="text-sm font-bold">1</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold">Project Alpha</p>
                    <p className="text-sm text-muted-foreground">Team Innovate</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-lg border border-[#4285f4]/20 bg-[#c3ecf6] px-2.5 py-1 text-xs font-medium text-[#4285f4]">
                    AI/ML
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-lg font-bold">98.5</span>
                </td>
              </tr>

              {/* Rank 2 */}
              <tr className="group transition-colors hover:bg-accent/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      <Medal className="size-4" />
                    </div>
                    <span className="text-sm font-bold">2</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold">Project Beta</p>
                    <p className="text-sm text-muted-foreground">Team Creative</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-lg border border-[#34a853]/20 bg-[#ccf6c5] px-2.5 py-1 text-xs font-medium text-[#34a853]">
                    Web
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-lg font-bold">95.2</span>
                </td>
              </tr>

              {/* Rank 3 */}
              <tr className="group transition-colors hover:bg-accent/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                      <Award className="size-4" />
                    </div>
                    <span className="text-sm font-bold">3</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold">Project Gamma</p>
                    <p className="text-sm text-muted-foreground">Team Builders</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-lg border border-[#ea4335]/20 bg-[#f8d8d8] px-2.5 py-1 text-xs font-medium text-[#ea4335]">
                    Mobile
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-lg font-bold">93.8</span>
                </td>
              </tr>

              {/* Rank 4 */}
              <tr className="group transition-colors hover:bg-accent/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center text-sm font-medium text-muted-foreground">
                      4
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold">Project Delta</p>
                    <p className="text-sm text-muted-foreground">Team Vision</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-lg border border-[#f9ab00]/20 bg-[#ffe7a5] px-2.5 py-1 text-xs font-medium text-[#f9ab00]">
                    Best UI/UX
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-lg font-bold">90.1</span>
                </td>
              </tr>

              {/* Rank 5 */}
              <tr className="group transition-colors hover:bg-accent/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center text-sm font-medium text-muted-foreground">
                      5
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold">Project Epsilon</p>
                    <p className="text-sm text-muted-foreground">Team Anonymous</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-lg border border-[#4285f4]/20 bg-[#c3ecf6] px-2.5 py-1 text-xs font-medium text-[#4285f4]">
                    AI/ML
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-lg font-bold">88.7</span>
                </td>
              </tr>

              {/* Rank 6 */}
              <tr className="group transition-colors hover:bg-accent/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center text-sm font-medium text-muted-foreground">
                      6
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold">Project Zeta</p>
                    <p className="text-sm text-muted-foreground">Team Delta</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-lg border border-[#34a853]/20 bg-[#ccf6c5] px-2.5 py-1 text-xs font-medium text-[#34a853]">
                    Web
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-lg font-bold">86.4</span>
                </td>
              </tr>

              {/* Rank 7 */}
              <tr className="group transition-colors hover:bg-accent/30">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center text-sm font-medium text-muted-foreground">
                      7
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold">Project Eta</p>
                    <p className="text-sm text-muted-foreground">Team Infinity</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-lg border border-[#ea4335]/20 bg-[#f8d8d8] px-2.5 py-1 text-xs font-medium text-[#ea4335]">
                    Mobile
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-lg font-bold">84.0</span>
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
          <span className="text-sm text-muted-foreground">...</span>
          <button className="flex size-8 items-center justify-center rounded-lg border border-border/40 text-sm text-muted-foreground transition-colors hover:bg-accent">
            8
          </button>
          <button className="flex size-8 items-center justify-center rounded-lg border border-border/40 text-sm text-muted-foreground transition-colors hover:bg-accent">
            9
          </button>
          <button className="flex size-8 items-center justify-center rounded-lg border border-border/40 text-sm text-muted-foreground transition-colors hover:bg-accent">
            10
          </button>
          <button className="flex size-8 items-center justify-center rounded-lg border border-border/40 text-sm text-muted-foreground transition-colors hover:bg-accent">
            ›
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Showing 1 to 7 of 68 results
      </p>
    </DashboardLayout>
  );
};

export default LeaderboardPage;
