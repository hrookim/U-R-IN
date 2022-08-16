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
      element.querySelector(".img1"),
      {
        x: "-50vw",
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: element.querySelector(".img-group"),
          start: "top center",
          end: "bottom bottom",
          markers: true,
          scrub: 5,
        },
      }
    );
    gsap.fromTo(
      element.querySelector(".img2"),
      {
        x: "50vw",
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: element.querySelector(".img-group"),
          start: "top center",
          end: "bottom bottom",
          markers: true,
          scrub: 2,
        },
      }
    );
    gsap.fromTo(
      element.querySelector(".img3"),
      {
        x: "50vw",
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: element.querySelector(".img-group"),
          start: "top top",
          end: "bottom bottom",
          markers: true,
          scrub: 2,
          duration: 5,
        },
      }
    );
    gsap.fromTo(
      element.querySelector(".img-text"),
      {
        x: "-50vw",
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: element.querySelector(".img-group"),
          start: "top top",
          end: "bottom bottom",
          markers: true,
          scrub: 2,
        },
      }
    );
  });
  return (
    <div ref={ref}>
      <div>
        <img
          src={`${process.env.PUBLIC_URL}img/logo_img.png`}
          alt="hello"
          className="title-logo"
        />
      </div>
      <div className="landingpage-body">
        <p className="font-70 centered main-text">
          면접스터디를 위한 새로운 솔루션
        </p>
        <span className="font-30 font-sm main-text2">
          UR IN은 면접스터디를 찾아 헤메는 취준생 여러분을 위한 최상의
          면접스터디 플랫폼입니다. 면접스터디의 효율을 극대화시켜줄 화상
          서비스부터 AI 리포트까지 제공해드리겠습니다.
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
          {console.log(process.env.PUBLIC_URL)}
          <img
            src={`${process.env.PUBLIC_URL}img/landingpage-img4.png`}
            alt="img4"
            className="img4"
          />

          <div className="img-group">
            <img
              className="img1 test"
              src={`${process.env.PUBLIC_URL}img/landingpage-img1.png`}
              alt="landingpage-img1"
            />
            <img
              className="img2"
              src={`${process.env.PUBLIC_URL}img/landingpage-img2.png`}
              alt="landingpage-img2"
            />
            <img
              className="img3"
              src={`${process.env.PUBLIC_URL}img/landingpage-img3.png`}
              alt="landingpage-img3"
            />
            <div className="img-text">
              <p className="font-60 main-text">
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
          <div className="img-group2">
            <img
              className="img5"
              src={`${process.env.PUBLIC_URL}img/landingpage-img5.png`}
              alt="landingpage-img5"
            />
            <div className="img-text">
              <p className="font-60">
                여러분에게 필요한 스터디원을 찾아보세요.
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
    </div>
  );
};

export default LandingPage;
