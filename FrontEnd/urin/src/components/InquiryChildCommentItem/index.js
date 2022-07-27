import React from "react";

const InquiryChildCommentItem = ({ childListItem }) => {
  console.log(childListItem);
  return (
    <div>
      <p>{childListItem.writer}</p>
      <p>{childListItem.contents}</p>
    </div>
  );
};

export default InquiryChildCommentItem;
