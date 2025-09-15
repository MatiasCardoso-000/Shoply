import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRoutesProps {
  toRedirect: string;
  children: React.ReactNode;
}

export const PrivateRoutes = ({ toRedirect, children }: PrivateRoutesProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <h1 className="text-2xl">Loading...</h1>;

  if (!isAuthenticated && !loading) return <Navigate to={toRedirect} replace />;
  return children ? children : <Outlet />;
};
