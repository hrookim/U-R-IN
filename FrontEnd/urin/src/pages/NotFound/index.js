import React, { useRef, useEffect, useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkValidation } from "../../store/checkValidationSlice";
import { getMemberId } from "../../store/memberSlice";
import "../../assets/DesignSystem.css";

const NotFound = () => {
  console.log("======================================최상단");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [second, setSecond] = useState(3);
  const memberId = useSelector((state) => state.member.id);
  const mounted = useRef(false);

  useEffect(() => {
    dispatch(getMemberId(navigate));
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      dispatch(checkValidation(memberId, navigate));
    }
  }, [memberId]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecond(second - 1);
      console.log("남은 시간", second);
    }, 1000);
    setTimeout(() => clearInterval(countdown), 2900);
  }, [second]);

  setTimeout(() => navigate("/"), 3000);

  return (
    <div className="not-found">
      <p className="font-60 font-xl">
        {console.log(second, "여기는 리턴문 안")}
        {second}초 뒤에 메인페이지로 전환됩니다.
      </p>

      <img src="/img/not_found_img.png" alt="Not Found" />
    </div>
  );
};

export default NotFound;
