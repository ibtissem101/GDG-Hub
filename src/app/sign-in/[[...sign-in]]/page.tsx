'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { RoleSelect } from '@/components/auth/RoleSelect';
import { UserRole } from '@/types/Enum';
import { canAccessRoute } from '@/utils/RoutePermissions';

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: UserRole.PARTICIPANT,
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // For now, just redirect based on role (demo logic)
    if (formData.email && formData.password) {
      // Store user data in localStorage for demo purposes
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        name: formData.email.split('@')[0],
        role: formData.role,
      }));

      // Role-based default destination
      const defaultPath = (() => {
        switch (formData.role) {
          case UserRole.JUDGE:
            return '/dashboard/judge';
          case UserRole.ORGANIZER:
            return '/dashboard/organizer';
          case UserRole.ADMIN:
            return '/dashboard';
          case UserRole.PARTICIPANT:
          default:
            return '/dashboard';
        }
      })();

      // Optional redirect after login if accessible by role
      const attempted = localStorage.getItem('redirectAfterLogin');
      if (attempted && canAccessRoute(attempted, formData.role)) {
        localStorage.removeItem('redirectAfterLogin');
        router.push(attempted);
        return;
      }

      router.push(defaultPath);
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f0f0f0] via-white to-[#f0f0f0]">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-border/40 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
        <div className="text-center">
          <h2 className="bg-gradient-to-r from-[#4285f4] via-[#34a853] to-[#ea4335] bg-clip-text text-3xl font-bold text-transparent">
            Sign In
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Welcome back to GDG Hackathon Hub
          </p>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <RoleSelect
            value={formData.role}
            onChange={role => setFormData({ ...formData, role })}
            className="mb-6"
          />
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-colors focus:border-[#4285f4] focus:outline-none focus:ring-2 focus:ring-[#4285f4]/20"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-colors focus:border-[#4285f4] focus:outline-none focus:ring-2 focus:ring-[#4285f4]/20"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#1e1e1e] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#2a2a2a] hover:shadow-lg"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?
          {' '}
          <Link href="/sign-up" className="font-medium text-[#4285f4] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
