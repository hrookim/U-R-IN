import React from "react";
import Button from "@mui/material/Button";

import NavComponent from "../../components/Navbar";

import "../../assets/DesignSystem.css";

const LandingPage = () => {
  const onClick = () => {
    window.location.href = process.env.REACT_APP_SOCIAL_LOGIN_URL;
  };

  return (
    <div>
      <NavComponent />
      <p className="font-80 font-xl">면접을 위한 새로운 경험</p>
      <p className="font-80 font-xl">IMG(오픈비두 완성되면 그 화면 캡쳐)</p>
      <p className="font-40 font-sm">
        UR IN은 비대면 시대에 맞춰 AI를 활용하여 면접을 준비할 수 있도록 돕는
        화상 면접 스터디 솔루션입니다. UR IN은 비대면 시대에 맞춰 AI를 활용하여
        면접을 준비할 수 있도록 돕는 화상 면접 스터디 솔루션입니다.
      </p>

      {/* 카카오로그인 버튼 */}
      <Button
        onClick={onClick}
        type="button"
        variant="contained"
        className="bgcolor-main btn-hover btn-radius font-50 font-sm btn-text-shadow"
      >
        시작하기
      </Button>

      <p className="font-80 font-lg">면접을 위한 새로운 경험</p>
      <p className="font-80 font-lg">
        IMG(태블릿, 모바일 등 반응형 화면 캐러셀)
      </p>
      <p className="font-40 font-md">
        UR IN은 비대면 시대에 맞춰 AI를 활용하여 면접을 준비할 수 있도록 돕는
        화상 면접 스터디 솔루션입니다.
      </p>
    </div>
  );
};

export default LandingPage;
