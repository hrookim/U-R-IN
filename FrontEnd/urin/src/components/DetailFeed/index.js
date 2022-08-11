import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Pagination } from "@mui/material";

import DetailFeedInput from "../DetailFeedInput";
import DetailFeedListItem from "../DetailFeedListItem";
import { getFeed } from "../../store/feedSlice";
import "../../assets/DesignSystem.css";

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
      <p className="font-60 font-md">
        스터디원끼리 자유롭게 이야기를 나눠보세요!
      </p>
      <DetailFeedInput
        studyId={studyId}
        setIsInputSubmitted={setIsInputSubmitted}
      />
      <hr />
      {feed.feedList.map((feedListItem) => (
        <DetailFeedListItem
          key={feedListItem.parent.feedId}
          feedListItem={feedListItem}
          isLeader={isLeader}
          setIsCommentDeleted={setIsCommentDeleted}
          setIsInputSubmitted={setIsInputSubmitted}
        />
      ))}
      <Pagination count={feed.totalPages + 1} className="pagination" />
    </div>
  );
};

export default DetailFeed;
