import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '../lib/auth-client';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}
