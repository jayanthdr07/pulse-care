import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


function RoleRoute({ allowedRoles, children }) {
  const { user, loading} = useAuth();

  if (loading) {
    return <div className="p-6">Loading...</div>;

  }

  // not logged in -> go to role select
  if (!user) {
    return <Navigate to="/role-select" replace/>;
  }
 
  // logged in but wrong role -> unauthorized page

 if (allowedRoles && !allowedRoles.includes(user.role)) {
  return <Navigate to="/unauthorized" replace/>;
 }
  
  return children;
}

export default RoleRoute;