import { Navigate, useLocation } from "react-router";
import { paths } from "@/config/paths";
import { isTokenExpired } from "@/utils/tokenUtils";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token || isTokenExpired(token)) {
    if (location.pathname === paths.auth.login.path) {
      return null;
    }
    return <Navigate to={paths.auth.login.path} replace />;
  }

  return <>{children}</>;
};
