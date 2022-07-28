import React from "react";

import InquiryParentCommentItem from "../InquiryParentCommentItem";
import InquiryChildCommentItem from "../InquiryChildCommentItem";
import InquiryCommentInput from "../InquiryCommentInput";

const DetailInquiryListItem = ({ inquiryListItem }) => {
  return (
    <div>
      <InquiryParentCommentItem parentItem={inquiryListItem.parent} />
      <hr />
      {inquiryListItem.children.map((childListItem) => (
        <InquiryChildCommentItem
          key={childListItem.inquiryId}
          childListItem={childListItem}
        />
      ))}
      <InquiryCommentInput />
    </div>
  );
};

export default DetailInquiryListItem;
