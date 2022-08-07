import React, { useEffect, useRef } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { checkValidation } from "../../store/checkValidationSlice";
import { getMemberId } from "../../store/memberSlice";

const NotFound = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
    <div className="not-found">
      <img src="/img/not_found_img.png" alt="Not Found" />
    </div>
  );
};

export default NotFound;
