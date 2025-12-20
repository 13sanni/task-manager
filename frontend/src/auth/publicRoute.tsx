import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext.tsx";

type PublicRouteProps = {
  children: React.ReactNode;
};

export default function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
