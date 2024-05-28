import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
