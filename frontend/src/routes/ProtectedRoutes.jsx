
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

 if (loading) return null;

 if (!user) {
  return <Navigate to="/role-select" replace/>;
 }

 if (allowedRoles && !allowedRoles.includes(user.role)) {
  return <Navigate to="/unauthorized" replace/>;
 }
  return children;
}

export default ProtectedRoutes;