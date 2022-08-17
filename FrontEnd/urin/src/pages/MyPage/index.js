import React, { useEffect, useState } from "react";
import "./index.css";

import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";

import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMyPage } from "../../store/myPageSlice";
import CheckValidation from "../../components/CheckValidation";
import "../../assets/DesignSystem.css";

const MyPage = () => {
  const dispatch = useDispatch();

  const memberName = useSelector((state) => state.member.nickname);
  const myPage = useSelector((state) => state.mypage);

  const [currentAllChecked, setCurrentAllChecked] = useState(false);
  const [pastAllChecked, setPastAllChecked] = useState(false);

  useEffect(() => {
    dispatch(getMyPage({ currentAllChecked, pastAllChecked }));
  }, [currentAllChecked, pastAllChecked]);

  const currentCheck = () => {
    if (currentAllChecked) {
      setCurrentAllChecked(false);
    } else {
      setCurrentAllChecked(true);
    }
  };

  const pastCheck = () => {
    if (pastAllChecked) {
      setPastAllChecked(false);
    } else {
      setPastAllChecked(true);
    }
  };

  const openReport = (id) => {
    const screenWidth = window.screen.width * 0.75;
    const screenHeight = window.screen.height * 0.75;
    window.open(
      `${window.location.origin}/report/${id}/`,
      "Popup",
      `width=${screenWidth}px, height=${screenHeight}px`
    );
  };

  return (
    <div className="my-page">
      <CheckValidation />
      <div className="my-page-header">
        <Avatar
          className="my-page-avatar"
          sx={{ bgcolor: "#0037FA", width: "80px", height: "80px" }}
        >
          {memberName[0]}
        </Avatar>
        <div className="my-page-member">
          <p className="font-60 font-md member-name">
            {memberName}
            {myPage.totalCurrentStudies + myPage.totalPastStudies <= 10 ? (
              <WorkspacePremiumIcon
                className="medal-icon"
                sx={{ color: "#c49104" }}
              />
            ) : (
              <WorkspacePremiumIcon
                className="medal-icon"
                sx={{ color: "#b5b0a1" }}
              />
            )}
          </p>
          <p className="font-40 font-sm member-info">
            스터디 참여 이력 :&nbsp;
            {myPage.totalCurrentStudies + myPage.totalPastStudies}회
          </p>
        </div>
      </div>
      <p className="font-80 font-lg">참여 중인 스터디</p>
      <Grid container spacing={2} className="card-grid">
        {myPage.currentStudyList.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            key={item.id}
            className="card-item"
          >
            <div className="card-inner">
              <Card
                key={item.id}
                className="card-mypage"
                sx={{
                  borderStyle: "solid",
                  borderColor: "rgba(0,0,0,0.05)",
                  borderRadius: "20px",
                  maxWidth: "500px",
                  boxShadow: 0,
                }}
              >
                <Link to={`/study/${item.id}`} className="card-link">
                  <CardMedia
                    className="card-img"
                    component="img"
                    height="140"
                    image={`/img/study_img${item.title.length % 10}.png`}
                    alt="green iguana"
                  />
                  <CardContent
                    className="card-content"
                    sx={{ padding: "18px 4px 0px 4px" }}
                  >
                    <p className="font-70 font-md card-title">{item.title}</p>
                    {item.status === "RECRUITING" ? (
                      <div className="card-status">
                        <span className="font-50 font-xs card-status-recruiting">
                          {item.status}&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <span className="font-30 font-xs">
                          {item.currentMember}/{item.memberCapacity}
                        </span>
                      </div>
                    ) : (
                      <div className="card-status">
                        <span className="font-50 font-xs card-status-completed">
                          {item.status}&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <span className="font-30 font-xs">
                          {item.currentMember}/{item.memberCapacity}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Link>
              </Card>
              <Card
                key={item.id}
                className="card"
                sx={{
                  opacity: "0",
                  backgroundColor: "rgba(255,255,255,0)",
                  borderColor: "#dedede",
                  borderRadius: "20px",
                  maxWidth: "500px",
                  height: "260.5px",
                  boxShadow: 0,
                  "&:hover": {
                    opacity: "1",
                    backgroundColor: "rgba(255,255,255,0.9)",
                    borderColor: "rgba(0, 55, 250, 0.5)",
                  },
                }}
              >
                <div className="card-btn">
                  <Link to={`/study/${item.id}`} className="report-btn">
                    <Button
                      variant="contained"
                      className="btn-hover"
                      sx={{
                        borderColor: "#0037FA",
                        color: "#0037FA",
                        backgroundColor: "rgba(0, 55, 250, 0.2)",

                        height: "36px",
                        width: "200px",
                        boxShadow: "0",
                        borderRadius: "10px",

                        "&:hover": {
                          borderColor: "#0037FA",
                          color: "#0037FA",
                          backgroundColor: "rgba(0, 55, 250, 0.3)",
                          transform: "scale(1.08)",
                          transition: "all ease 0.3s",
                          boxShadow: "0",
                        },
                      }}
                    >
                      <span className="font-xs font-50">스터디 정보 보기</span>
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    className="btn-hover report-btn"
                    onClick={() => {
                      openReport(item.id);
                    }}
                    sx={{
                      borderColor: "rgba(0, 55, 250, 0.5)",
                      backgroundColor: "rgba(0, 55, 250, 0.8)",
                      color: "white",

                      height: "36px",
                      width: "200px",
                      boxShadow: "0",
                      borderRadius: "10px",
                      "&:hover": {
                        borderColor: "#0037FA",
                        color: "white",
                        backgroundColor: "rgba(0, 55, 250, 0.9)",
                        transform: "scale(1.08)",
                        transition: "all ease 0.3s",
                        boxShadow: "0",
                      },
                    }}
                  >
                    <span className="font-xs font-50">리포트 보기</span>
                  </Button>
                </div>
              </Card>
            </div>
          </Grid>
        ))}
      </Grid>
      {myPage.totalCurrentStudies > 4 && !currentAllChecked ? (
        <div className="more-btn">
          <Button
            sx={{ color: "#0037FA" }}
            onClick={currentCheck}
            variant="text"
          >
            펼치기
          </Button>
        </div>
      ) : null}
      {myPage.totalCurrentStudies > 4 && currentAllChecked ? (
        <div className="more-btn">
          <Button
            sx={{ color: "#0037FA" }}
            onClick={currentCheck}
            variant="text"
          >
            접기
          </Button>
        </div>
      ) : null}
      <p className="font-80 font-lg">지난 스터디</p>
      <Grid container spacing={2} className="card-grid">
        {myPage.pastStudyList.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            key={item.id}
            className="card-item"
          >
            <div className="card-inner">
              <Card
                key={item.id}
                className="card-mypage"
                sx={{
                  borderStyle: "solid",
                  borderColor: "rgba(0,0,0,0.05)",
                  borderRadius: "20px",
                  maxWidth: "500px",
                  boxShadow: 0,
                }}
              >
                <Link to={`/study/${item.id}`} className="card-link">
                  <CardMedia
                    className="card-img"
                    component="img"
                    height="140"
                    image={`/img/study_img${item.title.length % 10}.png`}
                    alt="green iguana"
                  />
                  <CardContent
                    className="card-content"
                    sx={{ padding: "18px 4px 0px 4px" }}
                  >
                    <p className="font-70 font-md card-title">{item.title}</p>
                    {item.status === "RECRUITING" ? (
                      <div className="card-status">
                        <span className="font-50 font-xs card-status-recruiting">
                          {item.status}&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <span className="font-30 font-xs">
                          {item.currentMember}/{item.memberCapacity}
                        </span>
                      </div>
                    ) : (
                      <div className="card-status">
                        <span className="font-50 font-xs card-status-completed">
                          {item.status}&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                        <span className="font-30 font-xs">
                          {item.currentMember}/{item.memberCapacity}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Link>
              </Card>
              <Card
                key={item.id}
                className="card"
                sx={{
                  opacity: "0",
                  backgroundColor: "rgba(255,255,255,0)",
                  borderColor: "#dedede",
                  borderRadius: "20px",
                  maxWidth: "500px",
                  height: "260.5px",
                  boxShadow: 0,
                  "&:hover": {
                    opacity: "1",
                    backgroundColor: "rgba(255,255,255,0.9)",
                    borderColor: "rgba(0, 55, 250, 0.5)",
                  },
                }}
              >
                <div className="card-btn">
                  <Link to={`/study/${item.id}`} className="report-btn">
                    <Button
                      variant="contained"
                      className="btn-hover"
                      sx={{
                        borderColor: "#0037FA",
                        color: "#0037FA",
                        backgroundColor: "rgba(0, 55, 250, 0.2)",

                        height: "36px",
                        width: "200px",
                        boxShadow: "0",
                        borderRadius: "10px",

                        "&:hover": {
                          borderColor: "#0037FA",
                          color: "#0037FA",
                          backgroundColor: "rgba(0, 55, 250, 0.3)",
                          transform: "scale(1.08)",
                          transition: "all ease 0.3s",
                          boxShadow: "0",
                        },
                      }}
                    >
                      <span className="font-xs font-50">스터디 정보 보기</span>
                    </Button>
                  </Link>
                  <Link to="/" className="report-btn">
                    <Button
                      variant="contained"
                      className="btn-hover"
                      sx={{
                        borderColor: "rgba(0, 55, 250, 0.5)",
                        backgroundColor: "rgba(0, 55, 250, 0.8)",
                        color: "white",

                        height: "36px",
                        width: "200px",
                        boxShadow: "0",
                        borderRadius: "10px",
                        "&:hover": {
                          borderColor: "#0037FA",
                          color: "white",
                          backgroundColor: "rgba(0, 55, 250, 0.9)",
                          transform: "scale(1.08)",
                          transition: "all ease 0.3s",
                          boxShadow: "0",
                        },
                      }}
                    >
                      <span className="font-xs font-50">리포트 보기</span>
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </Grid>
        ))}
      </Grid>
      {myPage.totalPastStudies > 4 && !pastAllChecked ? (
        <div className="more-btn">
          <Button sx={{ color: "#0037FA" }} onClick={pastCheck} variant="text">
            펼치기
          </Button>
        </div>
      ) : null}
      {myPage.totalPastStudies > 4 && pastAllChecked ? (
        <div className="more-btn">
          <Button sx={{ color: "#0037FA" }} onClick={pastCheck} variant="text">
            접기
          </Button>
        </div>
      ) : null}
    </div>
  );
};
export default MyPage;
