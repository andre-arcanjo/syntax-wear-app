import type { ReactNode } from 'react';
import { Navigate, useLocation } from '@tanstack/react-router';
import { useAuth } from '../../context/AuthContext/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoadingAuth } = useAuth();
  const currentLocation = useLocation({
    select: (location) => location.href,
  });

  if (isLoadingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[rgb(236,233,226)]">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-b-black"
          aria-label="Verificando autenticação"
        />
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/sign-in"
        search={{ redirect: currentLocation }}
        replace
      />
    );
  }

  return children;
};
