import * as React from 'react';

import { useAuth } from './auth';

import { AuthUser } from '@/features/auth';

export const ROLES = {
  ADMIN: '0',
  MANAGER: '1',
  USER: '2',
};

type RoleKeys = keyof typeof ROLES;
type RoleTypes = typeof ROLES[RoleKeys];

export const POLICIES = {
  'movie:create': (user: AuthUser) => {
    if (user.permission.type === '1') {
      return true;
    }

    return false;
  },
};

export const useAuthorization = () => {
  const { user } = useAuth();

  if (!user) {
    throw Error('User does not exist!');
  }

  const checkAccess = React.useCallback(
    ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
      if (allowedRoles && allowedRoles.length > 0) {
        return allowedRoles?.includes(user.permission.type);
      }

      return true;
    },
    [user.permission.type],
  );

  return { checkAccess, role: user.permission.type };
};

type AuthorizationProps = {
  forbiddenFallback?: React.ReactNode;
  children: React.ReactNode;
} & (
  | {
      allowedRoles: RoleTypes[];
      policyCheck?: never;
    }
  | {
      allowedRoles?: never;
      policyCheck: boolean;
    }
);

export const Authorization = ({
  policyCheck,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: AuthorizationProps) => {
  const { checkAccess } = useAuthorization();

  let canAccess = false;

  if (allowedRoles) {
    canAccess = checkAccess({ allowedRoles });
  }

  if (typeof policyCheck !== 'undefined') {
    canAccess = policyCheck;
  }

  return <>{canAccess ? children : forbiddenFallback}</>;
};
