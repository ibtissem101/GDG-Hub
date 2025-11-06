'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { UserRole } from '@/types/Enum';
import { Trophy, Medal, Award, Search } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  projectId: number;
  projectName: string;
  team: string;
  category: string;
  averageScore: number;
  evaluationCount: number;
}

const LeaderboardPage = () => {
  const userRole = UserRole.PARTICIPANT;
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch('/api/leaderboard');
        const data = await res.json();
        console.log('📊 Leaderboard data:', data);
        setLeaderboard(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  const categories = ['All', ...new Set(leaderboard.map(item => item.category))];
  
  const filteredLeaderboard = leaderboard.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getRankIcon = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex size-8 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
          <Trophy className="size-4" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="flex size-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
          <Medal className="size-4" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="flex size-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
          <Award className="size-4" />
        </div>
      );
    }
    return (
      <span className="flex size-8 items-center justify-center text-sm font-medium text-muted-foreground">
        {rank}
      </span>
    );
  };

  const getCategoryBadgeColor = (category: string) => {
    const colors: Record<string, string> = {
      'AI/ML': 'border-[#4285f4]/20 bg-[#c3ecf6] text-[#4285f4]',
      'Web': 'border-[#34a853]/20 bg-[#ccf6c5] text-[#34a853]',
      'Mobile': 'border-[#ea4335]/20 bg-[#f8d8d8] text-[#ea4335]',
      'Cloud': 'border-[#f9ab00]/20 bg-[#ffe7a5] text-[#f9ab00]',
    };
    return colors[category] || 'border-gray-300/20 bg-gray-100 text-gray-600';
  };

  if (loading) {
    return (
      <DashboardLayout userRole={userRole}>
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-4">🏆</div>
            <div>Loading leaderboard...</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole={userRole}>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Hackathon Leaderboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          GDG Fall Hackathon 2025 - Live Rankings
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'border border-border/40 bg-background text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            {category}
          </button>
        ))}
        
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search project or team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 rounded-xl border border-border/40 bg-background py-2 pl-9 pr-4 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-2xl border border-border/40 bg-card/50 shadow-sm backdrop-blur-sm">
        {filteredLeaderboard.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-lg font-semibold mb-2">No Rankings Yet</h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm || selectedCategory !== 'All' 
                ? 'No projects match your filters' 
                : 'Projects will appear here once they are evaluated'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border/40">
                <tr className="text-left text-sm text-muted-foreground">
                  <th className="px-6 py-4 font-medium">RANK</th>
                  <th className="px-6 py-4 font-medium">PROJECT</th>
                  <th className="px-6 py-4 font-medium">CATEGORY</th>
                  <th className="px-6 py-4 font-medium text-center">EVALUATIONS</th>
                  <th className="px-6 py-4 font-medium text-right">SCORE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredLeaderboard.map((entry) => (
                  <tr key={entry.projectId} className="group transition-colors hover:bg-accent/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(entry.rank)}
                        <span className="text-sm font-bold">{entry.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold">{entry.projectName}</p>
                        <p className="text-sm text-muted-foreground">{entry.team}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-lg border px-2.5 py-1 text-xs font-medium ${getCategoryBadgeColor(entry.category)}`}>
                        {entry.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-muted-foreground">{entry.evaluationCount}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-lg font-bold">{entry.averageScore.toFixed(1)}</span>
                      <span className="text-sm text-muted-foreground ml-1">/50</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LeaderboardPage;
