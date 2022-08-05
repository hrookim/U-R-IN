import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ authenticated, component: Component }) => {
  const isLoggedin = !!localStorage.getItem("accessToken");
  return isLoggedin ? <Navigate to="/" /> : Component;
};

export default PublicRoute;
