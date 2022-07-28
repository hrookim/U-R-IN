import React from "react";

import FeedParentCommentItem from "../FeedParentCommentItem";
import FeedChildCommentItem from "../FeedChildCommentItem";
import FeedCommentInput from "../FeedCommentInput";

const DetailFeedListItem = ({ feedListItem }) => {
  return (
    <div>
      <FeedParentCommentItem parentItem={feedListItem.parent} />
      {feedListItem.children.map((childListItem) => (
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
