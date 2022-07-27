import React from "react";

const InquiryParentCommentItem = ({ inquiryListItem }) => {
  return (
    <div>
      <p>{inquiryListItem.writer}</p>
      <p>{inquiryListItem.contents}</p>
    </div>
  );
};

export default InquiryParentCommentItem;
