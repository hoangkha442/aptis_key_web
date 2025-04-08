import { JSX } from "react";
import { Navigate } from "react-router-dom";
import { userLocalStorage } from "../config/userLocal";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  
  const isLoggedIn = !!userLocalStorage.get()?.token;

  return isLoggedIn ? element : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
