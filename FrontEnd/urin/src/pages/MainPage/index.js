/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import NavComponent from "../../components/Navbar";
import Footer from "../../components/Footer";

const MainPage = () => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // const dispatch = useDispatch();
  // const studies = useSelector((state) => state.studies);
  // useEffect(() => {
  //   dispatch(getStudyList());
  // }, []);
  const studies = [
    {
      currentMember: 0,
      id: 0,
      memberCapacity: 0,
      status: "COMPLETED",
      title: "string",
    },
    {
      currentMember: 3,
      id: 1,
      memberCapacity: 4,
      status: "NOT YET",
      title: "string",
    },
    {
      currentMember: 2,
      id: 2,
      memberCapacity: 4,
      status: "COMPLETED",
      title: "string",
    },
  ];

  return (
    <div>
      <NavComponent />
      <Button variant="outlined">Outlined</Button>
      <Checkbox {...label} defaultChecked />
      <p>모집 중인 스터디만 보기</p>
      <Box
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

      {studies.map((item, index) => (
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="https://cdn.pixabay.com/photo/2022/05/18/12/04/flower-7205105_960_720.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.status}
              </Typography>
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
