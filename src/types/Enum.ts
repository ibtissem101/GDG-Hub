export type EnumValues<Type> = Type[keyof Type];

// User Roles for GDG Hackathon Hub
export enum UserRole {
  PARTICIPANT = 'participant',
  JUDGE = 'judge',
  ORGANIZER = 'organizer',
  ADMIN = 'admin',
}

export type UserRoleType = `${UserRole}`;

// Role Permissions
export const RolePermissions = {
  [UserRole.PARTICIPANT]: [
    'submit_project',
    'edit_own_project',
    'manage_team_members',
    'view_own_projects',
    'view_public_projects',
  ],
  [UserRole.JUDGE]: [
    'evaluate_projects',
    'give_feedback',
    'assign_scores',
    'view_assigned_projects',
    'view_public_projects',
  ],
  [UserRole.ORGANIZER]: [
    'view_all_submissions',
    'assign_judges',
    'export_data',
    'manage_hackathon',
    'view_analytics',
  ],
  [UserRole.ADMIN]: [
    'full_control',
    'manage_organizers',
    'manage_judges',
    'manage_settings',
    'delete_any_project',
    'assign_roles',
  ],
} as const;

// Role Display Information
export const RoleInfo = {
  [UserRole.PARTICIPANT]: {
    name: 'Participant',
    emoji: '🧑‍💻',
    description: 'Submit and edit projects, manage team members',
    color: 'blue',
  },
  [UserRole.JUDGE]: {
    name: 'Judge',
    emoji: '🧑‍⚖️',
    description: 'Evaluate projects, give feedback, assign scores',
    color: 'purple',
  },
  [UserRole.ORGANIZER]: {
    name: 'Organizer',
    emoji: '🧑‍🏫',
    description: 'Manage hackathon, view submissions, assign judges, export data',
    color: 'green',
  },
  [UserRole.ADMIN]: {
    name: 'Admin',
    emoji: '👑',
    description: 'Full control (manages organizers and settings)',
    color: 'red',
  },
} as const;
