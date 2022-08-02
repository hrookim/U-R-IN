import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Pagination } from "@mui/material";

import DetailFeedInput from "../DetailFeedInput";
import DetailFeedListItem from "../DetailFeedListItem";
import { getFeed } from "../../store/feedSlice";

const DetailFeed = () => {
  const dispatch = useDispatch();
  const { studyId } = useParams();
  const feed = useSelector((state) => state.feed);

  useEffect(() => {
    // TODO: 로그인한 유저가 스터디 멤버인지 확인하는 로직 추가
    dispatch(getFeed(studyId));
  }, []);

  return (
    <div>
      <p>피드입니다!</p>
      <DetailFeedInput />
      {feed.feedList.map((feedListItem) => (
        <DetailFeedListItem
          key={feedListItem.parent.feedId}
          feedListItem={feedListItem}
        />
      ))}
      <Pagination count={feed.totalPages + 1} />
    </div>
  );
};

export default DetailFeed;
