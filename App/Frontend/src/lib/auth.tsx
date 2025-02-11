import { Navigate, useLocation } from "react-router";
import { paths } from "@/config/paths";
import { isTokenExpired } from "@/utils/tokenUtils";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Check if no token exists or if it is expired.
  if (!token || isTokenExpired(token)) {
    // If we're already on the login page, don't redirect again.
    if (location.pathname === paths.auth.login.path) {
      return null;
    }
    return <Navigate to={paths.auth.login.getHref()} replace />;
  }

  return <>{children}</>;
};
