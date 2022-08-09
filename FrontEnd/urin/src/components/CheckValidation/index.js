import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkValidation } from "../../store/checkValidationSlice";
import { getMemberId } from "../../store/memberSlice";

const CheckValidation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const memberId = useSelector((state) => state.member.id);
  const mounted = useRef(false);

  useEffect(() => {
    console.log("컴포넌트 안 id");
    dispatch(getMemberId(navigate));
  }, []);

  useEffect(() => {
    console.log("컴포넌트 안 validation");
    if (!mounted.current && !memberId) {
      mounted.current = true;
    } else {
      dispatch(checkValidation(memberId, navigate));
    }
  }, [memberId]);

  return <div>{console.log("컴포넌트")}</div>;
};

export default CheckValidation;
