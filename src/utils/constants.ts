/**
 * Hackathon Platform Constants
 * Centralized constants for the GDG Hackathon Hub
 */

// Project Limits
export const PROJECT_LIMITS = {
  MAX_TEAM_MEMBERS: 5,
  MIN_TEAM_MEMBERS: 1,
  MAX_TECHNOLOGIES: 15,
  MIN_DESCRIPTION_LENGTH: 50,
  MAX_DESCRIPTION_LENGTH: 2000,
  MIN_PROBLEM_STATEMENT_LENGTH: 30,
  MAX_PROBLEM_STATEMENT_LENGTH: 1000,
  MIN_SOLUTION_LENGTH: 30,
  MAX_SOLUTION_LENGTH: 1000,
} as const;

// Evaluation Score Ranges
export const SCORE_RANGES = {
  MIN: 0,
  MAX: 10,
  CRITERIA_COUNT: 5,
  MAX_TOTAL: 50, // 5 criteria × 10 points each
} as const;

// Status Display Names
export const STATUS_DISPLAY_NAMES = {
  draft: 'Draft',
  submitted: 'Submitted',
  under_review: 'Under Review',
  reviewed: 'Reviewed',
} as const;

// Role Display Names
export const ROLE_DISPLAY_NAMES = {
  participant: 'Participant',
  organizer: 'Organizer',
  judge: 'Judge',
  admin: 'Administrator',
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_WITH_TIME: 'MMM DD, YYYY HH:mm',
  ISO: 'YYYY-MM-DD',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_URL: 'Please enter a valid URL',
  INVALID_REPO_URL: 'Must be a GitHub, GitLab, or Bitbucket URL',
  MIN_LENGTH: (field: string, min: number) =>
    `${field} must be at least ${min} characters`,
  MAX_LENGTH: (field: string, max: number) =>
    `${field} must not exceed ${max} characters`,
  MIN_SCORE: (min: number) => `Score must be at least ${min}`,
  MAX_SCORE: (max: number) => `Score must not exceed ${max}`,
  MIN_TEAM_SIZE: `Team must have at least ${PROJECT_LIMITS.MIN_TEAM_MEMBERS} member`,
  MAX_TEAM_SIZE: `Team cannot exceed ${PROJECT_LIMITS.MAX_TEAM_MEMBERS} members`,
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  PROJECT_CREATED: 'Project created successfully!',
  PROJECT_UPDATED: 'Project updated successfully!',
  PROJECT_SUBMITTED: 'Project submitted successfully!',
  PROJECT_DELETED: 'Project deleted successfully!',
  TEAM_SAVED: 'Team members saved successfully!',
  EVALUATION_SAVED: 'Evaluation saved as draft!',
  EVALUATION_SUBMITTED: 'Evaluation submitted successfully!',
  EVALUATION_UPDATED: 'Evaluation updated successfully!',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  DEADLINE_PASSED: 'The submission deadline has passed.',
  ALREADY_SUBMITTED: 'This project has already been submitted.',
  ALREADY_EVALUATED: 'You have already evaluated this project.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  VALIDATION_FAILED: 'Please check the form for errors.',
} as const;

// Export File Names
export const EXPORT_FILE_NAMES = {
  ALL_PROJECTS: (hackathonId: string) => `${hackathonId}_all_projects.csv`,
  EVALUATIONS: (hackathonId: string) => `${hackathonId}_evaluations.csv`,
  LEADERBOARD: (hackathonId: string) => `${hackathonId}_leaderboard.csv`,
} as const;

// Badge Colors (Tailwind classes)
export const BADGE_COLORS = {
  STATUS: {
    draft: 'bg-gray-500 text-white',
    submitted: 'bg-blue-500 text-white',
    under_review: 'bg-yellow-500 text-white',
    reviewed: 'bg-green-500 text-white',
  },
  RANK: {
    1: 'bg-yellow-500 text-white', // Gold
    2: 'bg-gray-400 text-white', // Silver
    3: 'bg-orange-600 text-white', // Bronze
  },
  SCORE: {
    high: 'bg-green-500 text-white', // 40-50
    medium: 'bg-yellow-500 text-white', // 25-39
    low: 'bg-red-500 text-white', // 0-24
  },
} as const;

// Repository Hosts
export const REPOSITORY_HOSTS = {
  GITHUB: 'github.com',
  GITLAB: 'gitlab.com',
  BITBUCKET: 'bitbucket.org',
} as const;

// Video Platforms
export const VIDEO_PLATFORMS = {
  YOUTUBE: 'youtube.com',
  VIMEO: 'vimeo.com',
  LOOM: 'loom.com',
} as const;

// Demo Platforms
export const DEMO_PLATFORMS = {
  VERCEL: 'vercel.app',
  NETLIFY: 'netlify.app',
  HEROKU: 'herokuapp.com',
  GITHUB_PAGES: 'github.io',
} as const;

// Query Keys (for React Query / data fetching)
export const QUERY_KEYS = {
  PROJECTS: 'projects',
  PROJECT_DETAIL: (id: number) => ['project', id],
  MY_PROJECTS: 'my-projects',
  EVALUATIONS: 'evaluations',
  EVALUATION_DETAIL: (id: number) => ['evaluation', id],
  JUDGES: 'judges',
  LEADERBOARD: 'leaderboard',
  ARCHIVE: 'archive',
  TEAM_MEMBERS: (projectId: number) => ['team-members', projectId],
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  DRAFT_PROJECT: 'draft_project',
  DRAFT_EVALUATION: (projectId: number) => `draft_evaluation_${projectId}`,
  FILTER_PREFERENCES: 'filter_preferences',
  SORT_PREFERENCES: 'sort_preferences',
} as const;

// Animation Durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Debounce Delays (in milliseconds)
export const DEBOUNCE_DELAYS = {
  SEARCH: 300,
  AUTO_SAVE: 1000,
  INPUT: 500,
} as const;

// Score Thresholds
export const SCORE_THRESHOLDS = {
  HIGH: 40, // 80%+
  MEDIUM: 25, // 50%+
  LOW: 0, // Below 50%
} as const;

// Table Column Widths (for consistent sizing)
export const TABLE_COLUMN_WIDTHS = {
  ID: '80px',
  NAME: '250px',
  CATEGORY: '150px',
  STATUS: '120px',
  SCORE: '100px',
  DATE: '120px',
  ACTIONS: '150px',
} as const;

// Z-Index Layers
export const Z_INDEX = {
  DROPDOWN: 1000,
  STICKY: 100,
  MODAL: 2000,
  TOAST: 3000,
  TOOLTIP: 4000,
} as const;

export default {
  PROJECT_LIMITS,
  SCORE_RANGES,
  STATUS_DISPLAY_NAMES,
  ROLE_DISPLAY_NAMES,
  DATE_FORMATS,
  PAGINATION,
  VALIDATION_MESSAGES,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  EXPORT_FILE_NAMES,
  BADGE_COLORS,
  REPOSITORY_HOSTS,
  VIDEO_PLATFORMS,
  DEMO_PLATFORMS,
  QUERY_KEYS,
  STORAGE_KEYS,
  ANIMATION_DURATIONS,
  DEBOUNCE_DELAYS,
  SCORE_THRESHOLDS,
  TABLE_COLUMN_WIDTHS,
  Z_INDEX,
};
