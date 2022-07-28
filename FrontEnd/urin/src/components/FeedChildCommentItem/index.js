import React from "react";
import { Avatar } from "@mui/material";

const FeedChildCommentItem = ({ childListItem }) => {
  return (
    <div>
      <Avatar>{childListItem.writer[0]}</Avatar>
      <p>{childListItem.writer}</p>
      <p>{childListItem.contents}</p>
      <hr />
    </div>
  );
};

export default FeedChildCommentItem;
