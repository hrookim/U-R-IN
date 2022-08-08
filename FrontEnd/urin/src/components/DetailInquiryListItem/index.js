import React from "react";
import styled from "styled-components";

import InquiryParentCommentItem from "../InquiryParentCommentItem";
import InquiryChildCommentItem from "../InquiryChildCommentItem";
import InquiryCommentInput from "../InquiryCommentInput";

const StyledDiv = styled.div`
  border: 1px solid black;
  margin: 10px 40px;
`;

const DetailInquiryListItem = ({
  inquiryListItem,
  isLeader,
  setIsCommentDeleted,
  setIsInputSubmitted,
}) => {
  return (
    <StyledDiv>
      <InquiryParentCommentItem
        parentItem={inquiryListItem.parent}
        isLeader={isLeader}
        setIsCommentDeleted={setIsCommentDeleted}
      />
      <hr />
      <StyledDiv>
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
      </StyledDiv>
    </StyledDiv>
  );
};

export default DetailInquiryListItem;