import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 서버에 로그아웃 요청
    // 성공하면 localStorage를 비우고 랜딩페이지로 이동
    axiosInstance
      .get(`auth/logout`)
      .then(() => {
        localStorage.clear();
        navigate("/intro");
      })
      .catch(() => {
        navigate("/");
      });
  });
  return <div>로그아웃 중입니다</div>;
};

export default Logout;
