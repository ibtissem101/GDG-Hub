'use client';

import { RoleInfo, UserRole } from '@/types/Enum';

type RoleSelectProps = {
  value: UserRole;
  onChange: (role: UserRole) => void;
  className?: string;
  roles?: UserRole[];
};

export function RoleSelect({ value, onChange, className = '', roles }: RoleSelectProps) {
  const availableRoles = roles && roles.length > 0 ? roles : (Object.values(UserRole) as UserRole[]);

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        I am a...
      </label>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {availableRoles.map((role) => {
          const info = RoleInfo[role];
          return (
            <button
              key={role}
              type="button"
              onClick={() => onChange(role)}
              className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 text-center transition-colors
                ${value === role
              ? 'border-primary bg-primary/5 text-primary'
              : 'border-border hover:border-primary/50 hover:bg-primary/5'
            }`}
            >
              <span className="text-2xl">{info.emoji}</span>
              <span className="mt-1 font-medium">{info.name}</span>
              <span className="mt-1 text-xs text-muted-foreground">
                {info.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
