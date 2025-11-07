import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { UserRole } from "@/types/Enum";

export async function generateMetadata() {
  return {
    title: "Judge Panel - GDG Hackathon Hub",
    description: "Evaluate hackathon projects",
  };
}

export default function JudgePanelPage() {
  return (
    <DashboardLayout requiredRoles={[UserRole.JUDGE, UserRole.ADMIN]}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Evaluate Projects</h1>
        <p className="mt-2 text-muted-foreground">
          Review and score assigned hackathon submissions
        </p>
      </div>

      {/* Judge Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Total Assigned</p>
          <h3 className="mt-2 text-3xl font-bold">0</h3>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Evaluated</p>
          <h3 className="mt-2 text-3xl font-bold">0</h3>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Pending</p>
          <h3 className="mt-2 text-3xl font-bold">0</h3>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">Average Score</p>
          <h3 className="mt-2 text-3xl font-bold">-</h3>
        </div>
      </div>

      {/* Projects to Evaluate */}
      <div className="rounded-xl border border-border bg-card p-12">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex size-20 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
            <svg
              className="size-10 text-purple-600 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold">
            No projects assigned yet
          </h3>
          <p className="text-muted-foreground">
            The organizer will assign projects for you to evaluate
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
