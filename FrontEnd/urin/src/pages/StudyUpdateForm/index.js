/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
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
import { getStudy, updateStudy } from "../../store/studySlice";
import CheckValidation from "../../components/CheckValidation";
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

  useEffect(() => {
    dispatch(getStudy({ studyId, navigate })).then(() => {
      const { title, notice, expirationDate, memberCapacity, dday } = study;

      if (dday === -1) {
        const formatDate = new Date();
        setForm({
          title,
          notice,
          expirationDate: moment(formatDate).format("YYYY-MM-DD"),
          memberCapacity,
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
    console.log(form);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStudy({ studyId, form, navigate }));
  };

  // popper 관련 함수
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  return (
    <div>
      <CheckValidation />
      <div className="study-update">
        <form onSubmit={onSubmit}>
          {/* 전체 컨테이너 */}
          <Grid className="container" container>
            <img
              src="/img/studyUpdate.png"
              alt="bannerImg"
              className="update-wrap-img"
            />

            {/* 스터디 이름 */}
            <Grid tem xs={12} className="create-grid-title">
              <h5 bold>스터디 이름</h5>
              <div className="update-grid-contents-title">
                &nbsp;준비 중인 기업명이나 면접의 종류 등을 포함하면 더 많은
                분들이 쉽게 찾을 수 있어요!
              </div>
            </Grid>
            <Grid tem xs={12} className="update-grid-contents">
              <FormControl className="title" fullWidth sx={{ m: 1 }}>
                <TextField
                  value={form.title}
                  autoFocus
                  required
                  id="title"
                  name="title"
                  label="Title"
                  type="text"
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
            <Grid item container tem xs={6}>
              <Grid xs={12} className="update-grid-contents">
                <h5>D-Day</h5>
                <div className="update-grid-contents-title">
                  &nbsp;스터디 마감일을 설정해주세요!
                </div>
              </Grid>
              <Grid item className="create-grid-contents">
                <DatePicker
                  disabled={disable}
                  locale={ko}
                  dateFormat="yyyy/MM/dd"
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

              <Grid item className="update-grid-contents-expired">
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
                      checked={disable}
                      onClick={handleClick}
                      onChange={() => {
                        setDisable(!disable);
                      }}
                    />
                  }
                />
              </Grid>
            </Grid>

            <Grid item tem xs={6}>
              {/* 모집 인원 */}
              <Grid className="update-grid-contents">
                <h5>모집 인원</h5>
                <div className="update-grid-contents-title">
                  &nbsp;나를 포함한 스터디 최대 인원을 설정할 수 있어요!
                </div>
              </Grid>
              <Grid className="update-grid-contents">
                <Select
                  className="capacity"
                  id="select"
                  name="memberCapacity"
                  defaultValue={2}
                  onChange={(value) => {
                    if (!value) {
                      setErrorStatement("2~4명 입력해주세요");
                    }
                    setForm({
                      ...form,
                      memberCapacity: value,
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
              <Grid className="update-grid-contents">
                <h5>공지사항</h5>
                <div className="update-grid-contents-title">
                  &nbsp;스터디원들이 알아야 할 사항들을 미리 정해주세요!
                </div>
              </Grid>
              <Grid className="update-grid-contents">
                <FormControl className="notice" fullWidth sx={{ m: 1 }}>
                  <TextField
                    value={form.notice}
                    type="text"
                    label="Notice"
                    name="공지"
                    variant="outlined"
                    multiline
                    rows={10}
                    onChange={onChange}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>

            <Grid className="update-grid-contents">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{
                  backgroundColor: "#FFB802",
                  margin: "10px",
                }}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`/study/${studyId}`}
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

export default StudyUpdateForm;
