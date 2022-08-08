import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createFeed } from "../../store/feedSlice";

const DetailFeedInput = ({ studyId, setIsInputSubmitted }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState("");
  const onChange = (event) => {
    setForm(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(createFeed({ studyId, form })).then(() => {
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

export default DetailFeedInput;
