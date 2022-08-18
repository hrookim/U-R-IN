import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkValidation } from "../../store/checkValidationSlice";
import { getMemberId } from "../../store/memberSlice";

const CheckValidation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const memberId = useSelector((state) => state.member.id);

  useEffect(() => {
    dispatch(getMemberId(navigate)).then(() => {
      dispatch(checkValidation(memberId, navigate));
    });
  }, []);

  return <div></div>;
};

export default CheckValidation;
