'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, ChevronDown } from 'lucide-react';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { UserRole } from '@/types/Enum';

const ProjectsPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024');
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

  // Mock projects data
  const projects = [
    {
      id: 1,
      title: 'EcoScan AI',
      description: 'An app that identifies recyclable materials using computer vision.',
      image: 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)',
      tags: ['React', 'Firebase', 'Cloud Vision'],
      team: 'Team Green',
    },
    {
      id: 2,
      title: 'HealthTrack',
      description: 'A mobile app for tracking fitness goals and daily nutrition intake.',
      image: 'linear-gradient(135deg, #67e8f9 0%, #22d3ee 100%)',
      tags: ['Flutter', 'Supabase'],
      team: 'FitDev',
    },
    {
      id: 3,
      title: 'DevConnect',
      description: 'A social platform for developers to share projects and collaborate.',
      image: 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)',
      tags: ['Vue.js', 'Node.js', 'MongoDB'],
      team: 'CodeMasters',
    },
    {
      id: 4,
      title: 'CodeLearn',
      description: 'Interactive platform for learning to code with real-time feedback.',
      image: 'linear-gradient(135deg, #164e63 0%, #0c4a6e 100%)',
      tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
      team: 'EduTech',
    },
    {
      id: 5,
      title: 'MarketViz',
      description: 'Data visualization tool for stock market trends and analysis.',
      image: 'linear-gradient(135deg, #67e8f9 0%, #22d3ee 100%)',
      tags: ['React', 'D3.js', 'Python'],
      team: 'DataViz Pro',
    },
    {
      id: 6,
      title: 'GameHub',
      description: 'A web-based platform for playing and sharing indie games.',
      image: 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)',
      tags: ['Unity', 'WebGL', 'Node.js'],
      team: 'GameDevs',
    },
  ];

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
                  {['2024', '2023', '2022'].map((year) => (
                    <label key={year} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedYear === year}
                        onChange={() => setSelectedYear(year)}
                        className="size-4 rounded border-border text-[#4285f4] focus:ring-[#4285f4]"
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
              <button className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium transition-all hover:bg-accent">
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold">Explore Projects</h1>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects by title, team..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-border bg-background/60 py-2.5 pl-10 pr-4 text-sm transition-colors focus:border-[#4285f4] focus:outline-none focus:ring-2 focus:ring-[#4285f4]/20"
              />
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
                <div 
                  className="h-40 w-full"
                  style={{ background: project.image }}
                />

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
                    <span className="text-xs text-muted-foreground">{project.team}</span>
                    <Link
                      href={`/dashboard/projects/${project.id}`}
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

export default ProjectsPage;
