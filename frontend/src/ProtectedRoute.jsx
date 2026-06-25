
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, requiredRole }) {
  const { token, role } = useSelector((state) => state.auth);
  if (!token)
  {
    return <Navigate to="/" replace />;
  }
if (requiredRole && role !== requiredRole)
{
 return <Navigate to={role === "admin" ? "/admin" : "/dashboard"} />;
}
return children;
}

export default ProtectedRoute;