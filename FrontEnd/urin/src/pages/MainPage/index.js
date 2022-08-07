/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useRef } from "react";
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
import Footer from "../../components/Footer";
import { getStudyList } from "../../store/studyListSlice";
import { checkValidation } from "../../store/checkValidationSlice";
import { getMemberId } from "../../store/memberSlice";

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const memberId = useSelector((state) => state.member.id);
  const studies = useSelector((state) => state.studies);
  const mounted = useRef(false);

  const [page, setPage] = React.useState(1);
  const [inputword, setInputword] = React.useState("");
  const [keyword, setKeyword] = React.useState("");

  const [checked, setChecked] = React.useState(true);

  const checkedChange = (e) => {
    setChecked(e.target.checked);
  };

  const inputwordChange = (e) => {
    setInputword(e.target.value);
  };

  const keywordChange = (e) => {
    e.preventDefault();
    setKeyword(inputword);
  };

  const pageChange = (e, value) => {
    setPage(value);
  };

  const toStudyCreation = () => {
    navigate(`/study/create`);
  };

  useEffect(() => {
    dispatch(getMemberId(navigate));
    dispatch(getStudyList([page - 1, checked, keyword]));
  }, [page, checked, keyword]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      dispatch(checkValidation(memberId, navigate));
    }
  }, [memberId]);

  return (
    <div>
      <div className="header">
        <div>
          <form className="searchbar-form">
            <input
              className="searchbar"
              type="text"
              title="Search"
              onChange={inputwordChange}
            />
            <Button type="submit" className="btn" onClick={keywordChange}>
              <SearchIcon className="btn-icon" />
            </Button>
          </form>
          <FormControlLabel
            label="모집 중인 스터디만 보기"
            control={
              <Checkbox
                checked={checked}
                onChange={checkedChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
          />
        </div>
        <div>
          <Button variant="outlined" onClick={toStudyCreation}>
            스터디 만들기
          </Button>
        </div>
      </div>
      <Grid container spacing={2}>
        {studies.studyList.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card
              key={item.id}
              className="card"
              sx={{ border: "none", boxShadow: "1", borderRadius: "20px" }}
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
                  <CardContent>
                    <p className="font-70 font-md card-title">{item.title}</p>
                    <p className="font-30 font-xs card-status">
                      {item.status}&nbsp;&nbsp;&nbsp;&nbsp;{item.currentMember}{" "}
                      / {item.memberCapacity}
                    </p>
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
