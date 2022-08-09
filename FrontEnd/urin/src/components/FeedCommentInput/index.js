import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createFeed } from "../../store/feedSlice";

const FeedCommentInput = ({ parentId, setIsInputSubmitted }) => {
  const { studyId } = useParams();
  const dispatch = useDispatch();

  const [form, setForm] = useState("");
  const onChange = (event) => {
    setForm(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(parentId);

    dispatch(createFeed({ studyId, form, parentId })).then(() => {
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

export default FeedCommentInput;
