import React, { useEffect, useRef } from "react";
import Button from "@mui/material/Button";

import "../../assets/DesignSystem.css";
import "./index.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LandingPage = () => {
  gsap.registerPlugin(ScrollTrigger);

  const onClick = () => {
    window.location.href = process.env.REACT_APP_SOCIAL_LOGIN_URL;
  };

  const btnSX = {
    background: "linear-gradient( to left, #0037FA, #02BDFF )",
    borderRadius: "20px",
    width: "100px",
  };

  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    gsap.fromTo(
      element.querySelector(".test"),
      {
        opacity: 0,
      },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: element.querySelector(".test"),
          start: "top top",
          end: "bottom center",
          markers: true,
          scrub: true,
        },
      }
    );
  });
  return (
    <div ref={ref}>
      <div>
        <img src="/img/logo_img.png" alt="hello" className="title-logo" />
      </div>
      <div className="landingpage-body">
        <p className="font-70 font-xl centered main-text">
          면접스터디를 위한 새로운 솔루션
        </p>
        <span className="font-30 font-sm main-text2">
          UR IN은 면접스터디를 찾아 헤메는 취준생 여러분을 위해 제공되는 최상의
          면접스터디 플랫폼입니다. 이 서비스는 면접스터디의 효율을 극대화시켜줄
          화상 서비스부터 AI 레포트까지 제공합니다.
        </span>
        {/* 카카오로그인 버튼 */}
        <div className="centered">
          <div>
            <Button
              onClick={onClick}
              type="button"
              variant="contained"
              className="font-50 font-sm btn-text-shadow"
              sx={btnSX}
            >
              시작하기
            </Button>
          </div>

          <img src="/img/landingpage-img4.png" alt="img4" className="img4" />

          <div className="img-group mother">
            <img
              className="img1 test"
              src="/img/landingpage-img1.png"
              alt="landingpage-img1"
            />
            <img
              className="img2"
              src="/img/landingpage-img2.png"
              alt="landingpage-img2"
            />
            <img
              className="img3"
              src="/img/landingpage-img3.png"
              alt="landingpage-img3"
            />
            <p className="font-60 font-xl">
              취업으로 가는 길, 새로운 경험을 해보세요!
            </p>
            <Button
              onClick={onClick}
              type="button"
              variant="contained"
              className="font-50 font-sm btn-text-shadow"
              sx={btnSX}
            >
              시작하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
