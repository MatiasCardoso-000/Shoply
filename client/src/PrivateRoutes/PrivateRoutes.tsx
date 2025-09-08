import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRoutesProps {
  toRedirect: string;
}

export const PrivateRoutes = ({  toRedirect }: PrivateRoutesProps) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  if (!isAuthenticated) return <Navigate to={toRedirect}/>;
  return <Outlet />;
};
