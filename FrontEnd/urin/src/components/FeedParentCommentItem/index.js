import React from "react";
import { Avatar } from "@mui/material";

const FeedParentCommentItem = ({ parentItem }) => {
  return (
    <div>
      <Avatar>{parentItem.writer[0]}</Avatar>
      <p>{parentItem.writer}</p>
      <p>{parentItem.contents}</p>
      <hr />
    </div>
  );
};

export default FeedParentCommentItem;
