'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, ChevronDown, Calendar } from 'lucide-react';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { UserRole } from '@/types/Enum';

const ArchivePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('all');
  const [showYearDropdown, setShowYearDropdown] = useState(true);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(true);
  const [showTechDropdown, setShowTechDropdown] = useState(true);
  const userRole = UserRole.PARTICIPANT;

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/sign-in');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  if (!user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Mock archived projects data
  const projects = [
    {
      id: 1,
      title: 'SmartCity Dashboard',
      description: 'Real-time monitoring system for urban infrastructure and services.',
      image: 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)',
      tags: ['React', 'Node.js', 'MongoDB'],
      year: '2023',
      winner: true,
    },
    {
      id: 2,
      title: 'EduLearn Platform',
      description: 'Interactive online learning platform with AI-powered recommendations.',
      image: 'linear-gradient(135deg, #67e8f9 0%, #22d3ee 100%)',
      tags: ['Next.js', 'Python', 'TensorFlow'],
      year: '2023',
      winner: false,
    },
    {
      id: 3,
      title: 'GreenEnergy Tracker',
      description: 'Monitor and optimize renewable energy consumption in smart homes.',
      image: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)',
      tags: ['Vue.js', 'Firebase', 'IoT'],
      year: '2022',
      winner: true,
    },
    {
      id: 4,
      title: 'HealthBuddy',
      description: 'AI-powered health assistant for personalized wellness recommendations.',
      image: 'linear-gradient(135deg, #164e63 0%, #0c4a6e 100%)',
      tags: ['Flutter', 'Python', 'ML'],
      year: '2022',
      winner: false,
    },
    {
      id: 5,
      title: 'CryptoWallet Pro',
      description: 'Secure multi-chain cryptocurrency wallet with DeFi integration.',
      image: 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)',
      tags: ['React', 'Blockchain', 'Web3'],
      year: '2023',
      winner: false,
    },
    {
      id: 6,
      title: 'FoodShare Network',
      description: 'Connect food donors with local charities to reduce waste.',
      image: 'linear-gradient(135deg, #67e8f9 0%, #22d3ee 100%)',
      tags: ['Angular', 'Node.js', 'PostgreSQL'],
      year: '2022',
      winner: false,
    },
    {
      id: 7,
      title: 'CodeCollab IDE',
      description: 'Real-time collaborative coding environment with video chat.',
      image: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)',
      tags: ['React', 'WebRTC', 'Socket.io'],
      year: '2023',
      winner: false,
    },
    {
      id: 8,
      title: 'AIArtGenerator',
      description: 'Generate unique artwork using advanced neural networks.',
      image: 'linear-gradient(135deg, #164e63 0%, #0c4a6e 100%)',
      tags: ['Python', 'PyTorch', 'FastAPI'],
      year: '2022',
      winner: true,
    },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesYear = selectedYear === 'all' || project.year === selectedYear;
    
    return matchesSearch && matchesYear;
  });

  return (
    <DashboardLayout userRole={userRole} userEmail={user.email} userName={user.name}>
      <div className="flex h-full gap-6">
        {/* Sidebar Filters */}
        <div className="w-64 flex-shrink-0">
          <div className="sticky top-6 space-y-6 rounded-2xl border border-border/40 bg-card/30 p-6 shadow-sm backdrop-blur-sm">
            <h2 className="text-lg font-bold">Filters</h2>
            
            {/* Hackathon Year Filter */}
            <div>
              <button
                onClick={() => setShowYearDropdown(!showYearDropdown)}
                className="mb-3 flex w-full items-center justify-between text-sm font-semibold"
              >
                <span>Hackathon Year</span>
                <ChevronDown className={`size-4 transition-transform ${showYearDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showYearDropdown && (
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="year"
                      checked={selectedYear === 'all'}
                      onChange={() => setSelectedYear('all')}
                      className="size-4 border-border text-[#4285f4] focus:ring-[#4285f4]"
                    />
                    <span>All Years</span>
                  </label>
                  {['2024', '2023', '2022'].map((year) => (
                    <label key={year} className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="year"
                        checked={selectedYear === year}
                        onChange={() => setSelectedYear(year)}
                        className="size-4 border-border text-[#4285f4] focus:ring-[#4285f4]"
                      />
                      <span>{year}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Categories */}
            <div>
              <button
                onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                className="mb-3 flex w-full items-center justify-between text-sm font-semibold"
              >
                <span>Categories</span>
                <ChevronDown className={`size-4 transition-transform ${showCategoriesDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showCategoriesDropdown && (
                <div className="space-y-2">
                  {['AI/ML', 'Web Dev', 'Mobile', 'IoT', 'Blockchain'].map((category) => (
                    <label key={category} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        className="size-4 rounded border-border text-[#4285f4] focus:ring-[#4285f4]"
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Technologies */}
            <div>
              <button
                onClick={() => setShowTechDropdown(!showTechDropdown)}
                className="mb-3 flex w-full items-center justify-between text-sm font-semibold"
              >
                <span>Technologies</span>
                <ChevronDown className={`size-4 transition-transform ${showTechDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showTechDropdown && (
                <div className="space-y-2">
                  {['React', 'Vue.js', 'Flutter', 'Node.js', 'Python'].map((tech) => (
                    <label key={tech} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        className="size-4 rounded border-border text-[#4285f4] focus:ring-[#4285f4]"
                      />
                      <span>{tech}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 border-t border-border/40 pt-4">
              <button className="w-full rounded-lg bg-[#4285f4] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#1967d2]">
                Apply Filters
              </button>
              <button 
                onClick={() => setSelectedYear('all')}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium transition-all hover:bg-accent"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Project Archive</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Browse {filteredProjects.length} past hackathon projects
                </p>
              </div>
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search archived projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background/60 py-2.5 pl-10 pr-4 text-sm transition-colors focus:border-[#4285f4] focus:outline-none focus:ring-2 focus:ring-[#4285f4]/20"
                />
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group overflow-hidden rounded-2xl border border-border/40 bg-card/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-lg hover:border-[#4285f4]/40"
              >
                {/* Project Image/Gradient */}
                <div className="relative">
                  <div 
                    className="h-40 w-full"
                    style={{ background: project.image }}
                  />
                  {project.winner && (
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-[#f9ab00] px-2.5 py-1 text-xs font-bold text-white shadow-lg">
                      🏆 Winner
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-lg bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    <Calendar className="size-3" />
                    {project.year}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-5">
                  <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-[#4285f4]">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="rounded-md bg-[#4285f4]/10 px-2.5 py-1 text-xs font-medium text-[#4285f4]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-border/40 pt-4">
                    <span className="text-xs text-muted-foreground">Archived Project</span>
                    <Link
                      href={`/dashboard/archive/${project.id}`}
                      className="flex items-center gap-1 text-sm font-medium text-[#4285f4] hover:underline"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="flex h-64 items-center justify-center rounded-2xl border border-border/40 bg-card/30">
              <div className="text-center">
                <p className="text-lg font-medium text-muted-foreground">No projects found</p>
                <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ArchivePage;
