import React from "react";
import styled from "styled-components";

import InquiryParentCommentItem from "../InquiryParentCommentItem";
import InquiryChildCommentItem from "../InquiryChildCommentItem";
import InquiryCommentInput from "../InquiryCommentInput";
import "./index.css";

const DetailInquiryListItem = ({
  inquiryListItem,
  isLeader,
  setIsCommentDeleted,
  setIsInputSubmitted,
}) => {
  return (
    <div className="inquiry-comment">
      <InquiryParentCommentItem
        parentItem={inquiryListItem.parent}
        isLeader={isLeader}
        setIsCommentDeleted={setIsCommentDeleted}
      />
      <div className="child-comment">
        {inquiryListItem.children.map((childListItem) => (
          <InquiryChildCommentItem
            key={childListItem.inquiryId}
            isLeader={isLeader}
            childListItem={childListItem}
            setIsCommentDeleted={setIsCommentDeleted}
          />
        ))}
        <InquiryCommentInput
          parentId={inquiryListItem.parent.inquiryId}
          setIsInputSubmitted={setIsInputSubmitted}
        />
      </div>
    </div>
  );
};

export default DetailInquiryListItem;
