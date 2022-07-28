import React from "react";

const InquiryChildCommentItem = ({ childListItem }) => {
  return (
    <div>
      <p>{childListItem.writer}</p>
      <p>{childListItem.contents}</p>
    </div>
  );
};

export default InquiryChildCommentItem;
