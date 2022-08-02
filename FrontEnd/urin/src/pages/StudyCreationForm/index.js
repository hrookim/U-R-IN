import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";

const StudyCreationForm = () => {
  const [form, setForm] = useState({
    title: "",
    contents: "",
    expiredDate: "",
    memberCapacity: "",
  });

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
    // 나중에 createStudy 함수로 연동시켜야 한다.
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Grid container alignItems="center" justify="center" direction="column">
          <h1>스터디 생성 창입니다!</h1>
          <Grid item>
            <TextField
              id="title"
              name="title"
              label="Title"
              type="text"
              onChange={onChange}
            />
          </Grid>
          <Grid item>
            <TextField
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
              locale={ko}
              format="yyyy-MM-dd"
              onChange={(date) =>
                setForm({ ...form, expiredDate: date.toLocaleDateString() })
              }
              inline
            />
          </Grid>

          <Grid item>
            <TextField
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

export default StudyCreationForm;
