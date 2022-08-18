import React, { useState } from "react";
import Button from "@mui/material/Button";

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createFeed } from "../../store/feedSlice";
import "./index.css";

const FeedCommentInput = ({ parentId, setIsInputSubmitted }) => {
  const { studyId } = useParams();
  const dispatch = useDispatch();

  const [form, setForm] = useState("");
  const onChange = (event) => {
    setForm(event.target.value);
  };

  const onSubmit = (event) => {
    dispatch(createFeed({ studyId, form, parentId })).then(() => {
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
          className="feed-parent-input"
          style={{ padding: "20px" }}
        />
      </div>
    </div>
  );
};

export default FeedCommentInput;
