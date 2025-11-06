import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { UserRole } from '@/types/Enum';
import { Upload, X } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: 'Submit Project - GDG Hackathon Hub',
    description: 'Submit your hackathon project',
  };
}

const SubmitProjectPage = async () => {
  const userRole = UserRole.PARTICIPANT;

  return (
    <DashboardLayout userRole={userRole}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Submit Your Project</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill out the details below to enter your project into the hackathon.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <form className="space-y-8">
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
                  className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Describe your project, the problem it solves, and the technology used."
                />
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="rounded-2xl border border-border/40 bg-card/50 p-6 shadow-sm backdrop-blur-sm">
            <h2 className="mb-6 text-base font-bold">Team</h2>
            
            <div className="space-y-5">
              {/* Team Members */}
              <div>
                <label htmlFor="teamMembers" className="mb-2 block text-sm font-medium">
                  Team Members*
                </label>
                <div className="space-y-3">
                  <input
                    type="text"
                    className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Add team member email and press Enter"
                  />
                  
                  {/* Team Member Tags */}
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      ada.lovelace@example.com
                      <button type="button" className="hover:text-blue-900 dark:hover:text-blue-100">
                        <X className="size-3.5" />
                      </button>
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      grace.hopper@example.com
                      <button type="button" className="hover:text-blue-900 dark:hover:text-blue-100">
                        <X className="size-3.5" />
                      </button>
                    </span>
                  </div>
                  
                  <button
                    type="button"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    + Add
                  </button>
                </div>
              </div>
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
                  className="w-full rounded-xl border border-border/40 bg-background px-4 py-2.5 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="https://your-project-demo.com"
                />
              </div>
            </div>
          </div>

          {/* Project Thumbnail Section */}
          <div className="rounded-2xl border border-border/40 bg-card/50 p-6 shadow-sm backdrop-blur-sm">
            <h2 className="mb-6 text-base font-bold">Project Thumbnail</h2>
            
            <div className="rounded-xl border-2 border-dashed border-border/60 bg-muted/30 p-12 text-center transition-colors hover:border-primary/40 hover:bg-muted/50">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-background">
                <Upload className="size-8 text-muted-foreground" />
              </div>
              <p className="mb-2 text-sm font-medium">
                <button type="button" className="text-primary hover:underline">
                  Upload a file
                </button>
                {' '}or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-end gap-3 rounded-2xl border border-border/40 bg-card/50 p-4 shadow-sm backdrop-blur-sm">
            <button
              type="button"
              className="rounded-xl border border-border/40 px-6 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
            >
              Submit Project
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default SubmitProjectPage;
