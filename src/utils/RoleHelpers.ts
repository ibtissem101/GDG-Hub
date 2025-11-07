import { RolePermissions, UserRole } from '@/types/Enum';

/**
 * Check if a user has a specific role
 */
export function hasRole(userRole: string | null | undefined, role: UserRole): boolean {
  return userRole === role;
}

/**
 * Check if a user has any of the specified roles
 */
export function hasAnyRole(
  userRole: string | null | undefined,
  roles: UserRole[],
): boolean {
  if (!userRole) {
    return false;
  }
  return roles.includes(userRole as UserRole);
}

/**
 * Check if a user has a specific permission based on their role
 */
export function hasPermission(
  userRole: string | null | undefined,
  permission: string,
): boolean {
  if (!userRole) {
    return false;
  }

  const role = userRole as UserRole;
  const permissions = RolePermissions[role];

  if (!permissions) {
    return false;
  }

  // Admin has all permissions
  if (role === UserRole.ADMIN) {
    return true;
  }

  return (permissions as readonly string[]).includes(permission);
}

/**
 * Check if a user can perform an action
 */
export function canPerformAction(
  userRole: string | null | undefined,
  action: string,
): boolean {
  return hasPermission(userRole, action);
}

/**
 * Get the highest role from an array of roles
 */
export function getHighestRole(roles: string[]): UserRole | null {
  const roleHierarchy = [
    UserRole.ADMIN,
    UserRole.ORGANIZER,
    UserRole.JUDGE,
    UserRole.PARTICIPANT,
  ];

  for (const role of roleHierarchy) {
    if (roles.includes(role)) {
      return role;
    }
  }

  return null;
}

/**
 * Check if user is at least a certain role level
 */
export function isAtLeast(
  userRole: string | null | undefined,
  minRole: UserRole,
): boolean {
  if (!userRole) {
    return false;
  }

  const roleHierarchy: Record<UserRole, number> = {
    [UserRole.PARTICIPANT]: 1,
    [UserRole.JUDGE]: 2,
    [UserRole.ORGANIZER]: 3,
    [UserRole.ADMIN]: 4,
  };

  const currentRoleLevel = roleHierarchy[userRole as UserRole] || 0;
  const minRoleLevel = roleHierarchy[minRole] || 0;

  return currentRoleLevel >= minRoleLevel;
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: UserRole): readonly string[] {
  return RolePermissions[role] || [];
}

/**
 * Format role name for display
 */
export function formatRoleName(role: string | null | undefined): string {
  if (!role) {
    return 'No Role';
  }

  return role
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
