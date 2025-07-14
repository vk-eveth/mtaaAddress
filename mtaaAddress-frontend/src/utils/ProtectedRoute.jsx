// src/utils/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export function RequireAuth({ children, allowedRole }) {
  const { auth } = useContext(AuthContext);

  if (!auth) return <Navigate to="/login" />;
  if (auth.role !== allowedRole) return <Navigate to="/unauthorized" />;
  return children;
}