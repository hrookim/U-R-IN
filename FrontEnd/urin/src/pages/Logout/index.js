import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 서버에 로그아웃 요청
    logout();

    // localStorage를 비우고 랜딩페이지로 이동
    localStorage.clear();
    navigate("/intro");
  }, []);
  return <div>로그아웃 중입니다</div>;
};

export default Logout;
