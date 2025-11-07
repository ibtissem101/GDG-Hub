import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { UserRole } from '@/types/Enum';

export async function generateMetadata() {
  return {
    title: 'Settings - GDG Hackathon Hub',
    description: 'Manage your account settings',
  };
}

const SettingsPage = async () => {
  const userRole = UserRole.PARTICIPANT;

  return (
    <DashboardLayout userRole={userRole}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold"> Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-6">
        {/* Profile Settings */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-bold">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Full Name</label>
              <input
                type="text"
                className="w-full rounded-lg border border-border bg-background px-4 py-2"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full rounded-lg border border-border bg-background px-4 py-2"
                placeholder="demo@gdg.dev"
                disabled
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Email cannot be changed
              </p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Bio</label>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-border bg-background px-4 py-2"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-bold">Notifications</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="size-4 rounded" defaultChecked />
              <span className="text-sm">Email notifications for new evaluations</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="size-4 rounded" defaultChecked />
              <span className="text-sm">Email notifications for judge assignments</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="size-4 rounded" />
              <span className="text-sm">Weekly digest emails</span>
            </label>
          </div>
        </div>

        {/* Social Links */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-bold">Social Links</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">GitHub</label>
              <input
                type="url"
                className="w-full rounded-lg border border-border bg-background px-4 py-2"
                placeholder="https://github.com/username"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">LinkedIn</label>
              <input
                type="url"
                className="w-full rounded-lg border border-border bg-background px-4 py-2"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Twitter/X</label>
              <input
                type="url"
                className="w-full rounded-lg border border-border bg-background px-4 py-2"
                placeholder="https://twitter.com/username"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <button className="rounded-lg border border-border px-6 py-2 font-medium hover:bg-accent">
            Cancel
          </button>
          <button className="rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground hover:bg-primary/90">
            Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
