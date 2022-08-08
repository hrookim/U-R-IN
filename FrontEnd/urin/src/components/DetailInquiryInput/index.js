import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createInquiry } from "../../store/inquirySlice";

const DetailInquiryInput = ({ studyId, setIsInputSubmitted }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState("");
  const onChange = (event) => {
    setForm(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(createInquiry({ studyId, form })).then(() => {
      setIsInputSubmitted(true);
      setInterval(() => setIsInputSubmitted(false), 100);
    });
    setForm("");
  };

  return (
    <div>
      <div>
        <input onChange={onChange} value={form} />
        <button type="submit" onClick={onSubmit}>
          제출
        </button>
      </div>
    </div>
  );
};

export default DetailInquiryInput;
