import type { Evaluation, Project } from '@/types/Subscription';
import { MAX_TOTAL_SCORE } from '@/utils/AppConfig';

/**
 * Calculate the total score from individual evaluation scores
 */
export function calculateTotalScore(evaluation: Partial<Evaluation>): number {
  const {
    innovationScore = 0,
    technicalScore = 0,
    designScore = 0,
    impactScore = 0,
    presentationScore = 0,
  } = evaluation;

  return (
    innovationScore
    + technicalScore
    + designScore
    + impactScore
    + presentationScore
  );
}

/**
 * Calculate average score for a project from multiple evaluations
 */
export function calculateAverageScore(evaluations: Evaluation[]): number {
  if (evaluations.length === 0) {
    return 0;
  }

  const totalScore = evaluations.reduce(
    (sum, evaluation) => sum + evaluation.totalScore,
    0,
  );
  return Math.round((totalScore / evaluations.length) * 10) / 10; // Round to 1 decimal
}

/**
 * Get the rank of a project based on its score
 */
export function getProjectRank(
  project: Project & { totalScore: number },
  allProjects: (Project & { totalScore: number })[],
): number {
  const sortedProjects = [...allProjects].sort(
    (a, b) => b.totalScore - a.totalScore,
  );
  return sortedProjects.findIndex(p => p.id === project.id) + 1;
}

/**
 * Format project status for display
 */
export function formatProjectStatus(status: string): string {
  return status
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Get status badge color class
 */
export function getStatusBadgeColor(status: string): string {
  switch (status) {
    case 'draft':
      return 'bg-gray-500';
    case 'submitted':
      return 'bg-blue-500';
    case 'under_review':
      return 'bg-yellow-500';
    case 'reviewed':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
}

/**
 * Check if a deadline has passed
 */
export function isDeadlinePassed(deadline: Date): boolean {
  return new Date() > deadline;
}

/**
 * Format deadline for display with time remaining
 */
export function formatDeadline(deadline: Date): string {
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();

  if (diff < 0) {
    return 'Deadline passed';
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) {
    return `${days} day${days !== 1 ? 's' : ''} remaining`;
  }
  return `${hours} hour${hours !== 1 ? 's' : ''} remaining`;
}

/**
 * Validate GitHub/GitLab/Bitbucket URL
 */
export function isValidRepositoryUrl(url: string): boolean {
  const patterns = [
    /^https?:\/\/(www\.)?github\.com\/.+\/.+/,
    /^https?:\/\/(www\.)?gitlab\.com\/.+\/.+/,
    /^https?:\/\/(www\.)?bitbucket\.org\/.+\/.+/,
  ];

  return patterns.some(pattern => pattern.test(url));
}

/**
 * Parse technologies string to array
 */
export function parseTechnologies(technologiesString: string): string[] {
  return technologiesString
    .split(',')
    .map(tech => tech.trim())
    .filter(tech => tech.length > 0);
}

/**
 * Format technologies array to string
 */
export function formatTechnologies(technologies: string[]): string {
  return technologies.join(', ');
}

/**
 * Check if user can edit a project
 */
export function canEditProject(
  project: Project,
  userId: string,
  userRole: string,
): boolean {
  // Admins and organizers can always edit
  if (userRole === 'admin' || userRole === 'organizer') {
    return true;
  }

  // Owners can edit their own projects if not submitted
  if (project.userId === userId && project.status === 'draft') {
    return true;
  }

  return false;
}

/**
 * Check if evaluation is complete
 */
export function isEvaluationComplete(evaluation: Partial<Evaluation>): boolean {
  return !!(
    evaluation.innovationScore !== undefined
    && evaluation.technicalScore !== undefined
    && evaluation.designScore !== undefined
    && evaluation.impactScore !== undefined
    && evaluation.presentationScore !== undefined
  );
}

/**
 * Get percentage score
 */
export function getScorePercentage(score: number): number {
  return Math.round((score / MAX_TOTAL_SCORE) * 100);
}

/**
 * Export projects to CSV
 */
export function exportProjectsToCSV(
  projects: (Project & {
    teamLeader?: string;
    totalScore?: number;
  })[],
): string {
  const headers = [
    'ID',
    'Name',
    'Category',
    'Team Leader',
    'Status',
    'Score',
    'Repository',
    'Demo URL',
    'Submitted At',
  ];

  const rows = projects.map(project => [
    project.id,
    `"${project.name}"`,
    project.category,
    project.teamLeader || 'N/A',
    formatProjectStatus(project.status),
    project.totalScore !== undefined ? project.totalScore : 'N/A',
    project.codeRepositoryUrl,
    project.demoUrl || 'N/A',
    project.submittedAt
      ? new Date(project.submittedAt).toLocaleDateString()
      : 'N/A',
  ]);

  const csv = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');

  return csv;
}

/**
 * Download CSV file
 */
export function downloadCSV(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Group projects by category
 */
export function groupProjectsByCategory(
  projects: Project[],
): Record<string, Project[]> {
  return projects.reduce(
    (acc, project) => {
      if (!acc[project.category]) {
        acc[project.category] = [];
      }
      acc[project.category]!.push(project);
      return acc;
    },
    {} as Record<string, Project[]>,
  );
}

/**
 * Get medal emoji for rank
 */
export function getMedalEmoji(rank: number): string | null {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return null;
  }
}

/**
 * Validate evaluation scores
 */
export function validateEvaluationScores(evaluation: Partial<Evaluation>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  const scores = {
    innovationScore: evaluation.innovationScore,
    technicalScore: evaluation.technicalScore,
    designScore: evaluation.designScore,
    impactScore: evaluation.impactScore,
    presentationScore: evaluation.presentationScore,
  };

  Object.entries(scores).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      errors.push(`${key} is required`);
    } else if (value < 0 || value > 10) {
      errors.push(`${key} must be between 0 and 10`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}
