import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { UserRole } from '@/types/Enum';

export async function generateMetadata() {
  return {
    title: 'Project Archive - GDG Hackathon Hub',
    description: 'Browse all hackathon projects',
  };
}

const ArchivePage = async () => {
  const userRole = UserRole.PARTICIPANT;

  return (
    <DashboardLayout userRole={userRole}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">📦 Project Archive</h1>
        <p className="mt-2 text-muted-foreground">
          Explore all hackathon submissions
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex gap-4">
        <input
          type="search"
          placeholder="Search projects..."
          className="flex-1 rounded-lg border border-border bg-background px-4 py-2"
        />
        <select className="rounded-lg border border-border bg-background px-4 py-2">
          <option>All Categories</option>
          <option>AI/ML</option>
          <option>Web Development</option>
          <option>Mobile Development</option>
          <option>IoT/Hardware</option>
          <option>Blockchain</option>
          <option>Game Development</option>
        </select>
        <select className="rounded-lg border border-border bg-background px-4 py-2">
          <option>Latest First</option>
          <option>Highest Rated</option>
          <option>Most Viewed</option>
        </select>
      </div>

      {/* Projects Grid */}
      <div className="rounded-xl border border-border bg-card p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-muted">
            <svg
              className="size-10 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold">No projects in archive yet</h3>
          <p className="text-muted-foreground">
            Projects will appear here as they are submitted
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ArchivePage;
