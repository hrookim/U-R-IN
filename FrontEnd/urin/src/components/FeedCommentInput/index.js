import React, { useState } from "react";

const FeedCommentInput = () => {
  const [value, setValue] = useState("");
  const onKeyUp = (event) => {
    setValue(event.target.value);
    // console.log(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // console.log(event);
    // TODO:value 제출
    setValue("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onKeyUp={onKeyUp} />
        <button type="submit">제출</button>
      </form>
    </div>
  );
};

export default FeedCommentInput;
