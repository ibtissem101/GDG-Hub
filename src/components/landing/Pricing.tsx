import React from 'react';

import { Section } from './Section';

export const Pricing = () => {
  return (
    <Section
      subtitle="Get Started"
      title="Join Our Hackathon"
      description="Submit your innovative project and compete with talented developers from our community"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* For Participants */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-2xl font-bold">Participants</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Submit and showcase your projects
            </p>
          </div>
          <ul className="mb-6 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Project submission portal
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Team management
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Draft & submit workflow
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Track your submissions
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Receive judge feedback
            </li>
          </ul>

        </div>

        {/* For Judges */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-4">

            <h3 className="text-2xl font-bold">Judges</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Evaluate and score projects
            </p>
          </div>
          <ul className="mb-6 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Comprehensive evaluation form
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              5-criteria scoring system
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Provide detailed feedback
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Draft evaluations
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              View all submissions
            </li>
          </ul>

        </div>

        {/* For Organizers */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-4">
            <h3 className="text-2xl font-bold">Organizers</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage your hackathon
            </p>
          </div>
          <ul className="mb-6 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Admin dashboard
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              View all submissions
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Filter & search projects
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Export data (CSV)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Manage judges
            </li>
          </ul>

        </div>
      </div>
    </Section>
  );
};
