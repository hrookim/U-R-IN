import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkValidation } from "../../store/checkValidationSlice";
import { getMemberId } from "../../store/memberSlice";
import "../../assets/DesignSystem.css";
import "./index.css";

const NotFound = () => {
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
    }, 1000);
    setTimeout(() => clearInterval(countdown), 2900);
  }, [second]);

  setTimeout(() => navigate("/"), 3000);

  return (
    <div className="not-found">
      <div className="countdown-div">
        <p className="font-60 font-xl countdown-p">
          {second}초 뒤에 메인페이지로 전환됩니다.
        </p>
      </div>

      <img src="/img/not_found_img.png" alt="Not Found" className="img-404" />
    </div>
  );
};

export default NotFound;
