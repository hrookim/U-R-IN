import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemeberId } from "../../store/memberSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = new URLSearchParams(document.location.search).get("token");
    // Params 없이 들어왔을 경우
    if (token) {
      localStorage.setItem("accessToken", token);
      (async () => {
        await dispatch(getMemeberId());
        navigate("/");
      })();
    } else {
      navigate("/intro");
    }
  });

  return <div>로그인 중입니다</div>;
};

export default Login;
