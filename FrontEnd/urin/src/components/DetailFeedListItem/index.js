import React from "react";

import FeedParentCommentItem from "../FeedParentCommentItem";
import FeedChildCommentItem from "../FeedChildCommentItem";
import FeedCommentInput from "../FeedCommentInput";
import "./index.css";

const DetailFeedListItem = ({
  feedListItem,
  isLeader,
  setIsCommentDeleted,
  setIsInputSubmitted,
}) => {
  return (
    <div className="feed-comment">
      <FeedParentCommentItem
        parentItem={feedListItem.parent}
        isLeader={isLeader}
        setIsCommentDeleted={setIsCommentDeleted}
      />
      <div className="child-comment">
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
      </div>
    </div>
  );
};

export default DetailFeedListItem;
