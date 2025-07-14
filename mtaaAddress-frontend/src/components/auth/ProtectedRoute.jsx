import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (role === "admin" && !user?.is_admin) return <Navigate to="/user/dashboard" />;
  if (role === "user" && user?.is_admin) return <Navigate to="/admin/dashboard" />;

  return children;
}
