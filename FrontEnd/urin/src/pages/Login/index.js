import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const token = new URLSearchParams(document.location.search).get("token");
  // Params 없이 들어왔을 경우
  if (token) {
    localStorage.setItem("accessToken", token);
  }
  // TODO: memberMe로 API 요청받으면 현재 User잡을 수 있음
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  });

  return <div>로그인 중입니다</div>;
};

export default Login;
