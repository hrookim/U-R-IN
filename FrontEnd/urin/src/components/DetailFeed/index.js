import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Pagination } from "@mui/material";

import DetailFeedInput from "../DetailFeedInput";
import DetailFeedListItem from "../DetailFeedListItem";
import { getFeed } from "../../store/feedSlice";

const DetailFeed = ({ study, isLeader, isParticipant }) => {
  const dispatch = useDispatch();
  const { studyId } = useParams();
  const feed = useSelector((state) => state.feed);
  const [isCommentDeleted, setIsCommentDeleted] = useState(false);
  const [isInputSubmitted, setIsInputSubmitted] = useState(false);

  useEffect(() => {
    dispatch(getFeed(studyId));
  }, [isCommentDeleted, isInputSubmitted]);

  return (
    <div>
      <p>피드입니다!</p>
      <DetailFeedInput
        studyId={studyId}
        setIsInputSubmitted={setIsInputSubmitted}
      />
      {feed.feedList.map((feedListItem) => (
        <DetailFeedListItem
          key={feedListItem.parent.feedId}
          feedListItem={feedListItem}
          isLeader={isLeader}
          setIsCommentDeleted={setIsCommentDeleted}
          setIsInputSubmitted={setIsInputSubmitted}
        />
      ))}
      <Pagination count={feed.totalPages + 1} />
    </div>
  );
};

export default DetailFeed;
