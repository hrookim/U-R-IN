import { Pagination } from "@mui/material";
import React, { useState } from "react";

import DetailFeedInput from "../DetailFeedInput";
import DetailFeedListItem from "../DetailFeedListItem";

const DetailFeed = () => {
  const data = {
    totalPages: 1,
    feedList: [
      {
        parent: {
          feedId: 3,
          contents: "스터디 방식이 어떻게 되나요?",
          writerId: 2,
          writer: "삼성가고싶당",
          createdAt: "2022-07-27 10:00:00",
          isDeleted: false,
        },
        children: [
          {
            feedId: 4,
            contents: "주 1회 진행 예정입니다.",
            writerId: 1,
            writer: "삼성바라기",
            createdAt: "2022-07-27 10:10:00",
            isDeleted: false,
          },
          {
            feedId: 5,
            contents: "좋습니다. 고민해보겠습니다.",
            writerId: 2,
            writer: "삼성가고싶당",
            createdAt: "2022-07-27 10:20:00",
            isDeleted: false,
          },
        ],
      },
      {
        parent: {
          feedId: 1,
          contents: "안녕하세요?",
          writerId: 2,
          writer: "삼성가고싶당",
          createdAt: "2022-07-27 09:00:00",
          isDeleted: false,
        },
        children: [
          {
            feedId: 2,
            contents: "안녕하세요",
            writerId: 1,
            writer: "삼성바라기",
            createdAt: "2022-07-27 09:10:00",
            isDeleted: false,
          },
        ],
      },
    ],
  };

  const [totalPages, setTotalPages] = useState(data.totalPages);
  const [feedList, setFeedList] = useState(data.feedList);

  // TODO: 로그인한 유저가 스터디 멤버인지 확인하는 로직 추가

  return (
    <div>
      <p>피드입니다!</p>
      <DetailFeedInput />
      {feedList.map((feedListItem) => (
        <DetailFeedListItem
          key={feedListItem.feedId}
          feedListItem={feedListItem}
        />
      ))}
      <Pagination count={totalPages} />
    </div>
  );
};

export default DetailFeed;
