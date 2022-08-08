import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getInquiry, createInquiry } from "../../store/inquirySlice";

const InquiryCommentInput = ({ parentId, setIsInputSubmitted }) => {
  const { studyId } = useParams();
  const dispatch = useDispatch();

  const [form, setForm] = useState("");
  const onChange = (event) => {
    setForm(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    dispatch(createInquiry({ studyId, form, parentId })).then(() => {
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
      <hr />
    </div>
  );
};

export default InquiryCommentInput;
