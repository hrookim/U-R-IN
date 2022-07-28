import { Pagination } from "@mui/material";
import React, { useState } from "react";

import DetailInquiryInput from "../DetailInquiryInput";
import DetailInquiryListItem from "../DetailInquiryListItem";

const DetailInquiry = () => {
  const data = {
    totalPages: 1,
    inquiryList: [
      {
        parent: {
          inquiryId: 3,
          contents: "스터디 방식이 어떻게 되나요?",
          writerId: 2,
          writer: "삼성가고싶당",
          createdAt: "2022-07-27 10:00:00",
          isDeleted: false,
        },
        children: [
          {
            inquiryId: 4,
            contents: "주 1회 진행 예정입니다.",
            writerId: 1,
            writer: "삼성바라기",
            createdAt: "2022-07-27 10:10:00",
            isDeleted: false,
          },
          {
            inquiryId: 5,
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
          inquiryId: 1,
          contents: "안녕하세요?",
          writerId: 2,
          writer: "삼성가고싶당",
          createdAt: "2022-07-27 09:00:00",
          isDeleted: false,
        },
        children: [
          {
            inquiryId: 2,
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
  const [inquiryList, setInquiryList] = useState(data.inquiryList);

  return (
    <div>
      <p>궁금한 점을 방장에게 질문해보세요!</p>
      <DetailInquiryInput />
      {inquiryList.map((inquiryListItem) => (
        <DetailInquiryListItem
          key={inquiryListItem.inquiryId}
          inquiryListItem={inquiryListItem}
        />
      ))}
      <Pagination count={totalPages} />
    </div>
  );
};

export default DetailInquiry;
