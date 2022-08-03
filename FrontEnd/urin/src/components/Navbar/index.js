import React, { useState, useEffect } from "react";
import "./index.css";
import "../../assets/DesignSystem.css";

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
  const [token, setToken] = useState(localStorage.getItem("access_token"));

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
    <Navbar bg="light" expand="lg" className="navbar">
      <Container id="container">
        <img src={logoImg} alt="hello" className="title-logo" />
        <div className="nav-right">
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="nav-link font-50 font-md" href="#home">
                스터디 찾기
              </Nav.Link>
              <Nav.Link className="nav-link font-50 font-md" href="#link">
                리포트 보기
              </Nav.Link>
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
                  <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
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
                <Avatar /> 000님 안녕하세요!
              </MenuItem>
              <Divider />
              <MenuItem>어떠한 정보 스터디 참여횟수랄지</MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>{" "}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </div>
      </Container>
    </Navbar>
  );
};
export default NavComponent;
