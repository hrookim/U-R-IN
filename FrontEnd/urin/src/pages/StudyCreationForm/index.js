import React, { useState } from "react";
import moment from "moment";
import {
  Button,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createStudy } from "../../store/studySlice";

const StudyCreationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    notice: "",
    expirationDate: "",
    memberCapacity: "",
  });
  const [formDate, setFormDate] = useState(new Date());
  const [disable, setDisable] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    console.log(form);
  };

  const onSubmit = (e) => {
    alert("스터디 생성이 완료되었습니다:)");
    e.preventDefault();
    dispatch(createStudy({ form, navigate }));
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
              required
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "400px", margin: "5px" }}
              type="text"
              label="Notice"
              name="notice"
              variant="outlined"
              multiline
              rows={10}
              onChange={onChange}
              required
            />
          </Grid>
          <Grid item>
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
            <FormControlLabel
              label="종료일 없음"
              control={
                <Checkbox
                  onChange={() => {
                    setDisable(!disable);
                    setForm({
                      ...form,
                      expirationDate: null,
                    });
                  }}
                />
              }
            />
          </Grid>

          <Grid item>
            <TextField
              id="memberCapacity"
              name="memberCapacity"
              label="Member Capacity"
              type="number"
              onChange={onChange}
              required
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
            <Button
              color="secondary"
              component={Link}
              to="/"
              className="font-40"
            >
              취소
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default StudyCreationForm;
