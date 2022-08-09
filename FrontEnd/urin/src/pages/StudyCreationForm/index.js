/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import {
  Button,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Paper,
  Fade,
  Typography,
  Popper,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import "react-widgets/styles.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createStudy } from "../../store/studySlice";
import CheckValidation from "../../components/CheckValidation";
import { getMemberId } from "../../store/memberSlice";
import "./index.css";

const StudyCreationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    notice: "",
    expirationDate: "",
    memberCapacity: 2,
  });
  const [formDate, setFormDate] = useState(new Date());
  const [disable, setDisable] = useState(false);
  const [errorStatement, setErrorStatement] = useState("");

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

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    console.log(form);
  };
  // popper 관련 함수
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createStudy({ form, navigate }));
  };

  return (
    <div>
      <CheckValidation />
      <div className="study-create">
        <form onSubmit={onSubmit}>
          {/* 전체 컨테이너 */}
          <Grid container className="container">
            <img
              src="/img/studyCreation.png"
              alt="bannerImg"
              className="create-wrap-img"
            />
            {/* 스터디 이름 */}
            <Grid xs={12} className="create-grid-title">
              <h5 bold>스터디 이름</h5>
              <div className="create-grid-contents-title">
                &nbsp;준비 중인 기업명이나 면접의 종류 등을 포함하면 더 많은
                분들이 쉽게 찾을 수 있어요!
              </div>
            </Grid>
            <Grid tem xs={12} className="create-grid-contents">
              <FormControl className="title" fullWidth sx={{ m: 1 }}>
                <TextField
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
            </Grid>
            {/* D-Day */}
            <Grid item container tem xs={6} className="create-grid-contents">
              <Grid xs={12} className="create-grid-contents">
                <h5>D-Day</h5>
                <div className="create-grid-contents-title">
                  &nbsp;스터디 마감일을 설정해주세요!
                </div>
              </Grid>
              <Grid item className="create-grid-contents">
                <DatePicker
                  className="expired"
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
              </Grid>

              <Grid item className="create-grid-contents-expired">
                <Popper open={open} anchorEl={anchorEl} transition>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Paper>
                        <Typography sx={{ p: 2 }}>
                          &apos;종료일 없음&apos;으로 설정할 경우 한달 간 미활성
                          시 자동으로 스터디가 종료돼요!
                        </Typography>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
                <FormControlLabel
                  label="종료일 없음"
                  control={
                    <Checkbox
                      onClick={handleClick}
                      onChange={() => {
                        setDisable(!disable);
                      }}
                    />
                  }
                />
              </Grid>
            </Grid>
            <Grid item tem xs={6} className="create-grid-contents">
              {/* 모집 인원 */}
              <Grid className="create-grid-contents">
                <h5>모집 인원</h5>
                <div className="create-grid-contents-title">
                  &nbsp;나를 포함한 스터디 최대 인원을 설정할 수 있어요!
                </div>
              </Grid>
              <Grid className="create-grid-contents">
                <Select
                  className="capacity"
                  id="select"
                  name="memberCapacity"
                  defaultValue={2}
                  onChange={(value) => {
                    if (!value.target.value) {
                      setErrorStatement("2~4명 입력해주세요");
                    }
                    setForm({
                      ...form,
                      memberCapacity: value.target.value,
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

            {/* 공지사항 */}
            <Grid tem xs={12}>
              <Grid className="create-grid-contents">
                <h5>공지사항</h5>
                <div className="create-grid-contents-title">
                  &nbsp;스터디원들이 알아야 할 사항들을 미리 정해주세요!
                </div>
              </Grid>
              <Grid className="create-grid-contents">
                <FormControl className="notice" fullWidth sx={{ m: 1 }}>
                  <TextField
                    // style={{ width: "400px", margin: "5px" }}
                    type="text"
                    label="공지"
                    name="notice"
                    variant="outlined"
                    multiline
                    rows={15}
                    onChange={onChange}
                    required
                    defaultValue="공지를 입력하세요"
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid className="create-grid-contents">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{
                  backgroundColor: "blue",
                  margin: "10px",
                }}
              >
                Submit
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
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default StudyCreationForm;
