import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ authenticated, component: Component }) => {
  return authenticated ? Component : <Navigate to="/intro" />;
  // 생각해보니까 Navigate여서 새로 렌더링 되는게 아니라서 오류가 나는듯????
};

export default PrivateRoute;
