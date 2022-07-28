import React from "react";
import { Avatar } from "@mui/material";

const InquiryParentCommentItem = ({ parentItem }) => {
  return (
    <div>
      <Avatar>{parentItem.writer[0]}</Avatar>
      <p>{parentItem.writer}</p>
      <p>{parentItem.contents}</p>
    </div>
  );
};

export default InquiryParentCommentItem;
