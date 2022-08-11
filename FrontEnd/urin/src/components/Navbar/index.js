import React, { useState, useEffect } from "react";
import "./index.css";
import "../../assets/DesignSystem.css";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Container, Nav, Navbar } from "react-bootstrap/";
import {
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import { NotificationsNone, Logout } from "@mui/icons-material/";

import logoImg from "../../assets/images/logo_img.png";

const NavComponent = () => {
  const location = useLocation();

  const [token, setToken] = useState(localStorage.getItem("access_token"));

  const memberName = useSelector((state) => state.member.nickname);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
  }, [token]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {!["/intro"].includes(location.pathname) ? (
        <Navbar bg="light" expand="lg" className="navbar">
          <Container id="container">
            <a href="http://localhost:3000/">
              <img src={logoImg} alt="hello" className="title-logo" />
            </a>
            <div className="nav-right">
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Link className="nav-link font-50 font-md" to="/">
                    스터디 찾기
                  </Link>
                  <Link className="nav-link font-50 font-md" to="/mypage">
                    마이페이지
                  </Link>
                </Nav>
              </Navbar.Collapse>
              <NotificationsNone />
              <div>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2, mr: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar sx={{ bgcolor: "#0037FA" }}>
                        {memberName[0]}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "visible",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem>
                    <b className="font-50 font-md">{memberName}&nbsp;</b>
                    <span className="font-30">님 안녕하세요!</span>
                  </MenuItem>
                  <Divider />
                  <Link to="/logout" className="btn-logout">
                    <MenuItem>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Link>
                </Menu>
              </div>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </div>
          </Container>
        </Navbar>
      ) : null}
    </div>
  );
};
export default NavComponent;
