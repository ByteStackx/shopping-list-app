import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store';
import type { RootState } from '../store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export default ProtectedRoute;
