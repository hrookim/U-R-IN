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
} from "@mui/material";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import { getStudy, updateStudy } from "../../store/studySlice";

const StudyUpdateForm = () => {
  const { studyId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const study = useSelector((state) => state.study);
  const [form, setForm] = useState({
    title: "",
    notice: "",
    expirationDate: "",
    memberCapacity: "",
  });
  const [formDate, setFormDate] = useState(new Date());
  const [disable, setDisable] = useState(false);

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
        // console.log("====useEffect 2======");
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
              value={form.notice}
              style={{ width: "400px", margin: "5px" }}
              type="text"
              label="Notice"
              name="notice"
              variant="outlined"
              multiline
              rows={10}
              onChange={onChange}
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
                  checked={disable}
                  onChange={() => {
                    setDisable(!disable);
                  }}
                />
              }
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
            <Button
              color="secondary"
              component={Link}
              to={`/study/${studyId}`}
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

export default StudyUpdateForm;
