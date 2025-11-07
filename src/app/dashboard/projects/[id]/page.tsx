'use client';

import { Calendar, Edit, ExternalLink, FileText, Github, Plus, Tag, Trash2, Users, Video, X } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { UserRole } from '@/types/Enum';

type Project = {
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
};

type TeamMember = {
  id: number;
  projectId: number;
  userId?: string | null;
  name: string;
  email: string;
  role?: string | null;
  isLeader: boolean;
  createdAt: string;
  updatedAt: string;
};

const ProjectDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Team member form state
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberRole, setMemberRole] = useState('');
  const [isAddingMember, setIsAddingMember] = useState(false);

  const userRole = UserRole.PARTICIPANT;

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/sign-in');
      return;
    }
    setUser(JSON.parse(userData));

    // Fetch project details and team members
    const fetchData = async () => {
      try {
        // Fetch project
        const projectRes = await fetch(`/api/projects/${projectId}`);
        if (!projectRes.ok) {
          throw new Error('Project not found');
        }
        const projectData = await projectRes.json();
        setProject(projectData);

        // Fetch team members
        const teamRes = await fetch(`/api/projects/${projectId}/team`);
        const teamData = await teamRes.json();
        setTeamMembers(teamData);
      } catch (error) {
        console.error('Failed to fetch project:', error);
        router.push('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId, router]);

  const handleAddTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim() || !memberEmail.trim()) {
      return;
    }

    setIsAddingMember(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/team`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: memberName.trim(),
          email: memberEmail.trim(),
          role: memberRole.trim() || 'Team Member',
          isLeader: false,
        }),
      });

      if (res.ok) {
        const newMember = await res.json();
        setTeamMembers([...teamMembers, newMember]);
        setMemberName('');
        setMemberEmail('');
        setMemberRole('');
        setShowAddMember(false);
      }
    } catch (error) {
      console.error('Failed to add team member:', error);
    } finally {
      setIsAddingMember(false);
    }
  };

  const handleRemoveTeamMember = async (memberId: number) => {
    try {
      const res = await fetch(`/api/team-members/${memberId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setTeamMembers(teamMembers.filter(m => m.id !== memberId));
      }
    } catch (error) {
      console.error('Failed to remove team member:', error);
    }
  };

  const handleDeleteProject = async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      submitted: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300',
      reviewed: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300',
    };
    return colors[status] || colors.draft;
  };

  if (!user || loading) {
    return (
      <DashboardLayout userRole={userRole} userEmail={user?.email || ''} userName={user?.name || ''}>
        <div className="flex h-screen items-center justify-center">Loading...</div>
      </DashboardLayout>
    );
  }

  if (!project) {
    return (
      <DashboardLayout userRole={userRole} userEmail={user.email} userName={user.name}>
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium text-muted-foreground">Project not found</p>
            <Link href="/dashboard" className="mt-4 text-sm text-primary hover:underline">
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const isOwner = project.userId === 'user-1'; // Check if current user is owner

  return (
    <DashboardLayout userRole={userRole} userEmail={user.email} userName={user.name}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/dashboard" className="mb-2 text-sm text-muted-foreground hover:text-primary">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <div className="mt-2 flex items-center gap-3">
            <span className={`rounded-lg px-3 py-1 text-xs font-medium ${getStatusBadgeColor(project.status)}`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
            {project.category && (
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Tag className="size-4" />
                {project.category}
              </span>
            )}
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="size-4" />
              {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={() => router.push(`/dashboard/projects/${projectId}/edit`)}
              className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              <Edit className="size-4" />
              Edit
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
            >
              <Trash2 className="size-4" />
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Description */}
          <div className="rounded-2xl border border-border/40 bg-card/50 p-6 shadow-sm backdrop-blur-sm">
            <h2 className="mb-4 text-lg font-bold">Description</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{project.description}</p>
          </div>

          {/* Problem & Solution */}
          {(project.problemStatement || project.solution) && (
            <div className="rounded-2xl border border-border/40 bg-card/50 p-6 shadow-sm backdrop-blur-sm">
              <div className="space-y-4">
                {project.problemStatement && (
                  <div>
                    <h3 className="mb-2 text-sm font-bold">Problem Statement</h3>
                    <p className="text-sm text-muted-foreground">{project.problemStatement}</p>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <h3 className="mb-2 text-sm font-bold">Solution</h3>
                    <p className="text-sm text-muted-foreground">{project.solution}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Technologies */}
          {project.technologies.length > 0 && (
            <div className="rounded-2xl border border-border/40 bg-card/50 p-6 shadow-sm backdrop-blur-sm">
              <h2 className="mb-4 text-lg font-bold">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-lg bg-[#4285f4]/10 px-3 py-1.5 text-sm font-medium text-[#4285f4]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="rounded-2xl border border-border/40 bg-card/50 p-6 shadow-sm backdrop-blur-sm">
            <h2 className="mb-4 text-lg font-bold">Project Links</h2>
            <div className="space-y-3">
              <a
                href={project.codeRepositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent"
              >
                <Github className="size-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Code Repository</p>
                  <p className="text-xs text-muted-foreground">{project.codeRepositoryUrl}</p>
                </div>
                <ExternalLink className="size-4 text-muted-foreground" />
              </a>

              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent"
                >
                  <ExternalLink className="size-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Live Demo</p>
                    <p className="text-xs text-muted-foreground">{project.demoUrl}</p>
                  </div>
                  <ExternalLink className="size-4 text-muted-foreground" />
                </a>
              )}

              {project.videoUrl && (
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent"
                >
                  <Video className="size-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Video Demo</p>
                    <p className="text-xs text-muted-foreground">{project.videoUrl}</p>
                  </div>
                  <ExternalLink className="size-4 text-muted-foreground" />
                </a>
              )}

              {project.presentationUrl && (
                <a
                  href={project.presentationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent"
                >
                  <FileText className="size-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Presentation</p>
                    <p className="text-xs text-muted-foreground">{project.presentationUrl}</p>
                  </div>
                  <ExternalLink className="size-4 text-muted-foreground" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Team Management */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/40 bg-card/50 p-6 shadow-sm backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <Users className="size-5" />
                Team Members
              </h2>
              {isOwner && (
                <button
                  onClick={() => setShowAddMember(true)}
                  className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:bg-primary/90"
                >
                  <Plus className="size-3.5" />
                  Add
                </button>
              )}
            </div>

            {/* Add Member Form */}
            {showAddMember && (
              <form onSubmit={handleAddTeamMember} className="mb-4 rounded-lg border border-border bg-background p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Add Team Member</h3>
                  <button
                    type="button"
                    onClick={() => setShowAddMember(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={memberName}
                    onChange={e => setMemberName(e.target.value)}
                    placeholder="Member name *"
                    required
                    className="w-full rounded-lg border border-border/40 bg-background px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <input
                    type="email"
                    value={memberEmail}
                    onChange={e => setMemberEmail(e.target.value)}
                    placeholder="Member email *"
                    required
                    className="w-full rounded-lg border border-border/40 bg-background px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <input
                    type="text"
                    value={memberRole}
                    onChange={e => setMemberRole(e.target.value)}
                    placeholder="Role (optional)"
                    className="w-full rounded-lg border border-border/40 bg-background px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="submit"
                    disabled={isAddingMember}
                    className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50"
                  >
                    {isAddingMember ? 'Adding...' : 'Add Member'}
                  </button>
                </div>
              </form>
            )}

            {/* Team Members List */}
            <div className="space-y-2">
              {teamMembers.length === 0
                ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">No team members yet</p>
                  )
                : (
                    teamMembers.map(member => (
                      <div
                        key={member.id}
                        className="flex items-start justify-between rounded-lg border border-border p-3"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{member.name}</p>
                            {member.isLeader && (
                              <span className="rounded bg-[#f9ab00]/10 px-2 py-0.5 text-xs font-medium text-[#f9ab00]">
                                Leader
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                          {member.role && (
                            <p className="mt-1 text-xs text-muted-foreground">{member.role}</p>
                          )}
                        </div>
                        {isOwner && !member.isLeader && (
                          <button
                            onClick={() => handleRemoveTeamMember(member.id)}
                            className="text-red-500 hover:text-red-700 dark:text-red-400"
                          >
                            <X className="size-4" />
                          </button>
                        )}
                      </div>
                    ))
                  )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-bold">Delete Project?</h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Are you sure you want to delete "
              {project.name}
              "? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProject}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProjectDetailPage;
