import type { EnumValues } from './Enum';

// Project Types
export const PROJECT_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  REVIEWED: 'reviewed',
} as const;

export type ProjectStatus = EnumValues<typeof PROJECT_STATUS>;

// User Role Types
export const USER_ROLE = {
  PARTICIPANT: 'participant',
  ORGANIZER: 'organizer',
  JUDGE: 'judge',
  ADMIN: 'admin',
} as const;

export type UserRole = EnumValues<typeof USER_ROLE>;

// Project Interface
export type Project = {
  id: number;
  userId: string;
  hackathonId: string;
  name: string;
  description: string;
  problemStatement: string;
  solution: string;
  codeRepositoryUrl: string;
  demoUrl?: string;
  videoUrl?: string;
  presentationUrl?: string;
  technologies: string[];
  category: string;
  status: ProjectStatus;
  isPublic: boolean;
  submittedAt?: Date;
  updatedAt: Date;
  createdAt: Date;
};

// Team Member Interface
export type TeamMember = {
  id: number;
  projectId: number;
  userId?: string;
  name: string;
  email: string;
  role?: string;
  isLeader: boolean;
  updatedAt: Date;
  createdAt: Date;
};

// Judge Interface
export type Judge = {
  id: number;
  userId: string;
  name: string;
  email: string;
  bio?: string;
  expertise: string[];
  isActive: boolean;
  updatedAt: Date;
  createdAt: Date;
};

// Evaluation Interface
export type Evaluation = {
  id: number;
  projectId: number;
  judgeId: number;
  innovationScore: number;
  technicalScore: number;
  designScore: number;
  impactScore: number;
  presentationScore: number;
  totalScore: number;
  feedback?: string;
  strengths?: string;
  improvements?: string;
  isFinalized: boolean;
  updatedAt: Date;
  createdAt: Date;
};

