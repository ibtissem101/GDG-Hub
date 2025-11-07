'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { RoleSelect } from '@/components/auth/RoleSelect';
import { UserRole } from '@/types/Enum';

const SIGN_UP_ROLES: UserRole[] = [UserRole.PARTICIPANT, UserRole.JUDGE, UserRole.ORGANIZER];

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: UserRole.PARTICIPANT,
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    const role = SIGN_UP_ROLES.includes(formData.role) ? formData.role : UserRole.PARTICIPANT;

    // Store user data in localStorage for demo purposes
    localStorage.setItem('user', JSON.stringify({
      email: formData.email,
      name: formData.name,
      role,
    }));

    // Redirect based on role
    const defaultPath = (() => {
      switch (role) {
        case UserRole.JUDGE:
          return '/dashboard/judge';
        case UserRole.ORGANIZER:
          return '/dashboard/organizer';
        case UserRole.PARTICIPANT:
        default:
          return '/dashboard';
      }
    })();

    router.push(defaultPath);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f0f0f0] via-white to-[#f0f0f0]">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-border/40 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
        <div className="text-center">
          <h2 className="bg-gradient-to-r from-[#4285f4] via-[#34a853] to-[#ea4335] bg-clip-text text-3xl font-bold text-transparent">
            Sign Up
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join GDG Hackathon Hub today
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
            roles={SIGN_UP_ROLES}
            className="mb-6"
          />

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-colors focus:border-[#4285f4] focus:outline-none focus:ring-2 focus:ring-[#4285f4]/20"
              placeholder="John Doe"
            />
          </div>

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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground transition-colors focus:border-[#4285f4] focus:outline-none focus:ring-2 focus:ring-[#4285f4]/20"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#1e1e1e] px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#2a2a2a] hover:shadow-lg"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?
          {' '}
          <Link href="/sign-in" className="font-medium text-[#4285f4] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
