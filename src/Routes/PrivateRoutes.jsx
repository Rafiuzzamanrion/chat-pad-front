
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProviders";


const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
 
  if (loading) {
    return (
      <div className="min-h-screen min-w-full">
        <span className="loading loading-spinner loading-lg"></span>
        <span className="loading loading-spinner loading-lg"></span>
        <span className="loading loading-spinner loading-lg"></span>
        <span className="loading loading-spinner loading-lg"></span>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (user) {
    return children;
  } else
    return (
      <Navigate to={"/login"}></Navigate>
    );
};

export default PrivateRoutes;
