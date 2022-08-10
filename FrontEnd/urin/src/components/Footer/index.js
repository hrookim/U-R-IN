import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import "../../assets/DesignSystem.css";

import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading font-sm font-70">
          새로운 면접스터디 플랫폼을 경험해보세요!
        </p>
        <p className="footer-subscription-text font-xs font-30">
          With UR In, You are in.
        </p>
      </section>

      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              <img src="/img/logo_img.png" alt="logo" className="logo-img" />
            </Link>
          </div>
          <small className="website-rights font-xs font-30">
            SSAFY 공통프로젝트 서울 5반 © 2022
          </small>
          <div className="social-icons">
            <Link
              className="social-icon-link github"
              to="/"
              target="_blank"
              aria-label="Github"
            >
              <GitHubIcon className="social-icon-item" />
            </Link>
            <Link
              className="social-icon-link youtube"
              to="/"
              target="_blank"
              aria-label="Youtube"
            >
              <YouTubeIcon className="social-icon-item" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
