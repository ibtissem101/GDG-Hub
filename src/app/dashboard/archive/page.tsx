'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, ChevronDown, Calendar } from 'lucide-react';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { UserRole } from '@/types/Enum';

interface Project {
  id: number;
  userId: string;
  hackathonId: string;
  name: string;
  description: string;
  problemStatement?: string | null;
  solution?: string | null;
  codeRepositoryUrl: string;
  demoUrl?: string | null;
  videoUrl?: string | null;
  presentationUrl?: string | null;
  technologies: string[];
  category?: string | null;
  status: string;
  isPublic: boolean;
  submittedAt?: string | null;
  updatedAt: string;
  createdAt: string;
}

const ArchivePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState('all');
  const [showYearDropdown, setShowYearDropdown] = useState(true);
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(true);
  const userRole = UserRole.PARTICIPANT;

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/sign-in');
      return;
    }
    setUser(JSON.parse(userData));
    
    // Fetch reviewed/archived projects from MSW API
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects?status=reviewed');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch archived projects:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [router]);

  if (!user || loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  // Get unique categories from projects
  const allCategories = Array.from(new Set(projects.map(p => p.category).filter(Boolean))) as string[];
  
  // Toggle category filter
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  // Get gradient color based on category
  const getCategoryGradient = (category?: string | null) => {
    const gradients: Record<string, string> = {
      'AI/ML': 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)',
      'Web': 'linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)',
      'Cloud': 'linear-gradient(135deg, #67e8f9 0%, #22d3ee 100%)',
      'Mobile': 'linear-gradient(135deg, #164e63 0%, #0c4a6e 100%)',
    };
    return gradients[category || ''] || 'linear-gradient(135deg, #4285f4 0%, #1967d2 100%)';
  };

  // Apply filters
  const filteredProjects = projects.filter(project => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Category filter
    const matchesCategory = selectedCategories.length === 0 || 
      (project.category && selectedCategories.includes(project.category));
    
    // Year filter (extract year from createdAt)
    const projectYear = new Date(project.createdAt).getFullYear().toString();
    const matchesYear = selectedYear === 'all' || projectYear === selectedYear;
    
    return matchesSearch && matchesCategory && matchesYear;
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
                  {allCategories.length > 0 ? allCategories.map((category) => (
                    <label key={category} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="size-4 rounded border-border text-[#4285f4] focus:ring-[#4285f4]"
                      />
                      <span>{category}</span>
                    </label>
                  )) : (
                    <p className="text-xs text-muted-foreground">No categories</p>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 border-t border-border/40 pt-4">
              <button 
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedYear('all');
                  setSearchQuery('');
                }}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium transition-all hover:bg-accent"
              >
                Reset Filters
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
            {filteredProjects.map((project) => {
              const projectYear = new Date(project.createdAt).getFullYear().toString();
              
              return (
                <div
                  key={project.id}
                  className="group overflow-hidden rounded-2xl border border-border/40 bg-card/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-lg hover:border-[#4285f4]/40"
                >
                  {/* Project Image/Gradient */}
                  <div className="relative">
                    <div 
                      className="h-40 w-full"
                      style={{ background: getCategoryGradient(project.category) }}
                    />
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-lg bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      <Calendar className="size-3" />
                      {projectYear}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-5">
                    <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-[#4285f4]">
                      {project.name}
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="rounded-md bg-[#4285f4]/10 px-2.5 py-1 text-xs font-medium text-[#4285f4]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-border/40 pt-4">
                      <span className="text-xs text-muted-foreground">
                        {project.category || 'Archived Project'}
                      </span>
                      <Link
                        href={`/dashboard/archive/${project.id}`}
                        className="flex items-center gap-1 text-sm font-medium text-[#4285f4] hover:underline"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
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
