import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Pagination, Stack } from "@mui/material";

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

  const [page, setPage] = useState(1);

  const pageChange = (e, value) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(getFeed([studyId, page - 1]));
  }, [isCommentDeleted, isInputSubmitted, page]);

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
      <Stack spacing={2}>
        <Pagination
          count={feed.totalPages}
          page={page}
          onChange={pageChange}
          className="pagination"
        />
      </Stack>{" "}
    </div>
  );
};

export default DetailFeed;
