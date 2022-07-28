import React from "react";

const FeedChildCommentItem = ({ childListItem }) => {
  return (
    <div>
      <p>{childListItem.writer}</p>
      <p>{childListItem.contents}</p>
    </div>
  );
};

export default FeedChildCommentItem;
