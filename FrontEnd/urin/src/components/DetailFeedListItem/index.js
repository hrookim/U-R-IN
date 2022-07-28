import React from "react";

import FeedParentCommentItem from "../FeedParentCommentItem";
import FeedChildCommentItem from "../FeedChildCommentItem";
import FeedCommentInput from "../FeedCommentInput";

const DetailFeedListItem = ({ feedListItem }) => {
  return (
    <div>
      <FeedParentCommentItem feedListItem={feedListItem} />
      {feedListItem.child.map((childListItem) => (
        <FeedChildCommentItem
          key={childListItem.feedId}
          childListItem={childListItem}
        />
      ))}
      <FeedCommentInput />
    </div>
  );
};

export default DetailFeedListItem;
