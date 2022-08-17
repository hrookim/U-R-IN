/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Fade,
  Typography,
  Popper,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import "react-widgets/styles.css";
import { getStudy, leaveStudy, updateStudy } from "../../store/studySlice";
import CheckValidation from "../../components/CheckValidation";
import StudyUpdateTag from "../../components/StudyUpdateTag";
import "./index.css";

const StudyUpdateForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { studyId } = useParams();

  const study = useSelector((state) => state.study);

  const [form, setForm] = useState({
    title: "",
    notice: "",
    expirationDate: "",
    memberCapacity: "",
    hashtags: "",
  });
  const [formDate, setFormDate] = useState(new Date());
  const [disable, setDisable] = useState(false);
  const [errorStatement, setErrorStatement] = useState("");
  const [deletedMembers, setDeletedMembers] = useState([]);

  // popper관련
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (disable) {
      setForm({
        ...form,
        expirationDate: null,
      });
    } else {
      setForm({
        ...form,
        expirationDate: moment(formDate).format("YYYY-MM-DD"),
      });
    }
  }, [disable]);

  useEffect(() => {
    dispatch(getStudy({ studyId, navigate })).then(() => {
      const {
        title,
        notice,
        expirationDate,
        memberCapacity,
        dday,
        hashtagCodes,
      } = study;

      if (dday === -1) {
        const formatDate = new Date();
        setForm({
          title,
          notice,
          expirationDate: moment(formatDate).format("YYYY-MM-DD"),
          memberCapacity,
          hashtags: hashtagCodes,
        });
        setFormDate(formatDate);
        setDisable(true);
      } else {
        const formatDate = new Date(expirationDate);
        setForm({
          title,
          notice,
          expirationDate: moment(formatDate).format("YYYY-MM-DD"),
          memberCapacity,
          hashtags: hashtagCodes,
        });
        setFormDate(formatDate);
      }
    });
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("form", "newHashtags", form);
    if (form.hashtags) {
      dispatch(updateStudy({ studyId, form, navigate }));

      for (let i = 0; i < deletedMembers.length; i += 1) {
        const deletedParticipantId = deletedMembers[i];
        dispatch(leaveStudy({ studyId, deletedParticipantId }));
      }
    } else {
      alert("1개 이상 선택해주세요!");
    }
  };

  const getHashtags = (value) => {
    if (value) {
      setForm({
        ...form,
        hashtags: value,
      });
    }
  };

  const getOverflowed = (value2) => {
    if (value2) {
      alert("3개 이하로 선택해주세요.");
    }
  };

  // popper 관련 함수
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const onClickLeave = (memberId) => {
    alert("수정하기 버튼을 눌러야 탈퇴 내역이 최종 반영됩니다!");
    console.log(memberId);
    setDeletedMembers(...deletedMembers, [memberId]);
    console.log(deletedMembers);

    // dispatch(leaveStudy([studyId, memberId])).then(() => {
    //   setIsChanged(true);
    //   setInterval(() => setIsChanged(false), 100);
    // });
  };

  const onClickInclude = (memberId) => {
    alert("탈퇴 목록에서 제외되었습니다!");
    console.log(memberId);
    setDeletedMembers(deletedMembers.filter((element) => element !== memberId));

    // dispatch(leaveStudy([studyId, memberId])).then(() => {
    //   setIsChanged(true);
    //   setInterval(() => setIsChanged(false), 100);
    // });
  };

  return (
    <div>
      <CheckValidation />
      <div className="study-create">
        <form onSubmit={onSubmit}>
          <div className="title-banner">
            <img
              src="/img/studyUpdate.png"
              alt="bannerImg"
              className="create-wrap-img"
            />
            <div className="title-banner-title">
              <p className="font-lg font-70 title-banner-text1">
                스터디 정보 수정하기
              </p>
              <p className="font-sm font-30 title-banner-text2">
                여러분의 면접 스터디에 맞게 더 멋진 스터디로 꾸며보세요.
              </p>
            </div>
          </div>
          <div className="content-title">
            <p className="font-lg font-70">스터디 이름</p>
            <p className="create-grid-contents-title font-30 font-sm">
              &nbsp;&nbsp;&nbsp;준비 중인 기업명이나 면접의 종류 등을 포함하면
              더 많은 분들이 쉽게 찾을 수 있어요!
            </p>
          </div>
          <FormControl className="title" fullWidth sx={{ m: 1 }}>
            <TextField
              value={form.title}
              fullwidth
              autoFocus
              required
              id="title"
              name="title"
              type="text"
              label="스터디 이름"
              error={form.title.length < 3 || form.title.length > 50}
              helperText={
                form.title.length < 3 || form.title.length > 50
                  ? "3~50자 스터디명을 입력하세요"
                  : ""
              }
              onChange={onChange}
            />
          </FormControl>
          <Grid container>
            <Grid item xs={12} md={6}>
              <div className="content-title-group">
                <p className="font-lg font-60">D-Day</p>
                <p className="create-grid-contents-title font-30 font-sm">
                  &nbsp;&nbsp;&nbsp;스터디 마감일 지정해주세요!
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ margin: "5px" }}>
                  <DatePicker
                    className="expired date-picker"
                    disabled={disable}
                    locale={ko}
                    dateFormat="yyyy년 MM월 dd일"
                    minDate={moment().toDate()}
                    selected={formDate}
                    onChange={(date) => {
                      setFormDate(date);
                      setForm({
                        ...form,
                        expirationDate: moment(date).format("YYYY-MM-DD"),
                      });
                    }}
                    required
                  />
                </div>
                <Popper open={open} anchorEl={anchorEl} transition>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={200}>
                      <Paper>
                        <Typography sx={{ p: 2 }}>
                          종료일 없음으로 설정하면
                          <br /> 한달 간 미활성 시 <br />
                          자동으로 스터디가 종료돼요!
                        </Typography>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
                <FormControlLabel
                  label="종료일 없음"
                  sx={{ marginLeft: "5px" }}
                  control={
                    <Checkbox
                      sx={{
                        "&.Mui-checked": { color: "#0037FA" },
                      }}
                      onMouseOver={handleClick}
                      onMouseLeave={handleClick}
                      onChange={() => {
                        setDisable(!disable);
                      }}
                    />
                  }
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="content-title-group">
                <p className="font-lg font-70">모집 인원</p>
                <p className="create-grid-contents-title font-30 font-sm">
                  &nbsp;&nbsp;&nbsp;나를 포함한 스터디 최대 인원을 설정할 수
                  있어요!
                </p>
              </div>
              <Select
                key={form.memberCapacity}
                className="capacity"
                id="select"
                name="memberCapacity"
                sx={{ m: 1 }}
                defaultValue={form.memberCapacity}
                label="인원"
                onChange={(event) => {
                  if (!event.target.value) {
                    setErrorStatement("2~4명 입력해주세요");
                  }
                  setForm({
                    ...form,
                    memberCapacity: event.target.value,
                  });
                }}
              >
                <MenuItem value={2}>2명</MenuItem>
                <MenuItem value={3}>3명</MenuItem>
                <MenuItem value={4}>4명</MenuItem>
              </Select>
              <small>{errorStatement}</small>{" "}
            </Grid>
          </Grid>
          <div className="content-title-group">
            <p className="font-lg font-70">스터디원</p>
            <p className="create-grid-contents-title font-30 font-sm">
              &nbsp;&nbsp;&nbsp;여러분과 함께하는 스터디원을 관리하세요!
            </p>
          </div>
          <div className="member-control">
            {study.participants.map((participant) => (
              <div
                key={participant.id}
                className="member-info"
                style={{ margin: "0 0 15px 0" }}
              >
                {deletedMembers.includes(participant.id) ? (
                  <Avatar
                    sx={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: "rgba(0,0,0,0.3);",
                    }}
                  >
                    {" "}
                    {participant.nickname[0]}
                  </Avatar>
                ) : (
                  <Avatar
                    sx={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: "#0037FA",
                    }}
                  >
                    {" "}
                    {participant.nickname[0]}
                  </Avatar>
                )}

                {deletedMembers.includes(participant.id) ? (
                  <span className="member-disabled">
                    {participant.nickname}
                  </span>
                ) : (
                  <span>{participant.nickname}</span>
                )}

                {participant.isLeader && (
                  <FontAwesomeIcon
                    icon={faCrown}
                    style={{ margin: "0 0 0 8px" }}
                  />
                )}
                {console.log(
                  !deletedMembers.includes(participant.id),
                  participant.id,
                  deletedMembers
                )}
                {!participant.isLeader &&
                study.status != "TERMINATED" &&
                !deletedMembers.includes(participant.id) ? (
                  <IconButton onClick={() => onClickLeave(participant.id)}>
                    <RemoveCircleOutlineIcon
                      sx={{ fontSize: "small", color: "#f44336" }}
                    />
                  </IconButton>
                ) : null}

                {!participant.isLeader &&
                study.status != "TERMINATED" &&
                deletedMembers.includes(participant.id) ? (
                  <IconButton onClick={() => onClickInclude(participant.id)}>
                    <AddCircleOutlineIcon
                      sx={{ fontSize: "small", color: "rgba(0,0,0,0.8)" }}
                    />
                  </IconButton>
                ) : null}
              </div>
            ))}
          </div>
          <div className="content-title-group">
            <p className="font-lg font-70">공지사항</p>
            <p className="create-grid-contents-title font-30 font-sm">
              &nbsp;&nbsp;&nbsp;스터디원들이 알아야 할 사항들을 미리 적어주세요!
            </p>
          </div>
          <FormControl className="notice" fullWidth sx={{ m: 1 }}>
            <TextField
              // style={{ width: "400px", margin: "5px" }}
              value={form.notice}
              type="text"
              label="공지"
              name="notice"
              variant="outlined"
              multiline
              rows={15}
              onChange={onChange}
              required
            />
          </FormControl>
          <div className="content-title-group">
            <p className="font-lg font-70">태그</p>
            <p className="create-grid-contents-title font-30 font-sm">
              &nbsp;&nbsp;&nbsp;다른 스터디원들이 쉽게 검색할 수 있도록 태그를
              설정해보세요! (최대 3개까지 가능)
            </p>
          </div>
          <FormControl className="title" fullWidth sx={{ m: 1 }}>
            <StudyUpdateTag
              getHashtags={getHashtags}
              getOverflowed={getOverflowed}
              oldHashtags={form.hashtags}
            />
          </FormControl>
          <div className="btns">
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "rgb(255, 184, 2)",
                margin: "10px",
                "&:hover": { backgroundColor: "rgb(255, 184, 2)" },
              }}
            >
              수정하기
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/"
              style={{
                backgroundColor: "gray",
                margin: "10px",
              }}
            >
              취소
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudyUpdateForm;
