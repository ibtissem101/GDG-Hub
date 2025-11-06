export const AppConfig = {
  name: 'GDG Hackathon Hub',
  description: 'A centralized platform for hackathon project submissions, evaluation, and archiving',
  locale: 'en',
  
  // Hackathon Settings
  currentHackathonId: 'gdg-2025-fall',
  currentHackathonName: 'GDG Fall Hackathon 2025',
  submissionDeadline: new Date('2025-12-01T23:59:59'),
  judgingDeadline: new Date('2025-12-15T23:59:59'),
};

// Project Categories
export const PROJECT_CATEGORIES = [
  'AI/ML',
  'Web Development',
  'Mobile Development',
  'IoT/Hardware',
  'Blockchain',
  'Game Development',
  'Social Impact',
  'Education',
  'Health Tech',
  'Other',
] as const;

// User Roles
export const USER_ROLES = {
  PARTICIPANT: 'participant',
  ORGANIZER: 'organizer',
  JUDGE: 'judge',
  ADMIN: 'admin',
} as const;

// Project Status
export const PROJECT_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  REVIEWED: 'reviewed',
} as const;

// Evaluation Criteria
export const EVALUATION_CRITERIA = {
  INNOVATION: { name: 'Innovation', maxScore: 10, weight: 1 },
  TECHNICAL: { name: 'Technical Implementation', maxScore: 10, weight: 1 },
  DESIGN: { name: 'Design & UX', maxScore: 10, weight: 1 },
  IMPACT: { name: 'Impact & Usefulness', maxScore: 10, weight: 1 },
  PRESENTATION: { name: 'Presentation', maxScore: 10, weight: 1 },
} as const;

export const MAX_TOTAL_SCORE = Object.values(EVALUATION_CRITERIA).reduce(
  (sum, criteria) => sum + criteria.maxScore * criteria.weight,
  0,
);
