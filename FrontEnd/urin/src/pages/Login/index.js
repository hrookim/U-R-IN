import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: 이미 로그인 한 유저가 접근한 경우 메인페이지로 바로 redirect

    // 로그인 과정
    setAccessToken(URLSearchParams(Document.location.search).get("token"));
    localStorage.setItem("accessToken", accessToken);
    navigate("/");
  }, []);

  return <div>로그인 중입니다</div>;
};

export default Login;
