import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

// Login ho chuka user /login pe na aaye, seedha apne dashboard pe jaye
export default function PublicRoute({ children }) {
  const { user } = useAuth();
  if (user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />;
  }
  return children;
}