import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import UserContextProvider from "@/context/UserProvider";

const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <UserContextProvider>
      <Outlet />
    </UserContextProvider>
  );
};

export default ProtectedRoute;
