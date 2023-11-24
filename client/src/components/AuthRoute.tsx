import { Navigate } from "react-router-dom";
import User from "../types/User";

interface AuthRouteProps {
  children: JSX.Element;
  user: User;
}

export default function AuthRoute({ children, user }: AuthRouteProps) {
  if (user.token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
