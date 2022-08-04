/* eslint-disable react/jsx-props-no-spreading */

<<<<<<< HEAD
import React, { useEffect, useRef } from "react";
=======
import React, { useEffect } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
>>>>>>> frontend

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import SearchIcon from "@mui/icons-material/Search";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import { getStudyList } from "../../store/studyListSlice";
import { checkValidation } from "../../store/checkValidationSlice";
import { getMemeberId } from "../../store/memberSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const studies = useSelector((state) => state.studies);

  const mounted = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMemeberId());
  }, []);

  const memberId = useSelector((state) => state.member.id);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      dispatch(checkValidation(memberId));
    }
  }, [memberId]);

  const studies = [{}];
  return (
    <div>
      <Button variant="outlined">Outlined</Button>
      <Checkbox {...label} defaultChecked />
      <p>모집 중인 스터디만 보기</p>
      <Box
        className="searchbox"
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      </Box>
      <SearchIcon />
      {studies.studyList.map((item) => (
        <Card key={item.id} className="card">
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://cdn.pixabay.com/photo/2022/05/18/12/04/flower-7205105_960_720.jpg"
              alt="green iguana"
            />
            <CardContent>
              <p className="font-70 font-md card-title">{item.title}</p>
              <p className="font-30 font-xs card-status">
                {item.status}&nbsp;&nbsp;&nbsp;&nbsp;{item.currentMember} /{" "}
                {item.memberCapacity}
              </p>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      ))}
      <Stack spacing={2}>
        <Pagination count={10} />
      </Stack>
      <Footer />
    </div>
  );
};

export default MainPage;
