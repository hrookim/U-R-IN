import React from "react";
import { Avatar } from "@mui/material";

const InquiryParentCommentItem = ({ parentItem }) => {
  return (
    <div>
      <Avatar>{parentItem.writer[0]}</Avatar>
      <p>{parentItem.writer}</p>
      <p>
        {parentItem.contents}
        {/* TODO: 로그인한 사용자와 작성자가 일치하면 삭제버튼 보이는 로직 추가 */}
      </p>
    </div>
  );
};

export default InquiryParentCommentItem;
