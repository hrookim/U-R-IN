import React from "react";
import { Avatar } from "@mui/material";

const InquiryChildCommentItem = ({ childListItem }) => {
  return (
    <div>
      <Avatar>{childListItem.writer[0]}</Avatar>
      <p>{childListItem.writer}</p>
      <p>
        {childListItem.contents}
        {/* TODO: 로그인한 사용자와 작성자가 일치하면 삭제버튼 보이는 로직 추가 */}
      </p>
      <hr />
    </div>
  );
};

export default InquiryChildCommentItem;
