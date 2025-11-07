'use client';

import { useEffect, useState } from 'react';

export default function TestMSWPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Test 1: Fetch projects
        const projectsRes = await fetch('/api/projects');
        const projectsData = await projectsRes.json();
        setProjects(projectsData);

        // Test 2: Fetch leaderboard
        const leaderboardRes = await fetch('/api/leaderboard');
        const leaderboardData = await leaderboardRes.json();
        setLeaderboard(leaderboardData);

        // Test 3: Fetch organizer stats
        const statsRes = await fetch('/api/organizer/stats');
        const statsData = await statsRes.json();
        setStats(statsData);
        setLoading(false);
      } catch (err) {
        console.error('❌ MSW test failed:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    }

    // Wait a bit for MSW to initialize
    const timer = setTimeout(fetchData, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-4xl">🧪</div>
          <div className="text-lg">Testing MSW API...</div>
          <div className="mt-2 text-sm text-muted-foreground">Check the console</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-2xl rounded-lg border border-red-500 bg-red-50 p-6 text-center">
          <div className="mb-4 text-4xl">❌</div>
          <div className="text-lg font-bold text-red-600">MSW Test Failed</div>
          <div className="mt-2 text-sm text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f0f0] via-white to-[#f0f0f0] p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <div className="mb-4 text-6xl">🎉</div>
          <h1 className="mb-2 text-4xl font-bold">MSW is Working!</h1>
          <p className="text-muted-foreground">Mock Service Worker is successfully intercepting API calls</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Projects Card */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-[#4285F4]">📁 Projects</h2>
            <p className="mb-2 text-3xl font-bold">{projects.length}</p>
            <p className="text-sm text-muted-foreground">Mock projects loaded</p>
            <div className="mt-4 space-y-2">
              {projects.slice(0, 3).map(p => (
                <div key={p.id} className="border-l-2 border-[#4285F4] pl-2 text-xs">
                  {p.name}
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard Card */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-[#EA4335]">🏆 Leaderboard</h2>
            <p className="mb-2 text-3xl font-bold">{leaderboard.length}</p>
            <p className="text-sm text-muted-foreground">Ranked projects</p>
            <div className="mt-4 space-y-2">
              {leaderboard.slice(0, 3).map(item => (
                <div key={item.projectId} className="border-l-2 border-[#EA4335] pl-2 text-xs">
                  #
                  {item.rank}
                  {' '}
                  {item.projectName}
                  {' '}
                  -
                  {' '}
                  {item.averageScore}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-[#34A853]">📊 Stats</h2>
            {stats && (
              <>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Projects:</span>
                    <span className="font-bold">{stats.totalProjects}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Submitted:</span>
                    <span className="font-bold">{stats.submittedProjects}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Judges:</span>
                    <span className="font-bold">{stats.totalJudges}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Evaluations:</span>
                    <span className="font-bold">{stats.totalEvaluations}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">📝 Test Results</h2>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>
                GET /api/projects -
                {projects.length}
                {' '}
                projects
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>
                GET /api/leaderboard -
                {leaderboard.length}
                {' '}
                entries
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>GET /api/organizer/stats - Stats loaded</span>
            </div>
          </div>
          <div className="mt-4 rounded bg-gray-100 p-4 text-xs">
            <p className="mb-2 font-bold">💡 Next Steps:</p>
            <ul className="list-inside list-disc space-y-1 text-muted-foreground">
              <li>Open browser DevTools Console to see MSW logs</li>
              <li>Check Network tab - requests are intercepted by MSW</li>
              <li>See API_ROUTES.md for all available endpoints</li>
              <li>Use these endpoints in your dashboard components</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
