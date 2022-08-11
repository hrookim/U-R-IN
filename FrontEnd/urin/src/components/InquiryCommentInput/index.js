import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createInquiry } from "../../store/inquirySlice";
import "./index.css";

const InquiryCommentInput = ({ parentId, setIsInputSubmitted }) => {
  const { studyId } = useParams();
  const dispatch = useDispatch();

  const [form, setForm] = useState("");
  const onChange = (event) => {
    setForm(event.target.value);
  };

  const onSubmit = (event) => {
    dispatch(createInquiry({ studyId, form, parentId })).then(() => {
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
          className="inquiry-parent-input"
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

export default InquiryCommentInput;
