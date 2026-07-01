import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  const userRole =
    localStorage.getItem("role");

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (role) {

    if (Array.isArray(role)) {

      if (!role.includes(userRole)) {
        return <Navigate to="/" replace />;
      }

    } else {

      if (userRole !== role) {
        return <Navigate to="/" replace />;
      }

    }

  }

  return children;
}

export default ProtectedRoute;