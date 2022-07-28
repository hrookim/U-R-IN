import React from "react";

const FeedParentCommentItem = ({ feedListItem }) => {
  return (
    <div>
      <p>{feedListItem.writer}</p>
      <p>{feedListItem.contents}</p>
    </div>
  );
};

export default FeedParentCommentItem;
