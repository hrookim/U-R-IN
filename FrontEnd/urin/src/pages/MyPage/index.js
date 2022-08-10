import React, { useEffect, useRef, useState } from "react";
import "./index.css";

import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMemberId } from "../../store/memberSlice";
import { getMyPage } from "../../store/myPageSlice";
import CheckValidation from "../../components/CheckValidation";
import "../../assets/DesignSystem.css";

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const memberName = useSelector((state) => state.member.nickname);
  const memberId = useSelector((state) => state.member.id);
  const myPage = useSelector((state) => state.mypage);

  const [currentAllChecked, setCurrentAllChecked] = useState(false);
  const [pastAllChecked, setPastAllChecked] = useState(false);

  const mounted = useRef(false);

  useEffect(() => {
    dispatch(getMyPage([currentAllChecked, pastAllChecked]));
  }, [currentAllChecked, pastAllChecked]);

  const currentCheck = (e) => {
    if (currentAllChecked) {
      setCurrentAllChecked(false);
    } else {
      setCurrentAllChecked(true);
    }
  };

  const pastCheck = (e) => {
    if (pastAllChecked) {
      setPastAllChecked(false);
    } else {
      setPastAllChecked(true);
    }
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
            {memberName}{" "}
            {myPage.currentStudyList.length + myPage.pastStudyList.length <=
            10 ? (
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
            <Card
              key={item.id}
              className="card"
              sx={{
                borderColor: "#dedede",
                borderRadius: "20px",
                maxWidth: "500px",
                boxShadow: 0,
              }}
            >
              <Link to={`/study/${item.id}`} className="card-link">
                <CardActionArea>
                  <CardMedia
                    className="card-img"
                    component="img"
                    height="140"
                    image={`/img/study_img${item.title.length % 10}.png`}
                    alt="green iguana"
                  />
                  <CardContent
                    className="card-content"
                    sx={{ padding: "18px 4px 0 4px" }}
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
                </CardActionArea>
              </Link>
            </Card>
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
      ) : (
        <div className="more-btn">
          <Button
            sx={{ color: "#0037FA" }}
            onClick={currentCheck}
            variant="text"
          >
            접기
          </Button>
        </div>
      )}

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
            {console.log("============", item.id)}
            <Card
              key={item.id}
              className="card"
              sx={{
                border: "none",
                borderRadius: "20px",
                maxWidth: "500px",
                boxShadow: 0,
              }}
            >
              <Link to={`/study/${item.id}`} className="card-link">
                <CardActionArea>
                  <CardMedia
                    className="card-img"
                    component="img"
                    height="140"
                    image={`/img/study_img${item.title.length % 10}.png`}
                    alt="green iguana"
                  />
                  <CardContent
                    className="card-content"
                    sx={{ padding: "18px 4px 0 4px" }}
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
                </CardActionArea>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
      {myPage.totalPastStudies > 4 && !pastAllChecked ? (
        <div className="more-btn">
          <Button sx={{ color: "#0037FA" }} onClick={pastCheck} variant="text">
            펼치기
          </Button>
        </div>
      ) : (
        <div className="more-btn">
          <Button sx={{ color: "#0037FA" }} onClick={pastCheck} variant="text">
            접기
          </Button>
        </div>
      )}
    </div>
  );
};
export default MyPage;
