/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Grid,
  Pagination,
  Stack,
} from "@mui/material";
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
  const [hashtag, setHashtag] = useState("");
  const [hashtagCnt, setHashtagCnt] = useState(0);
  const [unselected, setUnselected] = useState(false);

  const mounted = useRef(false);

  const checkedChange = (e) => {
    setChecked(e.target.checked);
  };

  const inputwordChange = (e) => {
    setInputword(e.target.value);
  };

  const searchBtn = (e) => {
    e.preventDefault();
    setKeyword(inputword);
    setHashtag(hashtag);
    dispatch(getStudyList([page - 1, checked, keyword, hashtag]));
  };

  const pageChange = (e, value) => {
    setPage(value);
  };

  const toStudyCreation = () => {
    navigate(`/study/create`);
  };

  const getHashtag = (valueArr) => {
    console.log("넘어오는 해시태그 밸류", hashtagCnt);
    if (valueArr[0].length < 4 && valueArr[1]) {
      setHashtag(valueArr[0]);
    } else if (valueArr[0].length >= 4 && valueArr[1]) {
      alert("3개 이하로 선택해주세요!");
    } else if (!valueArr[1]) {
      setHashtagCnt(hashtagCnt - 1);
    }

    // if (!hashtag.includes(value) && hashtag.length < 3) {
    //   console.log("해시태그에 밸류 없을 때 ", hashtag, value);
    //   setHashtag(value);
    //   setUnselected(false);
    // } else {
    //   console.log("해시태그에 밸류 있을 때 ", hashtag, value);

    //   setHashtag(value);
    //   setUnselected(true);
    // }
  };

  useEffect(() => {
    console.log("해시태그와 길이", hashtag, hashtagCnt);
    if (!mounted.current) {
      mounted.current = true;
    } else if (hashtagCnt >= 3 && unselected) {
      setHashtagCnt(hashtagCnt - 1);
    } else if (hashtagCnt >= 3 && !unselected) {
      alert("3개 이하로 선택해주세요!");
    } else if (unselected) {
      setHashtagCnt(hashtagCnt - 1);
    } else {
      setHashtagCnt(hashtagCnt + 1);
    }
  }, [hashtag]);

  useEffect(() => {
    dispatch(getStudyList([page - 1, checked, keyword, hashtag]));
  }, [page, checked, keyword]);

  return (
    <div className="main-page">
      <CheckValidation />
      <div className="top-header">
        <span className="font-70 font-xl search-font">
          당신에게 맞는 스터디를 검색해보세요!
        </span>
        <form className="searchbar-form">
          <input
            className="searchbar"
            type="text"
            title="Search"
            onChange={inputwordChange}
          />
          <Button type="submit" className="search-btn" onClick={searchBtn}>
            <SearchIcon className="btn-icon" sx={{ color: "rgb(0,0,0)" }} />
          </Button>
        </form>
        <SearchFilter getHashtag={getHashtag} hashtagCnt={hashtagCnt} />
      </div>
      <div className="header">
        <Grid container>
          <Grid item xs={12} md={6} className="header-grid-1">
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
          <Grid item xs={12} md={6} className="header-grid-2">
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
