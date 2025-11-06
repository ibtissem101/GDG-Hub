import { http, HttpResponse } from 'msw';

// Mock data for dashboard
const mockProjects = [
  {
    id: '1',
    name: 'AI Chatbot Assistant',
    team: 'Team Alpha',
    category: 'AI/ML',
    status: 'submitted',
    submittedAt: '2025-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Community Event Platform',
    team: 'Team Beta',
    category: 'Web',
    status: 'submitted',
    submittedAt: '2025-01-15T14:20:00Z',
  },
  {
    id: '3',
    name: 'Healthcare Analytics Dashboard',
    team: 'Team Gamma',
    category: 'Cloud',
    status: 'submitted',
    submittedAt: '2025-01-15T16:45:00Z',
  },
];

const mockAnnouncements = [
  {
    id: '1',
    title: 'Welcome to GDG Fall Hackathon 2025!',
    content: 'We are excited to have you here. Check out the schedule and guidelines.',
    type: 'info',
    createdAt: '2025-01-10T09:00:00Z',
  },
  {
    id: '2',
    title: 'Submission Deadline Extended',
    content: 'The project submission deadline has been extended to January 20th.',
    type: 'important',
    createdAt: '2025-01-14T15:30:00Z',
  },
];

const mockDeadlines = [
  {
    id: '1',
    title: 'Project Submission',
    date: '2025-01-20T23:59:59Z',
    description: 'Submit your final project',
  },
  {
    id: '2',
    title: 'Judging Period',
    date: '2025-01-25T23:59:59Z',
    description: 'Projects will be evaluated',
  },
  {
    id: '3',
    title: 'Winner Announcement',
    date: '2025-01-30T18:00:00Z',
    description: 'Winners will be announced',
  },
];

const mockLeaderboard = [
  {
    rank: 1,
    team: 'Team Alpha',
    project: 'AI Chatbot Assistant',
    score: 95,
    category: 'AI/ML',
  },
  {
    rank: 2,
    team: 'Team Beta',
    project: 'Community Event Platform',
    score: 92,
    category: 'Web',
  },
  {
    rank: 3,
    team: 'Team Gamma',
    project: 'Healthcare Analytics Dashboard',
    score: 88,
    category: 'Cloud',
  },
];

const mockUserProfile = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'participant',
  team: 'Team Alpha',
  avatar: null,
};

const mockOrganizerStats = {
  totalProjects: 25,
  totalParticipants: 75,
  totalTeams: 25,
  submittedProjects: 18,
  pendingReviews: 7,
};

const mockEvaluations = [
  {
    id: '1',
    projectId: '1',
    projectName: 'AI Chatbot Assistant',
    team: 'Team Alpha',
    status: 'pending',
    assignedAt: '2025-01-16T10:00:00Z',
  },
  {
    id: '2',
    projectId: '2',
    projectName: 'Community Event Platform',
    team: 'Team Beta',
    status: 'completed',
    assignedAt: '2025-01-16T10:00:00Z',
    completedAt: '2025-01-17T14:30:00Z',
    score: 92,
  },
];

// API handlers
export const handlers = [
  // Dashboard - Projects
  http.get('/api/projects', () => {
    return HttpResponse.json(mockProjects);
  }),

  // Dashboard - Announcements
  http.get('/api/announcements', () => {
    return HttpResponse.json(mockAnnouncements);
  }),

  // Dashboard - Deadlines
  http.get('/api/deadlines', () => {
    return HttpResponse.json(mockDeadlines);
  }),

  // Leaderboard
  http.get('/api/leaderboard', () => {
    return HttpResponse.json(mockLeaderboard);
  }),

  // User Profile
  http.get('/api/user/profile', () => {
    return HttpResponse.json(mockUserProfile);
  }),

  // Organizer Stats
  http.get('/api/organizer/stats', () => {
    return HttpResponse.json(mockOrganizerStats);
  }),

  // Judge Evaluations
  http.get('/api/judge/evaluations', () => {
    return HttpResponse.json(mockEvaluations);
  }),

  // Submit Project
  http.post('/api/projects', async ({ request }) => {
    const body = await request.json();
    const newProject = {
      id: String(mockProjects.length + 1),
      ...body,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
    };
    return HttpResponse.json(newProject, { status: 201 });
  }),

  // Submit Evaluation
  http.post('/api/judge/evaluations/:id', async ({ params, request }) => {
    const body = await request.json();
    return HttpResponse.json({
      id: params.id,
      ...body,
      completedAt: new Date().toISOString(),
    });
  }),
];
