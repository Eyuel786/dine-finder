import { Navigate } from "react-router-dom";
import User from "../types/User";

interface ProtectedRouteProps {
  children: JSX.Element;
  user: User;
  redirectTo?: string;
}

export default function ProtectedRoute({
  children,
  user,
  redirectTo = "/signin",
}: ProtectedRouteProps): JSX.Element {
  if (!user.token) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
