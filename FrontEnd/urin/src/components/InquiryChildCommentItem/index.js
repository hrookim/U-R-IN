import React from "react";
import { Avatar } from "@mui/material";

const InquiryChildCommentItem = ({ childListItem }) => {
  return (
    <div>
      <Avatar>{childListItem.writer[0]}</Avatar>
      <p>{childListItem.writer}</p>
      <p>{childListItem.contents}</p>
      <hr />
    </div>
  );
};

export default InquiryChildCommentItem;
