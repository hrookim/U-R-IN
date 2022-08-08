import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import {
  Button,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import NumberPicker from "react-widgets/NumberPicker";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import "react-widgets/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createStudy } from "../../store/studySlice";
import { checkValidation } from "../../store/checkValidationSlice";
import { getMemberId } from "../../store/memberSlice";

const StudyCreationForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const memberId = useSelector((state) => state.member.id);
  const mounted = useRef(false);
  const [form, setForm] = useState({
    title: "",
    notice: "",
    expirationDate: "",
    memberCapacity: 2,
  });
  const [formDate, setFormDate] = useState(new Date());
  const [disable, setDisable] = useState(false);
  const [errorStatement, setErrorStatement] = useState("");

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
    dispatch(createStudy({ form, navigate }));
  };

  useEffect(() => {
    dispatch(getMemberId(navigate));
  }, []);

  useEffect(() => {
    if (!mounted.current && !memberId) {
      mounted.current = true;
    } else {
      dispatch(checkValidation(memberId, navigate));
    }
  }, [memberId]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Grid container alignItems="center" justify="center" direction="column">
          <h1>스터디 생성 창입니다!</h1>
          <Grid item>
            <TextField
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
                  }}
                />
              }
            />
          </Grid>

          <Grid item>
            <NumberPicker
              min={2}
              max={4}
              defaultValue={2}
              name="memberCapacity"
              onChange={(value) => {
                if (!value) {
                  setErrorStatement("2~4명 입력해주세요");
                }
                setForm({
                  ...form,
                  memberCapacity: value,
                });
              }}
            />
            <small>{errorStatement}</small>{" "}
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
