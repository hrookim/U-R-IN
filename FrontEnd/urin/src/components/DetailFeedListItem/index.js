import React from "react";
import styled from "styled-components";

import FeedParentCommentItem from "../FeedParentCommentItem";
import FeedChildCommentItem from "../FeedChildCommentItem";
import FeedCommentInput from "../FeedCommentInput";

const StyledDiv = styled.div`
  border: 1px solid black;
  margin: 10px 40px;
`;

const DetailFeedListItem = ({
  feedListItem,
  isLeader,
  setIsCommentDeleted,
  setIsInputSubmitted,
}) => {
  return (
    <StyledDiv>
      <FeedParentCommentItem
        parentItem={feedListItem.parent}
        isLeader={isLeader}
        setIsCommentDeleted={setIsCommentDeleted}
      />
      <hr />
      <StyledDiv>
        {feedListItem.children.map((childListItem) => (
          <FeedChildCommentItem
            key={childListItem.feedId}
            isLeader={isLeader}
            childListItem={childListItem}
            setIsCommentDeleted={setIsCommentDeleted}
          />
        ))}
        <FeedCommentInput
          parentId={feedListItem.parent.feedId}
          setIsInputSubmitted={setIsInputSubmitted}
        />
      </StyledDiv>
    </StyledDiv>
  );
};

export default DetailFeedListItem;
