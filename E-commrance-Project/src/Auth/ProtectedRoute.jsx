
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = () => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return isLoggedIn
    ? <Outlet />
    : <Navigate to="/" replace />;
};

export default ProtectedRoute;
