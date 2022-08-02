import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";

const StudyUpdateForm = () => {
  const [form, setForm] = useState({
    title: "삼성전자 면접 스터디",
    contents: "SSAFY 출신들만 함께해요! 삼전 가즈아!!!!!",
    expiredDate: "2022-08-02",
    memberCapacity: "6",
  });
  const formatDate = new Date(form.expiredDate);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    console.log(form);
  };

  const onSubmit = (e) => {
    alert("제출이 완료되었습니다!");
    e.preventDefault();
    // 나중에 updateStudy 함수로 연동시켜야 한다.
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Grid container alignItems="center" justify="center" direction="column">
          <h1>스터디 수정 창입니다!</h1>
          <Grid item>
            <TextField
              id="title"
              name="title"
              label="Title"
              type="text"
              value={form.title}
              onChange={onChange}
            />
          </Grid>
          <Grid item>
            <TextField
              value={form.contents}
              style={{ width: "400px", margin: "5px" }}
              type="text"
              label="Contents"
              name="contents"
              variant="outlined"
              multiline
              rows={10}
              onChange={onChange}
            />
          </Grid>
          <Grid item>
            <DatePicker
              selected={formatDate}
              locale={ko}
              onChange={(date) => setForm({ ...form, expiredDate: date })}
              inline
            />
          </Grid>

          <Grid item>
            <TextField
              value={form.memberCapacity}
              id="memberCapacity"
              name="memberCapacity"
              label="Member Capacity"
              type="number"
              onChange={onChange}
            />
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{
                backgroundColor: "green",
                margin: "5px",
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default StudyUpdateForm;
