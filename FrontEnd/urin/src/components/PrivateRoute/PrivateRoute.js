import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {
  const isLoggedin = !!localStorage.getItem("accessToken");
  return isLoggedin ? Component : <Navigate to="/intro" />;
};

export default PrivateRoute;
