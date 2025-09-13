import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRoutesProps {
  toRedirect: string;
}

export const PrivateRoutes = ({  toRedirect }: PrivateRoutesProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <h1 className="text-2xl">Loading...</h1>;

  if (!isAuthenticated && !loading) return <Navigate to={toRedirect} replace/>;
  return <Outlet />;
};
