import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../assets/DesignSystem.css";
import "./index.css";
import CheckValidation from "../../components/CheckValidation";

const NotFound = () => {
  const navigate = useNavigate();

  const [second, setSecond] = useState(3);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecond(second - 1);
    }, 1000);
    setTimeout(() => clearInterval(countdown), 2900);
  }, [second]);

  setTimeout(() => navigate("/"), 3000);

  return (
    <div className="not-found">
      <CheckValidation />
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
