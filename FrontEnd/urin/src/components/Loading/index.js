import React from "react";
import styled from "styled-components";
import Spinner from "../../assets/images/loading_spinner.gif";
import Logo from "../../assets/images/logo_loading_spinner.png";
import "./index.css";

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #ffffff;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingSpinner = () => {
  return (
    <Background>
      <div className="font-xxl font-70 loading-box">
        <div className="loading-with">With</div>
        <img src={Logo} alt="logo" id="loading-logo" />
        <div>, You&apos;re in</div>
      </div>
      <img src={Spinner} alt="loading_spinner" />
    </Background>
  );
};

export default LoadingSpinner;
