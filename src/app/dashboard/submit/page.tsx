'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { UserRole } from '@/types/Enum';

const SubmitProjectPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const userRole = UserRole.PARTICIPANT;

  // Form state
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [solution, setSolution] = useState('');
  const [category, setCategory] = useState('');
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  const [repoLink, setRepoLink] = useState('');
  const [demoLink, setDemoLink] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [presentationLink, setPresentationLink] = useState('');
  const [teamMembers, setTeamMembers] = useState<Array<{ name: string; email: string; role: string }>>([]);
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberRole, setMemberRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const addTechnology = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech));
  };

  const addTeamMember = () => {
    if (memberName.trim() && memberEmail.trim()) {
      setTeamMembers([...teamMembers, {
        name: memberName.trim(),
        email: memberEmail.trim(),
        role: memberRole.trim() || 'Team Member',
      }]);
      setMemberName('');
      setMemberEmail('');
      setMemberRole('');
    }
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create project via MSW API
      const projectData = {
        userId: 'user-1',
        name: projectTitle,
        description: projectDescription,
        problemStatement: problemStatement || null,
        solution: solution || null,
        codeRepositoryUrl: repoLink,
        demoUrl: demoLink || null,
        videoUrl: videoLink || null,
        presentationUrl: presentationLink || null,
        technologies,
        category: category || null,
        status: isDraft ? 'draft' : 'submitted',
        isPublic: true,
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        throw new Error('Failed to create project');
      }

      const newProject = await response.json();
      console.log('Project created:', newProject);

      // Add team members if any
      if (teamMembers.length > 0) {
        for (const member of teamMembers) {
          await fetch(`/api/projects/${newProject.id}/team`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: member.name,
              email: member.email,
              role: member.role,
              isLeader: false,
            }),
          });
        }
      }

      setSubmitStatus('success');

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error submitting project:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout requiredRoles={[UserRole.PARTICIPANT, UserRole.ADMIN]} userRole={userRole} userEmail={user.email} userName={user.name}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Submit Your Project</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill out the details below to enter your project into the hackathon.
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
          ✅ Project submitted successfully! Redirecting to dashboard...
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
          ❌ Failed to submit project. Please try again.
        </div>
      )}

      <div className="mx-auto max-w-3xl">
        <form className="space-y-8" onSubmit={e => handleSubmit(e, false)}>
          {/* Project Information Section */}
          <div className="rounded-2xl border border-border/40 bg-card/50 p-6 shadow-sm backdrop-blur-sm">
            <h2 className="mb-6 text-base font-bold">Project Information</h2>

            <div className="space-y-5">
              {/* Project Title */}
              <div>
                <label htmlFor="projectTitle" className="mb-2 block text-sm font-medium">
                  Project Title*
                </label>
                <input
                  type="text"
                  id="projectTitle"
                  value={projectTitle}
                  onChange={e => setProjectTitle(e.target.value)}
                  required
                  className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter your project title"
                />
              </div>

              {/* Project Description */}
              <div>
                <label htmlFor="projectDescription" className="mb-2 block text-sm font-medium">
                  Project Description*
                </label>
                <textarea
                  id="projectDescription"
                  rows={5}
                  value={projectDescription}
                  onChange={e => setProjectDescription(e.target.value)}
                  required
                  className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Describe your project, the problem it solves, and the technology used."
                />
              </div>

              {/* Problem Statement */}
              <div>
                <label htmlFor="problemStatement" className="mb-2 block text-sm font-medium">
                  Problem Statement
                </label>
                <textarea
                  id="problemStatement"
                  rows={3}
                  value={problemStatement}
                  onChange={e => setProblemStatement(e.target.value)}
                  className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="What problem does your project solve?"
                />
              </div>

              {/* Solution */}
              <div>
                <label htmlFor="solution" className="mb-2 block text-sm font-medium">
                  Solution
                </label>
                <textarea
                  id="solution"
                  rows={3}
                  value={solution}
                  onChange={e => setSolution(e.target.value)}
                  className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="How does your project solve the problem?"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="mb-2 block text-sm font-medium">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select a category</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Web">Web Development</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Cloud">Cloud</option>
                  <option value="IoT">IoT</option>
                  <option value="Blockchain">Blockchain</option>
                </select>
              </div>

              {/* Technologies */}
              <div>
                <label htmlFor="technologies" className="mb-2 block text-sm font-medium">
                  Technologies Used
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    id="technologies"
                    value={techInput}
                    onChange={e => setTechInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                    className="flex-1 rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Add technology and press Enter"
                  />
                  <button
                    type="button"
                    onClick={addTechnology}
                    className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                  >
                    Add
                  </button>
                </div>
                {technologies.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
                      >
                        {tech}
                        <button
                          type="button"
                          onClick={() => removeTechnology(tech)}
                          className="hover:text-blue-900 dark:hover:text-blue-100"
                        >
                          <X className="size-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="rounded-2xl border border-border/40 bg-card/50 p-6 shadow-sm backdrop-blur-sm">
            <h2 className="mb-6 text-base font-bold">Team Members</h2>

            <div className="space-y-5">
              <div className="grid gap-3 md:grid-cols-3">
                <input
                  type="text"
                  value={memberName}
                  onChange={e => setMemberName(e.target.value)}
                  className="rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Member name"
                />
                <input
                  type="email"
                  value={memberEmail}
                  onChange={e => setMemberEmail(e.target.value)}
                  className="rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Member email"
                />
                <input
                  type="text"
                  value={memberRole}
                  onChange={e => setMemberRole(e.target.value)}
                  className="rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Role (optional)"
                />
              </div>
              <button
                type="button"
                onClick={addTeamMember}
                className="text-sm font-medium text-primary hover:underline"
              >
                + Add Team Member
              </button>

              {/* Team Member Tags */}
              {teamMembers.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {teamMembers.map((member, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
                    >
                      {member.name}
                      {' '}
                      (
                      {member.email}
                      )
                      <button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        className="hover:text-blue-900 dark:hover:text-blue-100"
                      >
                        <X className="size-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Links & Resources Section */}
          <div className="rounded-2xl border border-border/40 bg-card/50 p-6 shadow-sm backdrop-blur-sm">
            <h2 className="mb-6 text-base font-bold">Links & Resources</h2>

            <div className="space-y-5">
              {/* Code Repository Link */}
              <div>
                <label htmlFor="repoLink" className="mb-2 block text-sm font-medium">
                  Code Repository Link*
                </label>
                <input
                  type="url"
                  id="repoLink"
                  value={repoLink}
                  onChange={e => setRepoLink(e.target.value)}
                  required
                  className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="https://github.com/your-repo"
                />
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Must be a valid Git repository URL
                </p>
              </div>

              {/* Live Demo Link */}
              <div>
                <label htmlFor="demoLink" className="mb-2 block text-sm font-medium">
                  Live Demo Link
                </label>
                <input
                  type="url"
                  id="demoLink"
                  value={demoLink}
                  onChange={e => setDemoLink(e.target.value)}
                  className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="https://your-project-demo.com"
                />
              </div>

              {/* Video Link */}
              <div>
                <label htmlFor="videoLink" className="mb-2 block text-sm font-medium">
                  Video Demo Link
                </label>
                <input
                  type="url"
                  id="videoLink"
                  value={videoLink}
                  onChange={e => setVideoLink(e.target.value)}
                  className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>

              {/* Presentation Link */}
              <div>
                <label htmlFor="presentationLink" className="mb-2 block text-sm font-medium">
                  Presentation Link
                </label>
                <input
                  type="url"
                  id="presentationLink"
                  value={presentationLink}
                  onChange={e => setPresentationLink(e.target.value)}
                  className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="https://slides.google.com/..."
                />
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-3 rounded-2xl border border-border/40 bg-card/50 p-4 shadow-sm backdrop-blur-sm">
            <button
              type="button"
              onClick={e => handleSubmit(e as any, true)}
              disabled={isSubmitting}
              className="rounded-xl border border-border/40 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-accent disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Project'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default SubmitProjectPage;
