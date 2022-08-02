import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./navbar.css";
import Avatar from "@mui/material/Avatar";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import "../../assets/DesignSystem.css";

import logoImg from "./logo_img.png";

const NavComponent = () => {
  return (
    <Navbar bg="light" expand="lg" className="navbar">
      <Container id="container">
        <img src={logoImg} alt="hello" className="title-logo" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="nav-link font-50" href="#home">
              스터디 찾기
            </Nav.Link>
            <Nav.Link className="nav-link font-50" href="#link">
              리포트 보기
            </Nav.Link>
            <Nav.Link className="nav-link font-50" href="#link">
              로고 png 새로 넣어라
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <NotificationsNoneIcon />
        <Avatar> HE </Avatar>
      </Container>
    </Navbar>
  );
};
export default NavComponent;
