import { useContext } from "react";
import { AuthContext } from "../auth/authContext";

function RoleRoute({ allowedRoles, children }) {
  const { isAuthenticated, user, loading} = useContext(AuthContext);

  if (loading) return <div className="p-6">Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate  to="/login" replace/>;
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized"  replace/>;
  }
  return children;
}

export default RoleRoute;