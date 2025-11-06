'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { UserRole } from '@/types/Enum';

interface Stats {
  totalProjects: number;
  submittedProjects: number;
  draftProjects: number;
  reviewedProjects: number;
  totalParticipants: number;
  totalTeams: number;
  totalJudges: number;
  totalEvaluations: number;
  finalizedEvaluations: number;
}

const OrganizerPanelPage = () => {
  const userRole = UserRole.ORGANIZER;
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch organizer stats from MSW API
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/organizer/stats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch organizer stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (loading) {
    return (
      <DashboardLayout userRole={userRole}>
        <div className="flex h-screen items-center justify-center">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole={userRole}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Manage Hackathon</h1>
        <p className="mt-2 text-muted-foreground">
          Oversee submissions, assign judges, and manage the hackathon
        </p>
      </div>

      {/* Quick Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <div className="rounded-xl border border-border bg-[#c3ecf6] p-6 dark:from-blue-950 dark:to-blue-900">
          <p className="text-sm font-medium text-[#4285f4] dark:text-blue-400">Total Submissions</p>
          <h3 className="mt-2 text-3xl font-bold text-[#4285f4] dark:text-blue-100">{stats?.totalProjects || 0}</h3>
        </div>
        <div className="rounded-xl border border-border bg-[#ccf6c5] p-6 dark:from-green-950 dark:to-green-900">
          <p className="text-sm font-medium text-[#34a853] dark:text-green-400">Active Judges</p>
          <h3 className="mt-2 text-3xl font-bold text-[#34a853] dark:text-green-100">{stats?.totalJudges || 0}</h3>
        </div>
        <div className="rounded-xl border border-border bg-[#ffe7a5] p-6 dark:from-yellow-950 dark:to-yellow-900">
          <p className="text-sm font-medium text-[#f9ab00] dark:text-yellow-400">Evaluations</p>
          <h3 className="mt-2 text-3xl font-bold text-[#f9ab00] dark:text-yellow-100">{stats?.totalEvaluations || 0}</h3>
        </div>
        <div className="rounded-xl border border-border bg-[#f8d8d8] p-6 dark:from-red-950 dark:to-red-900">
          <p className="text-sm font-medium text-[#ea4335] dark:text-red-400">Participants</p>
          <h3 className="mt-2 text-3xl font-bold text-[#ea4335] dark:text-red-100">{stats?.totalParticipants || 0}</h3>
        </div>
      </div>

      {/* Management Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* All Submissions */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-bold">All Submissions</h2>
          <div className="text-center py-8 text-muted-foreground">
            <p>No submissions yet</p>
          </div>
        </div>

        {/* Judge Assignments */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-bold">Judge Assignments</h2>
          <div className="text-center py-8 text-muted-foreground">
            <p>No assignments yet</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-4">
        <button className="rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground hover:bg-primary/90">
          Assign Judges
        </button>
        <button className="rounded-lg border border-border px-6 py-2 font-medium hover:bg-accent">
          Export Data
        </button>
        <button className="rounded-lg border border-border px-6 py-2 font-medium hover:bg-accent">
          Send Notifications
        </button>
      </div>
    </DashboardLayout>
  );
};

export default OrganizerPanelPage;
