import { Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const PublicRoutes = () => {

  const {isAuthenticated,loading} = useAuth()

  if(loading) return <h1>Loading...</h1>

  return !isAuthenticated && <Outlet/>
  }