import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: Array<"admin" | "filiada" | "prestador" | "beneficiario" | "dependente">;
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { loading, session, role, mustChangePassword } = useAuth();

  if (loading) return null; // Could render a spinner

  if (!session) return <Navigate to="/login" replace />;

  if (mustChangePassword) return <Navigate to="/first-access" replace />;

  if (allowedRoles && (role === "unknown" || !allowedRoles.includes(role as any))) {
    // Fallback: redirect to the user's own dashboard
    switch (role) {
      case "admin":
        return <Navigate to="/admin" replace />;
      case "filiada":
        return <Navigate to="/filiada" replace />;
      case "prestador":
        return <Navigate to="/prestador" replace />;
      case "beneficiario":
        return <Navigate to="/beneficiario" replace />;
      case "dependente":
        return <Navigate to="/dependente" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <Outlet />;
};
