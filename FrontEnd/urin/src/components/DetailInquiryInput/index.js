import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";

import { createInquiry } from "../../store/inquirySlice";

const DetailInquiryInput = ({ studyId, setIsInputSubmitted }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState("");
  const onChange = (event) => {
    setForm(event.target.value);
  };

  const onSubmit = (event) => {
    dispatch(createInquiry({ studyId, form })).then(() => {
      setIsInputSubmitted(true);
      setInterval(() => setIsInputSubmitted(false), 100);
    });
    setForm("");
  };

  const onKeyPress = (event) => {
    if (event.key == "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <div>
        <input
          onChange={onChange}
          onKeyPress={onKeyPress}
          value={form}
          className="feed-input"
          style={{ padding: "20px" }}
        />
        {/* <Button
          onClick={onSubmit}
          sx={{
            backgroundColor: "#0037FA",
            height: "60px",
            marginLeft: "20px",
            borderRadius: "10px",
            "&:hover": { backgroundColor: "#0037FA" },
          }}
          variant="contained"
        >
          제출
        </Button> */}
      </div>
    </div>
  );
};

export default DetailInquiryInput;
