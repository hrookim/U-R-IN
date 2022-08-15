/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useState } from "react";
import "./index.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import TagIcon from "@mui/icons-material/Tag";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Pagination,
  Stack,
} from "@mui/material";
import ClickAwayListener from "@mui/base/ClickAwayListener";

import { getStudyList } from "../../store/studyListSlice";
import CheckValidation from "../../components/CheckValidation";
import SearchFilter from "../../components/SearchFilter";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const studies = useSelector((state) => state.studies);

  const [page, setPage] = useState(1);
  const [inputword, setInputword] = useState("");
  const [keyword, setKeyword] = useState("");
  const [checked, setChecked] = useState(true);
  const [hashtags, setHashtags] = useState("");

  const checkedChange = (e) => {
    setChecked(e.target.checked);
  };

  const inputwordChange = (e) => {
    setInputword(e.target.value);
  };

  const searchBtn = (e) => {
    e.preventDefault();
    setKeyword(inputword);
    setHashtags(hashtags);
    dispatch(getStudyList([page - 1, checked, keyword, hashtags]));
  };

  const pageChange = (e, value) => {
    setPage(value);
  };

  const toStudyCreation = () => {
    navigate(`/study/create`);
  };

  const getHashtags = (value) => {
    setHashtags(value);
  };

  const getOverflowed = (value2) => {
    if (value2) {
      alert("3개 이하로 선택해주세요.");
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getStudyList([page - 1, checked, keyword, hashtags]));
  }, [page, checked, keyword, hashtags]);

  return (
    <div className="main-page">
      <CheckValidation />
      <div className="top-header">
        <span className="font-70 font-xl search-font">
          당신에게 맞는 스터디를 검색해보세요!
        </span>
        <div className="search-bar-group">
          <form className="searchbar-form">
            <input
              className="searchbar"
              type="text"
              title="Search"
              onChange={inputwordChange}
            />

            <div className="search-condition">
              <ClickAwayListener onClickAway={handleClickAway}>
                <Box sx={{ position: "relative" }}>
                  <IconButton
                    variant="text"
                    onClick={handleClick}
                    className="font-30 font-xs search-icon-btn"
                    sx={{ color: "#0037FA" }}
                  >
                    <TagIcon />
                  </IconButton>
                  {open ? (
                    <Box
                      sx={{
                        position: "absolute",
                        right: "-50px",
                        border: 1,
                        padding: "15px",
                        bgcolor: "rgba(240, 240, 240, 0.7)",
                        width: "50vw",
                        borderColor: "white",
                        borderRadius: "20px",
                        boxShadow: "2",
                        zIndex: "1",
                      }}
                    >
                      <SearchFilter
                        getHashtags={getHashtags}
                        getOverflowed={getOverflowed}
                      />
                    </Box>
                  ) : null}
                </Box>
              </ClickAwayListener>

              <IconButton
                type="submit"
                className="search-btn"
                onClick={searchBtn}
              >
                <SearchIcon className="btn-icon" sx={{ color: "rgb(0,0,0)" }} />
              </IconButton>
            </div>
          </form>
        </div>
      </div>
      <div className="header">
        <Grid container>
          <Grid item xs={12} sm={6} className="header-grid-1">
            <FormControlLabel
              label="모집 중인 스터디만 보기"
              control={
                <Checkbox
                  checked={checked}
                  onChange={checkedChange}
                  inputProps={{ "aria-label": "controlled" }}
                  sx={{
                    color: "#0037FA",
                    "&.Mui-checked": { color: "#0037FA" },
                  }}
                />
              }
            />
          </Grid>
          <Grid item xs={12} sm={6} className="header-grid-2">
            <div>
              <Button
                variant="outlined"
                sx={{
                  color: "#0037FA",
                  borderColor: "#0037FA",
                  "&:hover": {
                    backgroundColor: "#0037FA",
                    color: "rgb(255,255,255)",
                  },
                }}
                onClick={toStudyCreation}
              >
                스터디 만들기
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>

      <Grid container spacing={2} className="card-grid">
        {studies.studyList.map((item) => (
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
                borderStyle: "solid",
                borderColor: "rgba(0,0,0,0.1)",
                borderRadius: "20px",
                maxWidth: "500px",
                boxShadow: 0,

                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "all ease 0.3s",
                },
              }}
            >
              <Link to={`/study/${item.id}`} className="card-link2">
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
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2}>
        <Pagination
          className="pagination"
          count={studies.totalPages}
          page={page}
          onChange={pageChange}
        />
      </Stack>
    </div>
  );
};

export default MainPage;
